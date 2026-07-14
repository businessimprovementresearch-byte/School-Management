import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Pressable } from 'react-native';
import { Text, TextInput, Button, ActivityIndicator, Portal, Modal, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useMetricsControllerFindAll, useMetricsControllerCreate, useMetricsControllerRemove, useClassesControllerFindAll } from '@/src/api/generated/api';
import type { MetricListItemDto } from '@/src/api/generated/schemas';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/src/theme';
import { getErrorMessage } from '@/src/api/customFetch';

export default function MetricsScreen() {
  const router = useRouter();
  const { data: classes } = useClassesControllerFindAll();
  const [selectedClassId, setSelectedClassId] = useState('');
  const { data, isLoading, refetch } = useMetricsControllerFindAll({ classId: selectedClassId }, { query: { enabled: !!selectedClassId } });
  const createMutation = useMetricsControllerCreate();
  const removeMutation = useMetricsControllerRemove();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('SCORE');
  const [error, setError] = useState('');

  React.useEffect(() => {
    if ((classes ?? []).length > 0 && !selectedClassId) {
      setSelectedClassId(classes?.[0]?.id ?? '');
    }
  }, [classes]);

  const handleCreate = () => {
    setError('');
    if (!name?.trim() || !selectedClassId) { setError('Name and class required'); return; }
    createMutation.mutate({ data: { name: name.trim(), description: description || undefined, classId: selectedClassId, type } }, {
      onSuccess: () => { setShowModal(false); setName(''); setDescription(''); refetch(); },
      onError: (e) => setError(getErrorMessage(e, 'Failed to create')),
    });
  };

  const renderItem = ({ item }: { item: MetricListItemDto }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{item?.name ?? ''}</Text>
        <Text style={styles.cardSub}>{item?.type ?? ''} • {item?.className ?? ''}</Text>
        {!!item?.description && <Text style={styles.cardDesc}>{item.description}</Text>}
      </View>
      <IconButton icon="delete-outline" onPress={() => removeMutation.mutate({ id: item?.id ?? '' }, { onSuccess: () => refetch() })} iconColor={theme.colors.error} size={20} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={16}><Ionicons name="arrow-back" size={24} color={theme.colors.text} /></Pressable>
        <Text style={styles.headerTitle}>Progress Metrics</Text>
        <IconButton icon="plus" onPress={() => setShowModal(true)} iconColor={theme.colors.primary} />
      </View>
      <ScrollableClassFilter classes={classes ?? []} selected={selectedClassId} onSelect={(id) => setSelectedClassId(id)} />
      {isLoading ? <ActivityIndicator style={{ marginTop: 40 }} color={theme.colors.primary} /> : (
        <FlatList data={data ?? []} renderItem={renderItem} keyExtractor={item => item?.id ?? ''} contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>No metrics for this class</Text>} />
      )}
      <Portal>
        <Modal visible={showModal} onDismiss={() => setShowModal(false)} contentContainerStyle={styles.modal}>
          <Text style={styles.modalTitle}>New Metric</Text>
          {!!error && <Text style={styles.error}>{error}</Text>}
          <TextInput label="Name" value={name} onChangeText={setName} mode="outlined" style={styles.input} outlineColor={theme.colors.border} activeOutlineColor={theme.colors.primary} />
          <TextInput label="Description (optional)" value={description} onChangeText={setDescription} mode="outlined" style={styles.input} outlineColor={theme.colors.border} activeOutlineColor={theme.colors.primary} />
          <View style={styles.typeRow}>
            {['SCORE', 'GRADE', 'PERCENTAGE'].map(t => (
              <Pressable key={t} style={[styles.typeChip, type === t && styles.typeChipActive]} onPress={() => setType(t)}>
                <Text style={[styles.typeChipText, type === t && styles.typeChipTextActive]}>{t}</Text>
              </Pressable>
            ))}
          </View>
          <Button mode="contained" onPress={handleCreate} loading={createMutation?.isPending} style={styles.btn} buttonColor={theme.colors.primary}>Create</Button>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
}

function ScrollableClassFilter({ classes, selected, onSelect }: { classes: any[]; selected: string; onSelect: (id: string) => void }) {
  return (
    <View style={{ paddingHorizontal: 16, marginBottom: 8 }}>
      <FlatList
        horizontal showsHorizontalScrollIndicator={false}
        data={classes}
        keyExtractor={item => item?.id ?? ''}
        renderItem={({ item }) => (
          <Pressable style={[styles.filterChip, selected === item?.id && styles.filterChipActive]} onPress={() => onSelect(item?.id ?? '')}>
            <Text style={[styles.filterChipText, selected === item?.id && styles.filterChipTextActive]}>{item?.name ?? ''}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 4 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.text },
  list: { paddingHorizontal: 16, paddingBottom: 40 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 12, padding: 14, marginBottom: 10, elevation: 1 },
  cardTitle: { fontSize: 15, fontWeight: '600', color: theme.colors.text },
  cardSub: { fontSize: 12, color: theme.colors.textSecondary, marginTop: 2 },
  cardDesc: { fontSize: 12, color: theme.colors.textSecondary, marginTop: 4 },
  empty: { textAlign: 'center', color: theme.colors.textSecondary, marginTop: 40, fontSize: 15 },
  modal: { backgroundColor: '#FFF', margin: 20, borderRadius: 16, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.text, marginBottom: 16 },
  input: { marginBottom: 12, backgroundColor: '#FFF' },
  error: { color: theme.colors.error, marginBottom: 12, textAlign: 'center' },
  btn: { marginTop: 4, borderRadius: 8 },
  typeRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  typeChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border },
  typeChipActive: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  typeChipText: { fontSize: 12, fontWeight: '600', color: theme.colors.textSecondary },
  typeChipTextActive: { color: '#FFF' },
  filterChip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border, marginRight: 8 },
  filterChipActive: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  filterChipText: { fontSize: 13, color: theme.colors.textSecondary },
  filterChipTextActive: { color: '#FFF' },
});
