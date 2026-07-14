import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Pressable } from 'react-native';
import { Text, TextInput, Button, ActivityIndicator, Portal, Modal, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useEventsControllerFindAll, useEventsControllerCreate } from '@/src/api/generated/api';
import type { EventListItemDto } from '@/src/api/generated/schemas';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/src/theme';
import { getErrorMessage } from '@/src/api/customFetch';
import { useAuth } from '@/src/context/AuthContext';

export default function EventsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const { data, isLoading, refetch } = useEventsControllerFindAll();
  const createMutation = useEventsControllerCreate();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const handleCreate = () => {
    setError('');
    if (!name?.trim() || !date?.trim()) { setError('Name and date are required'); return; }
    createMutation.mutate({ data: { name: name.trim(), description: description || undefined, date, location: location || undefined } }, {
      onSuccess: () => { setShowModal(false); setName(''); setDescription(''); setDate(''); setLocation(''); refetch(); },
      onError: (e) => setError(getErrorMessage(e, 'Failed to create event')),
    });
  };

  const renderItem = ({ item }: { item: EventListItemDto }) => (
    <Pressable style={styles.card} onPress={() => router.push(`/event/${item?.id ?? ''}`)}>
      <View style={styles.iconBox}><Ionicons name="sparkles" size={22} color={theme.colors.primary} /></View>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{item?.name ?? ''}</Text>
        <Text style={styles.cardSub}>{item?.date?.split('T')?.[0] ?? ''}{item?.location ? ` • ${item.location}` : ''}</Text>
        <Text style={styles.cardMeta}>{item?.participantCount ?? 0} participants • {item?.groupCount ?? 0} groups</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={16}><Ionicons name="arrow-back" size={24} color={theme.colors.text} /></Pressable>
        <Text style={styles.headerTitle}>Events</Text>
        {isAdmin ? <IconButton icon="plus" onPress={() => setShowModal(true)} iconColor={theme.colors.primary} /> : <View style={{ width: 40 }} />}
      </View>
      {isLoading ? <ActivityIndicator style={{ marginTop: 40 }} color={theme.colors.primary} /> : (
        <FlatList data={data ?? []} renderItem={renderItem} keyExtractor={item => item?.id ?? ''} contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>No events yet</Text>} />
      )}
      <Portal>
        <Modal visible={showModal} onDismiss={() => setShowModal(false)} contentContainerStyle={styles.modal}>
          <Text style={styles.modalTitle}>New Event</Text>
          {!!error && <Text style={styles.error}>{error}</Text>}
          <TextInput label="Event Name" value={name} onChangeText={setName} mode="outlined" style={styles.input} outlineColor={theme.colors.border} activeOutlineColor={theme.colors.primary} />
          <TextInput label="Description (optional)" value={description} onChangeText={setDescription} mode="outlined" style={styles.input} outlineColor={theme.colors.border} activeOutlineColor={theme.colors.primary} />
          <TextInput label="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} mode="outlined" style={styles.input} outlineColor={theme.colors.border} activeOutlineColor={theme.colors.primary} />
          <TextInput label="Location (optional)" value={location} onChangeText={setLocation} mode="outlined" style={styles.input} outlineColor={theme.colors.border} activeOutlineColor={theme.colors.primary} />
          <Button mode="contained" onPress={handleCreate} loading={createMutation?.isPending} style={styles.btn} buttonColor={theme.colors.primary}>Create Event</Button>
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
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 12, padding: 14, marginBottom: 10, elevation: 1, gap: 12 },
  iconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: theme.colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '600', color: theme.colors.text },
  cardSub: { fontSize: 13, color: theme.colors.textSecondary, marginTop: 3 },
  cardMeta: { fontSize: 12, color: theme.colors.primary, marginTop: 3, fontWeight: '600' },
  empty: { textAlign: 'center', color: theme.colors.textSecondary, marginTop: 40, fontSize: 15 },
  modal: { backgroundColor: '#FFF', margin: 20, borderRadius: 16, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.text, marginBottom: 16 },
  input: { marginBottom: 12, backgroundColor: '#FFF' },
  error: { color: theme.colors.error, marginBottom: 12, textAlign: 'center' },
  btn: { marginTop: 4, borderRadius: 8 },
});
