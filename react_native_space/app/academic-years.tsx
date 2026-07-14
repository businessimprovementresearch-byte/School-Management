import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, ActivityIndicator, Portal, Modal, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAcademicYearsControllerFindAll, useAcademicYearsControllerCreate, useAcademicYearsControllerUpdate } from '@/src/api/generated/api';
import type { AcademicYearListItemDto } from '@/src/api/generated/schemas';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/src/theme';
import { getErrorMessage } from '@/src/api/customFetch';

export default function AcademicYearsScreen() {
  const router = useRouter();
  const { data, isLoading, refetch } = useAcademicYearsControllerFindAll();
  const createMutation = useAcademicYearsControllerCreate();
  const updateMutation = useAcademicYearsControllerUpdate();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  const handleCreate = () => {
    setError('');
    if (!name?.trim() || !startDate?.trim() || !endDate?.trim()) { setError('All fields required'); return; }
    createMutation.mutate({ data: { name: name.trim(), startDate, endDate } }, {
      onSuccess: () => { setShowModal(false); setName(''); setStartDate(''); setEndDate(''); refetch(); },
      onError: (e) => setError(getErrorMessage(e, 'Failed to create')),
    });
  };

  const toggleActive = (item: AcademicYearListItemDto) => {
    updateMutation.mutate({ id: item?.id ?? '', data: { isActive: !item?.isActive } }, { onSuccess: () => refetch() });
  };

  const renderItem = ({ item }: { item: AcademicYearListItemDto }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={styles.cardTitle}>{item?.name ?? ''}</Text>
          {item?.isActive && <View style={styles.activeBadge}><Text style={styles.activeBadgeText}>Active</Text></View>}
        </View>
        <Text style={styles.cardSub}>{item?.startDate?.split('T')?.[0] ?? ''} → {item?.endDate?.split('T')?.[0] ?? ''}</Text>
      </View>
      <Button mode="text" compact onPress={() => toggleActive(item)} textColor={item?.isActive ? theme.colors.error : theme.colors.success}>
        {item?.isActive ? 'Deactivate' : 'Activate'}
      </Button>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={16}><Ionicons name="arrow-back" size={24} color={theme.colors.text} /></Pressable>
        <Text style={styles.headerTitle}>Academic Years</Text>
        <IconButton icon="plus" onPress={() => setShowModal(true)} iconColor={theme.colors.primary} />
      </View>
      {isLoading ? <ActivityIndicator style={{ marginTop: 40 }} color={theme.colors.primary} /> : (
        <FlatList data={data ?? []} renderItem={renderItem} keyExtractor={item => item?.id ?? ''} contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>No academic years</Text>} />
      )}
      <Portal>
        <Modal visible={showModal} onDismiss={() => setShowModal(false)} contentContainerStyle={styles.modal}>
          <Text style={styles.modalTitle}>New Academic Year</Text>
          {!!error && <Text style={styles.error}>{error}</Text>}
          <TextInput label="Name (e.g. 2025-2026)" value={name} onChangeText={setName} mode="outlined" style={styles.input} outlineColor={theme.colors.border} activeOutlineColor={theme.colors.primary} />
          <TextInput label="Start Date (YYYY-MM-DD)" value={startDate} onChangeText={setStartDate} mode="outlined" style={styles.input} outlineColor={theme.colors.border} activeOutlineColor={theme.colors.primary} />
          <TextInput label="End Date (YYYY-MM-DD)" value={endDate} onChangeText={setEndDate} mode="outlined" style={styles.input} outlineColor={theme.colors.border} activeOutlineColor={theme.colors.primary} />
          <Button mode="contained" onPress={handleCreate} loading={createMutation?.isPending} style={styles.btn} buttonColor={theme.colors.primary}>Create</Button>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 4 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.text },
  list: { paddingHorizontal: 16, paddingBottom: 40 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 12, padding: 14, marginBottom: 10, elevation: 1 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: theme.colors.text },
  cardSub: { fontSize: 13, color: theme.colors.textSecondary, marginTop: 4 },
  activeBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  activeBadgeText: { fontSize: 11, fontWeight: '700', color: theme.colors.success },
  empty: { textAlign: 'center', color: theme.colors.textSecondary, marginTop: 40, fontSize: 15 },
  modal: { backgroundColor: '#FFF', margin: 20, borderRadius: 16, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.text, marginBottom: 16 },
  input: { marginBottom: 12, backgroundColor: '#FFF' },
  error: { color: theme.colors.error, marginBottom: 12, textAlign: 'center' },
  btn: { marginTop: 4, borderRadius: 8 },
});
