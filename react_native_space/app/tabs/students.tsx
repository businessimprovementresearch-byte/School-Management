import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { Colors, Spacing, BorderRadius } from '@/src/theme';
import { useAuth } from '@/src/context/AuthContext';
import { useStudentsControllerFindAll, useClassesControllerFindAll } from '@/src/api/generated/api';
import Avatar from '@/src/components/Avatar';
import LoadingScreen from '@/src/components/LoadingScreen';
import { useFocusEffect } from 'expo-router';

export default function StudentsScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState<string | undefined>(undefined);
  const isAdmin = user?.role === 'ADMIN';

  const { data: classesData } = useClassesControllerFindAll();
  const { data, isLoading, refetch } = useStudentsControllerFindAll(
    { search: search || undefined, classId: selectedClass, page: 1, limit: 100 },
  );
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(useCallback(() => { refetch(); }, []));

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const students = data?.items ?? [];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Students</Text>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={Colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search students..."
          placeholderTextColor={Colors.textSecondary + '80'}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Class filter chips */}
      <View style={styles.filterRow}>
        <Pressable
          style={[styles.filterChip, !selectedClass && styles.filterChipActive]}
          onPress={() => setSelectedClass(undefined)}
        >
          <Text style={[styles.filterChipText, !selectedClass && styles.filterChipTextActive]}>All</Text>
        </Pressable>
        {(classesData ?? []).map((c) => (
          <Pressable
            key={c?.id}
            style={[styles.filterChip, selectedClass === c?.id && styles.filterChipActive]}
            onPress={() => setSelectedClass(selectedClass === c?.id ? undefined : c?.id)}
          >
            <Text style={[styles.filterChipText, selectedClass === c?.id && styles.filterChipTextActive]}>
              {c?.name ?? ''}
            </Text>
          </Pressable>
        ))}
      </View>

      {isLoading ? <LoadingScreen /> : (
        <View style={{ flex: 1 }}>
          <FlashList
            data={students}
            keyExtractor={(item) => item?.id ?? ''}
            renderItem={({ item }) => (
              <Pressable style={styles.studentCard} onPress={() => router.push(`/student/${item?.id}`)}>
                <Avatar uri={item?.photoUrl} name={item?.name} size={48} />
                <View style={styles.studentInfo}>
                  <Text style={styles.studentName}>{item?.name ?? ''}{item?.nickname ? ` (${item.nickname})` : ''}</Text>
                  <Text style={styles.studentParent}>{item?.parentName ?? ''}</Text>
                  <View style={styles.classChips}>
                    {(item?.enrolledClasses ?? []).map((c) => (
                      <View key={c?.id} style={styles.classChip}>
                        <Text style={styles.classChipText}>{c?.name ?? ''}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
              </Pressable>
            )}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
            ListEmptyComponent={<Text style={styles.emptyText}>No students found</Text>}
          />
        </View>
      )}

      {isAdmin ? (
        <Pressable style={styles.fab} onPress={() => router.push('/add-student')}>
          <Ionicons name="add" size={28} color="#fff" />
        </Pressable>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, paddingBottom: Spacing.sm },
  title: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface,
    marginHorizontal: Spacing.lg, borderRadius: BorderRadius.md, paddingHorizontal: Spacing.md, height: 44,
    marginBottom: Spacing.sm,
  },
  searchInput: { flex: 1, marginLeft: Spacing.sm, fontSize: 16, color: Colors.textPrimary },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: Spacing.lg, gap: Spacing.sm, marginBottom: Spacing.sm },
  filterChip: { backgroundColor: Colors.surface, paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.border },
  filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterChipText: { fontSize: 12, color: Colors.textSecondary, fontWeight: '600' },
  filterChipTextActive: { color: '#fff' },
  studentCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface,
    marginHorizontal: Spacing.lg, marginBottom: Spacing.sm, padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1,
  },
  studentInfo: { flex: 1, marginLeft: Spacing.md },
  studentName: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary },
  studentParent: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  classChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 4 },
  classChip: { backgroundColor: Colors.primary + '15', paddingHorizontal: 8, paddingVertical: 2, borderRadius: BorderRadius.full },
  classChipText: { fontSize: 11, color: Colors.primary, fontWeight: '600' },
  fab: {
    position: 'absolute', bottom: 20, right: 20,
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5,
  },
  emptyText: { textAlign: 'center', color: Colors.textSecondary, marginTop: Spacing.xxxl, fontSize: 16 },
});
