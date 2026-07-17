import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Pressable } from 'react-native';
import { Text, TextInput, Portal, Modal, ActivityIndicator } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useStudentsControllerFindAll, useTeachersControllerFindAll } from '@/src/api/generated/api';
import { theme } from '@/src/theme';

export type PickedPerson = { kind: 'STUDENT' | 'TEACHER'; id: string; name: string };

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onSelect: (p: PickedPerson) => void;
  title?: string;
};

export default function PersonPicker({ visible, onDismiss, onSelect, title = 'Select Person' }: Props) {
  const [tab, setTab] = useState<'STUDENT' | 'TEACHER'>('STUDENT');
  const [search, setSearch] = useState('');

  const studentsQuery = useStudentsControllerFindAll({ search: search || undefined, limit: 50 });
  const teachersQuery = useTeachersControllerFindAll();

  const students = studentsQuery?.data?.items ?? [];
  const teachers = teachersQuery?.data ?? [];
  const isLoading = tab === 'STUDENT' ? studentsQuery?.isLoading : teachersQuery?.isLoading;

  const rows =
    tab === 'STUDENT'
      ? students.map((s) => ({ id: s?.id ?? '', name: s?.name ?? '' }))
      : teachers.map((t) => ({ id: t?.id ?? '', name: t?.name ?? '' }));

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.tabs}>
          <Pressable style={[styles.tab, tab === 'STUDENT' && styles.tabActive]} onPress={() => setTab('STUDENT')}>
            <Text style={[styles.tabText, tab === 'STUDENT' && styles.tabTextActive]}>Students</Text>
          </Pressable>
          <Pressable style={[styles.tab, tab === 'TEACHER' && styles.tabActive]} onPress={() => setTab('TEACHER')}>
            <Text style={[styles.tabText, tab === 'TEACHER' && styles.tabTextActive]}>Teachers</Text>
          </Pressable>
        </View>
        {tab === 'STUDENT' ? (
          <TextInput
            placeholder="Search students"
            value={search}
            onChangeText={setSearch}
            mode="outlined"
            dense
            style={styles.search}
            outlineColor={theme.colors.border}
            activeOutlineColor={theme.colors.primary}
            left={<TextInput.Icon icon="magnify" />}
          />
        ) : null}
        {isLoading ? (
          <ActivityIndicator style={{ marginVertical: 30 }} color={theme.colors.primary} />
        ) : (
          <FlatList
            data={rows}
            keyExtractor={(item) => item?.id ?? Math.random().toString()}
            style={{ maxHeight: 320 }}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <Pressable
                style={styles.row}
                onPress={() => onSelect({ kind: tab, id: item?.id ?? '', name: item?.name ?? '' })}
              >
                <View style={styles.avatar}>
                  <Ionicons name={tab === 'STUDENT' ? 'person' : 'school'} size={16} color={theme.colors.primary} />
                </View>
                <Text style={styles.rowText}>{item?.name ?? ''}</Text>
              </Pressable>
            )}
            ListEmptyComponent={<Text style={styles.empty}>No results</Text>}
          />
        )}
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: { backgroundColor: '#FFF', margin: 20, borderRadius: 16, padding: 20 },
  title: { fontSize: 18, fontWeight: '700', color: theme.colors.text, marginBottom: 12 },
  tabs: { flexDirection: 'row', backgroundColor: theme.colors.primaryLight, borderRadius: 10, padding: 4, marginBottom: 12 },
  tab: { flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  tabActive: { backgroundColor: '#FFF', elevation: 1 },
  tabText: { fontSize: 14, fontWeight: '600', color: theme.colors.textSecondary },
  tabTextActive: { color: theme.colors.primary },
  search: { marginBottom: 8, backgroundColor: '#FFF' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, gap: 12, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: theme.colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  rowText: { fontSize: 15, color: theme.colors.text },
  empty: { textAlign: 'center', color: theme.colors.textSecondary, marginVertical: 24 },
});
