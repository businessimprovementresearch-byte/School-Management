import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';
import { Text, TextInput, Button, ActivityIndicator, Portal, Modal, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  useEventsControllerFindOne,
  useEventsControllerCreateGroup,
  useEventsControllerRemoveGroup,
  useEventsControllerAddParticipant,
  useEventsControllerRemoveParticipant,
} from '@/src/api/generated/api';
import type { EventParticipantDto } from '@/src/api/generated/schemas';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/src/theme';
import { getErrorMessage } from '@/src/api/customFetch';
import { useAuth } from '@/src/context/AuthContext';
import PersonPicker, { PickedPerson } from '@/src/components/PersonPicker';

export default function EventDetailScreen() {
  const { id = '' } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  const { data, isLoading, refetch } = useEventsControllerFindOne(id, { query: { enabled: !!id } });
  const createGroup = useEventsControllerCreateGroup();
  const removeGroup = useEventsControllerRemoveGroup();
  const addParticipant = useEventsControllerAddParticipant();
  const removeParticipant = useEventsControllerRemoveParticipant();

  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [pendingGroupId, setPendingGroupId] = useState<string | undefined>(undefined);
  const [error, setError] = useState('');

  if (!id) {
    return (
      <SafeAreaView style={styles.container}><Text style={styles.empty}>Invalid event.</Text></SafeAreaView>
    );
  }

  const groups = data?.groups ?? [];
  const participants = data?.participants ?? [];
  const ungrouped = participants.filter((p) => !p?.groupId);

  const handleCreateGroup = () => {
    setError('');
    if (!groupName?.trim()) { setError('Group name is required'); return; }
    createGroup.mutate({ id, data: { name: groupName.trim() } }, {
      onSuccess: () => { setShowGroupModal(false); setGroupName(''); refetch(); },
      onError: (e) => setError(getErrorMessage(e, 'Failed to create group')),
    });
  };

  const openPicker = (groupId?: string) => { setPendingGroupId(groupId); setShowPicker(true); };

  const handlePick = (p: PickedPerson) => {
    setShowPicker(false);
    addParticipant.mutate({
      id,
      data: {
        studentId: p?.kind === 'STUDENT' ? p?.id : undefined,
        teacherId: p?.kind === 'TEACHER' ? p?.id : undefined,
        groupId: pendingGroupId,
      },
    }, {
      onSuccess: () => refetch(),
      onError: (e) => Alert.alert('Error', getErrorMessage(e, 'Failed to add participant')),
    });
  };

  const confirmRemoveParticipant = (pid: string) => {
    removeParticipant.mutate({ participantId: pid }, { onSuccess: () => refetch() });
  };

  const confirmRemoveGroup = (gid: string) => {
    Alert.alert('Remove Group', 'Participants in this group will become ungrouped. Continue?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => removeGroup.mutate({ groupId: gid }, { onSuccess: () => refetch() }) },
    ]);
  };

  const ParticipantChip = ({ p }: { p: EventParticipantDto }) => (
    <View style={styles.chip}>
      <Ionicons name={p?.kind === 'TEACHER' ? 'school' : 'person'} size={14} color={theme.colors.primary} />
      <Text style={styles.chipText}>{p?.name ?? ''}</Text>
      {isAdmin ? (
        <Pressable onPress={() => confirmRemoveParticipant(p?.id ?? '')} hitSlop={8}>
          <Ionicons name="close-circle" size={16} color={theme.colors.textSecondary} />
        </Pressable>
      ) : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={16}><Ionicons name="arrow-back" size={24} color={theme.colors.text} /></Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>{data?.name ?? 'Event'}</Text>
        <View style={{ width: 24 }} />
      </View>

      {isLoading ? <ActivityIndicator style={{ marginTop: 40 }} color={theme.colors.primary} /> : (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.metaCard}>
            <Text style={styles.metaDate}>{data?.date?.split('T')?.[0] ?? ''}</Text>
            {!!data?.location && <Text style={styles.metaLoc}>{data.location}</Text>}
            {!!data?.description && <Text style={styles.metaDesc}>{data.description}</Text>}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Groups</Text>
            {isAdmin ? <Button compact mode="text" textColor={theme.colors.primary} onPress={() => setShowGroupModal(true)}>+ Add</Button> : null}
          </View>

          {groups.length === 0 ? <Text style={styles.hint}>No groups. Participants can be added directly.</Text> : null}
          {groups.map((g) => {
            const members = participants.filter((p) => p?.groupId === g?.id);
            return (
              <View key={g?.id} style={styles.groupCard}>
                <View style={styles.groupHead}>
                  <Text style={styles.groupName}>{g?.name ?? ''}</Text>
                  {isAdmin ? (
                    <View style={{ flexDirection: 'row' }}>
                      <IconButton icon="account-plus" size={18} iconColor={theme.colors.primary} onPress={() => openPicker(g?.id)} />
                      <IconButton icon="trash-can-outline" size={18} iconColor={theme.colors.error} onPress={() => confirmRemoveGroup(g?.id ?? '')} />
                    </View>
                  ) : null}
                </View>
                <View style={styles.chipWrap}>
                  {members.length === 0 ? <Text style={styles.hint}>No members</Text> : members.map((p) => <ParticipantChip key={p?.id} p={p} />)}
                </View>
              </View>
            );
          })}

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Participants{groups.length > 0 ? ' (Ungrouped)' : ''}</Text>
            {isAdmin ? <Button compact mode="text" textColor={theme.colors.primary} onPress={() => openPicker(undefined)}>+ Add</Button> : null}
          </View>
          <View style={styles.chipWrap}>
            {ungrouped.length === 0 ? <Text style={styles.hint}>No participants yet</Text> : ungrouped.map((p) => <ParticipantChip key={p?.id} p={p} />)}
          </View>
        </ScrollView>
      )}

      <Portal>
        <Modal visible={showGroupModal} onDismiss={() => setShowGroupModal(false)} contentContainerStyle={styles.modal}>
          <Text style={styles.modalTitle}>New Group</Text>
          {!!error && <Text style={styles.error}>{error}</Text>}
          <TextInput label="Group Name" value={groupName} onChangeText={setGroupName} mode="outlined" style={styles.input} outlineColor={theme.colors.border} activeOutlineColor={theme.colors.primary} />
          <Button mode="contained" onPress={handleCreateGroup} loading={createGroup?.isPending} style={styles.btn} buttonColor={theme.colors.primary}>Create</Button>
        </Modal>
      </Portal>

      <PersonPicker visible={showPicker} onDismiss={() => setShowPicker(false)} onSelect={handlePick} title="Add Participant" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 10, gap: 12 },
  headerTitle: { flex: 1, fontSize: 18, fontWeight: '700', color: theme.colors.text },
  content: { padding: 16, paddingBottom: 48 },
  metaCard: { backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginBottom: 16, elevation: 1 },
  metaDate: { fontSize: 15, fontWeight: '700', color: theme.colors.primary },
  metaLoc: { fontSize: 14, color: theme.colors.textSecondary, marginTop: 4 },
  metaDesc: { fontSize: 14, color: theme.colors.text, marginTop: 8, lineHeight: 20 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, marginBottom: 6 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: theme.colors.text },
  hint: { fontSize: 13, color: theme.colors.textSecondary, marginVertical: 4 },
  groupCard: { backgroundColor: '#FFF', borderRadius: 12, padding: 12, marginBottom: 10, elevation: 1 },
  groupHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  groupName: { fontSize: 15, fontWeight: '600', color: theme.colors.text },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: theme.colors.primaryLight, borderRadius: 20, paddingVertical: 6, paddingHorizontal: 12 },
  chipText: { fontSize: 13, color: theme.colors.text, fontWeight: '500' },
  modal: { backgroundColor: '#FFF', margin: 20, borderRadius: 16, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.text, marginBottom: 16 },
  input: { marginBottom: 12, backgroundColor: '#FFF' },
  error: { color: theme.colors.error, marginBottom: 12, textAlign: 'center' },
  btn: { marginTop: 4, borderRadius: 8 },
  empty: { textAlign: 'center', color: theme.colors.textSecondary, marginTop: 40 },
});
