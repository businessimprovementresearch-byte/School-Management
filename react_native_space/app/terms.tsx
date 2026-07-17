import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Pressable } from 'react-native';
import { Text, TextInput, Button, ActivityIndicator, Portal, Modal, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  useTermsControllerFindAll,
  useTermsControllerCreate,
  useTermsControllerUpdate,
  useTermsControllerRemove,
  useAcademicYearsControllerFindAll,
} from '@/src/api/generated/api';
import type { TermListItemDto, AcademicYearListItemDto } from '@/src/api/generated/schemas';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/src/theme';
import { getErrorMessage } from '@/src/api/customFetch';

export default function TermsScreen() {
  const router = useRouter();
  const { data: years } = useAcademicYearsControllerFindAll();
  const activeYear = (years ?? []).find((y: AcademicYearListItemDto) => y?.isActive);
  const { data, isLoading, refetch } = useTermsControllerFindAll({ academicYearId: activeYear?.id ?? '' }, { query: { enabled: !!activeYear?.id } });
  const createMutation = useTermsControllerCreate();
  const updateMutation = useTermsControllerUpdate();
  const removeMutation = useTermsControllerRemove();

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null); // null = create mode
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  const isEditing = editingId !== null;

  const openCreateModal = () => {
    setEditingId(null);
    setName('');
    setStartDate('');
    setEndDate('');
    setError('');
    setShowModal(true);
  };

  const openEditModal = (item: TermListItemDto) => {
    setEditingId(item?.id ?? '');
    setName(item?.name ?? '');
    setStartDate(item?.startDate ? item.startDate.split('T')[0] : '');
    setEndDate(item?.endDate ? item.endDate.split('T')[0] : '');
    setError('');
    setShowModal(true);
  };

  const handleSave = () => {
    setError('');
    if (!name?.trim() || !startDate?.trim() || !endDate?.trim()) { setError('All fields required'); return; }

    if (isEditing && editingId) {
      updateMutation.mutate(
        { id: editingId, data: { name: name.trim(), startDate, endDate } },
        {
          onSuccess: () => { setShowModal(false); refetch(); },
          onError: (e) => setError(getErrorMessage(e, 'Failed to update')),
        },
      );
    } else {
      if (!activeYear?.id) { setError('No active academic year'); return; }
      createMutation.mutate(
        { data: { name: name.trim(), startDate, endDate, academicYearId: activeYear.id } },
        {
          onSuccess: () => { setShowModal(false); setName(''); setStartDate(''); setEndDate(''); refetch(); },
          onError: (e) => setError(getErrorMessage(e, 'Failed to create')),
        },
      );
    }
  };

  const handleRemove = (id: string) => {
    removeMutation.mutate({ id }, { onSuccess: () => refetch() });
  };

  const renderItem = ({ item }: { item: TermListItemDto }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{item?.name ?? ''}</Text>
        <Text style={styles.cardSub}>{item?.startDate?.split('T')?.[0] ?? ''} → {item?.endDate?.split('T')?.[0] ?? ''}</Text>
      </View>
      <IconButton icon="pencil-outline" onPress={() => openEditModal(item)} iconColor={theme.colors.textSecondary} size={20} />
      <IconButton icon="delete-outline" onPress={() => handleRemove(item?.id ?? '')} iconColor={theme.colors.error} size={20} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={16}><Ionicons name="arrow-back" size={24} color={theme.colors.text} /></Pressable>
        <Text style={styles.headerTitle}>Terms</Text>
        <IconButton icon="plus" onPress={openCreateModal} iconColor={theme.colors.primary} />
      </View>
      {!activeYear ? <Text style={styles.empty}>No active academic year. Create one first.</Text> : isLoading ? <ActivityIndicator style={{ marginTop: 40 }} color={theme.colors.primary} /> : (
        <FlatList data={data ?? []} renderItem={renderItem} keyExtractor={item => item?.id ?? ''} contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>No terms for {activeYear?.name ?? ''}</Text>} />
      )}
      <Portal>
        <Modal visible={showModal} onDismiss={() => setShowModal(false)} contentContainerStyle={styles.modal}>
          <Text style={styles.modalTitle}>{isEditing ? 'Edit Term' : 'New Term'}</Text>
          {!!error && <Text style={styles.error}>{error}</Text>}
          <TextInput label="Name (e.g. Term 1)" value={name} onChangeText={setName} mode="outlined" style={styles.input} outlineColor={theme.colors.border} activeOutlineColor={theme.colors.primary} />
          <TextInput label="Start Date (YYYY-MM-DD)" value={startDate} onChangeText={setStartDate} mode="outlined" style={styles.input} outlineColor={theme.colors.border} activeOutlineColor={theme.colors.primary} />
          <TextInput label="End Date (YYYY-MM-DD)" value={endDate} onChangeText={setEndDate} mode="outlined" style={styles.input} outlineColor={theme.colors.border} activeOutlineColor={theme.colors.primary} />
          <Button mode="contained" onPress={handleSave} loading={createMutation?.isPending || updateMutation?.isPending} style={styles.btn} buttonColor={theme.colors.primary}>
            {isEditing ? 'Save Changes' : 'Create'}
          </Button>
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
  empty: { textAlign: 'center', color: theme.colors.textSecondary, marginTop: 40, fontSize: 15, paddingHorizontal: 20 },
  modal: { backgroundColor: '#FFF', margin: 20, borderRadius: 16, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.text, marginBottom: 16 },
  input: { marginBottom: 12, backgroundColor: '#FFF' },
  error: { color: theme.colors.error, marginBottom: 12, textAlign: 'center' },
  btn: { marginTop: 4, borderRadius: 8 },
});
