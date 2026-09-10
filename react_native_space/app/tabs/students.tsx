import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, RefreshControl, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { Colors, Spacing, BorderRadius } from '@/src/theme';
import { useAuth } from '@/src/context/AuthContext';
import { useStudentsControllerFindAll, useClassesControllerFindAll } from '@/src/api/generated/api';
import Avatar from '@/src/components/Avatar';
import LoadingScreen from '@/src/components/LoadingScreen';

export default function StudentsScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState<string | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<'ACTIVE' | 'INACTIVE' | 'ALL'>('ACTIVE');
  const [sortOrder, setSortOrder] = useState<'AZ' | 'RECENT'>('AZ');
  const [refreshing, setRefreshing] = useState(false);

  const isAdmin = user?.role === 'ADMIN';

  const { data: classesData } = useClassesControllerFindAll();
  const { data, isLoading, refetch } = useStudentsControllerFindAll({
    search: search || undefined,
    classId: selectedClass,
    page: 1,
    limit: 200,
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const rawStudents = data?.items ?? [];

  // Filter & Sort Students (Default Alphabetical A-Z)
  const students = useMemo(() => {
    let list = [...rawStudents];

    // Status Filtering
    if (statusFilter === 'ACTIVE') {
      list = list.filter(
        (s: any) => s?.isActive !== false && String(s?.status).toUpperCase() !== 'INACTIVE'
      );
    } else if (statusFilter === 'INACTIVE') {
      list = list.filter(
        (s: any) => s?.isActive === false || String(s?.status).toUpperCase() === 'INACTIVE'
      );
    }

    // Alphabetical A-Z or Recent Sorting
    if (sortOrder === 'AZ') {
      list.sort((a: any, b: any) => (a?.name ?? '').localeCompare(b?.name ?? ''));
    } else {
      list.sort(
        (a: any, b: any) =>
          new Date(b?.createdAt ?? 0).getTime() - new Date(a?.createdAt ?? 0).getTime()
      );
    }

    return list;
  }, [rawStudents, statusFilter, sortOrder]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header Bar */}
      <View style={styles.header}>
        <Text style={styles.title}>Students</Text>
        <Pressable
          style={styles.sortToggleBtn}
          onPress={() => setSortOrder(sortOrder === 'AZ' ? 'RECENT' : 'AZ')}
        >
          <Ionicons name="swap-vertical" size={16} color={Colors.primary} />
          <Text style={styles.sortToggleText}>
            {sortOrder === 'AZ' ? 'Sort: A-Z' : 'Sort: Recent'}
          </Text>
        </Pressable>
      </View>

      {/* Search Input */}
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

      {/* Status Filter Tabs (Active / Inactive / All) */}
      <View style={styles.statusFilterRow}>
        <Pressable
          style={[styles.statusTab, statusFilter === 'ACTIVE' && styles.statusTabActive]}
          onPress={() => setStatusFilter('ACTIVE')}
        >
          <Text
            style={[styles.statusTabText, statusFilter === 'ACTIVE' && styles.statusTabTextActive]}
          >
            Active
          </Text>
        </Pressable>

        <Pressable
          style={[styles.statusTab, statusFilter === 'INACTIVE' && styles.statusTabActive]}
          onPress={() => setStatusFilter('INACTIVE')}
        >
          <Text
            style={[styles.statusTabText, statusFilter === 'INACTIVE' && styles.statusTabTextActive]}
          >
            Inactive
          </Text>
        </Pressable>

        <Pressable
          style={[styles.statusTab, statusFilter === 'ALL' && styles.statusTabActive]}
          onPress={() => setStatusFilter('ALL')}
        >
          <Text
            style={[styles.statusTabText, statusFilter === 'ALL' && styles.statusTabTextActive]}
          >
            All
          </Text>
        </Pressable>
      </View>

      {/* Class Filter Chips */}
      <View style={styles.filterRow}>
        <Pressable
          style={[styles.filterChip, !selectedClass && styles.filterChipActive]}
          onPress={() => setSelectedClass(undefined)}
        >
          <Text style={[styles.filterChipText, !selectedClass && styles.filterChipTextActive]}>
            All Classes
          </Text>
        </Pressable>
        {(classesData ?? []).map((c: any) => (
          <Pressable
            key={c?.id}
            style={[styles.filterChip, selectedClass === c?.id && styles.filterChipActive]}
            onPress={() => setSelectedClass(selectedClass === c?.id ? undefined : c?.id)}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedClass === c?.id && styles.filterChipTextActive,
              ]}
            >
              {c?.name ?? ''}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Main Student List */}
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <View style={{ flex: 1 }}>
          <FlashList
            data={students}
            keyExtractor={(item: any) => item?.id ?? ''}
            renderItem={({ item }: { item: any }) => {
              const isInactive =
                item?.isActive === false || String(item?.status).toUpperCase() === 'INACTIVE';

              return (
                <Pressable
                  style={[styles.studentCard, isInactive && styles.inactiveCard]}
                  onPress={() => router.push(`/student/${item?.id}`)}
                >
                  <Avatar uri={item?.photoUrl} name={item?.name} size={48} />
                  <View style={styles.studentInfo}>
                    <View style={styles.nameRow}>
                      <Text style={styles.studentName}>
                        {item?.name ?? ''}
                        {item?.nickname ? ` (${item.nickname})` : ''}
                      </Text>
                      {isInactive && (
                        <View style={styles.inactiveBadge}>
                          <Text style={styles.inactiveBadgeText}>Inactive</Text>
                        </View>
                      )}
                    </View>
                    {!!item?.studentIdNumber && (
                      <Text style={styles.studentId}>ID: {item.studentIdNumber}</Text>
                    )}
                    <Text style={styles.studentParent}>{item?.parentName ?? ''}</Text>
                    <View style={styles.classChips}>
                      {(item?.enrolledClasses ?? []).map((c: any) => (
                        <View key={c?.id} style={styles.classChip}>
                          <Text style={styles.classChipText}>{c?.name ?? ''}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
                </Pressable>
              );
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={Colors.primary}
              />
            }
            ListEmptyComponent={
              <Text style={styles.emptyText}>No students found</Text>
            }
          />
        </View>
      )}

      {/* Add Student FAB */}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xs,
  },
  title: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary },
  sortToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
  },
  sortToggleText: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    height: 44,
    marginBottom: Spacing.sm,
  },
  searchInput: { flex: 1, marginLeft: Spacing.sm, fontSize: 16, color: Colors.textPrimary },
  statusFilterRow: {
    flexDirection: 'row',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: 3,
  },
  statusTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    borderRadius: BorderRadius.sm,
  },
  statusTabActive: {
    backgroundColor: Colors.primary,
  },
  statusTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  statusTabTextActive: {
    color: '#FFFFFF',
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  filterChip: {
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterChipText: { fontSize: 12, color: Colors.textSecondary, fontWeight: '600' },
  filterChipTextActive: { color: '#fff' },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  inactiveCard: {
    opacity: 0.65,
    backgroundColor: '#F3F4F6',
  },
  studentInfo: { flex: 1, marginLeft: Spacing.md },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    paddingRight: Spacing.xs,
  },
  studentName: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, flex: 1 },
  inactiveBadge: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  inactiveBadgeText: { fontSize: 10, fontWeight: '700', color: '#6B7280' },
  studentId: { fontSize: 12, color: Colors.primary, fontWeight: '600', marginTop: 1 },
  studentParent: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  classChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 4 },
  classChip: {
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  classChipText: { fontSize: 11, color: Colors.primary, fontWeight: '600' },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justify: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.textSecondary,
    marginTop: Spacing.xxxl,
    fontSize: 16,
  },
});