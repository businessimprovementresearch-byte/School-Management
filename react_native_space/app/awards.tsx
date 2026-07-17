import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Pressable, Alert } from 'react-native';
import { Text, TextInput, Button, ActivityIndicator, Portal, Modal, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  useAwardsControllerFindAll,
  useAwardsControllerCreate,
  useAwardsControllerIssue,
  useAwardsControllerFindIssuances,
  useAwardsControllerRemove,
} from '@/src/api/generated/api';
import type { AwardListItemDto, AwardIssuanceDto } from '@/src/api/generated/schemas';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/src/theme';
import { getErrorMessage } from '@/src/api/customFetch';
import { useAuth } from '@/src/context/AuthContext';
import PersonPicker, { PickedPerson } from '@/src/components/PersonPicker';

export default function AwardsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const [tab, setTab] = useState<'AWARDS' | 'ISSUED'>('AWARDS');

  const awardsQuery = useAwardsControllerFindAll();
  const issuancesQuery = useAwardsControllerFindIssuances();
  const createMutation = useAwardsControllerCreate();
  const issueMutation = useAwardsControllerIssue();
  const removeMutation = useAwardsControllerRemove();

  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const [issueFor, setIssueFor] = useState<AwardListItemDto | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const awards = awardsQuery?.data ?? [];
  const issuances = issuancesQuery?.data ?? [];

  const handleCreate = () => {
    setError('');
    if (!name?.trim()) { setError('Award name is required'); return; }
    createMutation.mutate({ data: { name: name.trim(), description: description || undefined } }, {
      onSuccess: () => { setShowCreate(false); setName(''); setDescription(''); awardsQuery.refetch(); },
      onError: (e) => setError(getErrorMessage(e, 'Failed to create award')),
    });
  };

  const handlePick = (p: PickedPerson) => {
    setShowPicker(false);
    const awardId = issueFor?.id ?? '';
    setIssueFor(null);
    if (!awardId) return;
    issueMutation.mutate({
      data: {
        awardId,
        studentId: p?.kind === 'STUDENT' ? p?.id : undefined,
        teacherId: p?.kind === 'TEACHER' ? p?.id : undefined,
      },
    }, {
      onSuccess: () => { awardsQuery.refetch(); issuancesQuery.refetch(); Alert.alert('Success', `Award issued to ${p?.name ?? 'recipient'}`); },
      onError: (e) => Alert.alert('Error', getErrorMessage(e, 'Failed to issue award')),
    });
  };

  const confirmRemove = (a: AwardListItemDto) => {
    Alert.alert('Delete Award', `Delete "${a?.name ?? ''}" and all its issuances?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => removeMutation.mutate({ id: a?.id ?? '' }, { onSuccess: () => { awardsQuery.refetch(); issuancesQuery.refetch(); } }) },
    ]);
  };

  const renderAward = ({ item }: { item: AwardListItemDto }) => (
    <View style={styles.card}>
      <View style={styles.iconBox}><Ionicons name="trophy" size={22} color={theme.colors.primary} /></View>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{item?.name ?? ''}</Text>
        {!!item?.description && <Text style={styles.cardSub}>{item.description}</Text>}
        <Text style={styles.cardMeta}>Issued {item?.issuedCount ?? 0} time(s)</Text>
      </View>
      {isAdmin ? (
        <View style={{ alignItems: 'flex-end' }}>
          <Button compact mode="contained" buttonColor={theme.colors.primary} style={styles.issueBtn}
            onPress={() => { setIssueFor(item); setShowPicker(true); }}>Issue</Button>
          <Pressable onPress={() => confirmRemove(item)} hitSlop={8} style={{ marginTop: 6 }}>
            <Ionicons name="trash-outline" size={18} color={theme.colors.error} />
          </Pressable>
        </View>
      ) : null}
    </View>
  );

  const renderIssuance = ({ item }: { item: AwardIssuanceDto }) => (
    <View style={styles.card}>
      <View style={styles.iconBox}><Ionicons name="ribbon" size={22} color={theme.colors.primary} /></View>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{item?.recipientName ?? ''}</Text>
        <Text style={styles.cardSub}>{item?.awardName ?? ''}</Text>
        <Text style={styles.cardMeta}>{item?.issuedAt?.split('T')?.[0] ?? ''}{item?.note ? ` • ${item.note}` : ''}</Text>
      </View>
    </View>
  );

  const isLoading = tab === 'AWARDS' ? awardsQuery?.isLoading : issuancesQuery?.isLoading;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={16}><Ionicons name="arrow-back" size={24} color={theme.colors.text} /></Pressable>
        <Text style={styles.headerTitle}>Awards</Text>
        {isAdmin ? <IconButton icon="plus" onPress={() => setShowCreate(true)} iconColor={theme.colors.primary} /> : <View style={{ width: 40 }} />}
      </View>

      <View style={styles.tabs}>
        <Pressable style={[styles.tab, tab === 'AWARDS' && styles.tabActive]} onPress={() => setTab('AWARDS')}>
          <Text style={[styles.tabText, tab === 'AWARDS' && styles.tabTextActive]}>Awards</Text>
        </Pressable>
        <Pressable style={[styles.tab, tab === 'ISSUED' && styles.tabActive]} onPress={() => setTab('ISSUED')}>
          <Text style={[styles.tabText, tab === 'ISSUED' && styles.tabTextActive]}>Recently Issued</Text>
        </Pressable>
      </View>

      {isLoading ? <ActivityIndicator style={{ marginTop: 40 }} color={theme.colors.primary} /> : (
        tab === 'AWARDS' ? (
          <FlatList data={awards} renderItem={renderAward} keyExtractor={(i) => i?.id ?? ''} contentContainerStyle={styles.list}
            ListEmptyComponent={<Text style={styles.empty}>No awards defined yet</Text>} />
        ) : (
          <FlatList data={issuances} renderItem={renderIssuance} keyExtractor={(i) => i?.id ?? ''} contentContainerStyle={styles.list}
            ListEmptyComponent={<Text style={styles.empty}>No awards issued yet</Text>} />
        )
      )}

      <Portal>
        <Modal visible={showCreate} onDismiss={() => setShowCreate(false)} contentContainerStyle={styles.modal}>
          <Text style={styles.modalTitle}>New Award</Text>
          {!!error && <Text style={styles.error}>{error}</Text>}
          <TextInput label="Award Name" value={name} onChangeText={setName} mode="outlined" style={styles.input} outlineColor={theme.colors.border} activeOutlineColor={theme.colors.primary} />
          <TextInput label="Description (optional)" value={description} onChangeText={setDescription} mode="outlined" style={styles.input} outlineColor={theme.colors.border} activeOutlineColor={theme.colors.primary} />
          <Button mode="contained" onPress={handleCreate} loading={createMutation?.isPending} style={styles.btn} buttonColor={theme.colors.primary}>Create Award</Button>
        </Modal>
      </Portal>

      <PersonPicker visible={showPicker} onDismiss={() => { setShowPicker(false); setIssueFor(null); }} onSelect={handlePick} title={`Issue "${issueFor?.name ?? ''}"`} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 4 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.text },
  tabs: { flexDirection: 'row', backgroundColor: theme.colors.primaryLight, borderRadius: 10, padding: 4, marginHorizontal: 16, marginBottom: 8 },
  tab: { flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  tabActive: { backgroundColor: '#FFF', elevation: 1 },
  tabText: { fontSize: 14, fontWeight: '600', color: theme.colors.textSecondary },
  tabTextActive: { color: theme.colors.primary },
  list: { paddingHorizontal: 16, paddingBottom: 40 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 12, padding: 14, marginBottom: 10, elevation: 1, gap: 12 },
  iconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: theme.colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '600', color: theme.colors.text },
  cardSub: { fontSize: 13, color: theme.colors.textSecondary, marginTop: 3 },
  cardMeta: { fontSize: 12, color: theme.colors.primary, marginTop: 3, fontWeight: '600' },
  issueBtn: { borderRadius: 8 },
  empty: { textAlign: 'center', color: theme.colors.textSecondary, marginTop: 40, fontSize: 15 },
  modal: { backgroundColor: '#FFF', margin: 20, borderRadius: 16, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.text, marginBottom: 16 },
  input: { marginBottom: 12, backgroundColor: '#FFF' },
  error: { color: theme.colors.error, marginBottom: 12, textAlign: 'center' },
  btn: { marginTop: 4, borderRadius: 8 },
});
