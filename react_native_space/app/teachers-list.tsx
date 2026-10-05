import React from 'react';
import { View, FlatList, StyleSheet, Pressable } from 'react-native';
import { Text, Searchbar, FAB, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTeachersControllerFindAll } from '@/src/api/generated/api';
import type { TeacherListItemDto } from '@/src/api/generated/schemas';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/src/theme';
import Avatar from '@/src/components/Avatar';

export default function TeachersListScreen() {
  const router = useRouter();
  const { data, isLoading, refetch } = useTeachersControllerFindAll();
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<'ACTIVE' | 'INACTIVE' | 'ALL'>('ACTIVE');

  useFocusEffect(React.useCallback(() => { refetch(); }, []));

  const filtered = React.useMemo(() => {
    let items = data ?? [];
    if (statusFilter === 'ACTIVE') items = items.filter((teacher) => teacher.isActive !== false);
    if (statusFilter === 'INACTIVE') items = items.filter((teacher) => teacher.isActive === false);
    if (!search.trim()) return items;
    const query = search.toLowerCase();
    return items.filter((teacher) =>
      `${teacher.nickname ?? ''} ${teacher.name ?? ''}`.toLowerCase().includes(query),
    );
  }, [data, search, statusFilter]);

  const renderItem = ({ item }: { item: TeacherListItemDto }) => (
    <Pressable style={styles.card} onPress={() => router.push(`/teacher/${item?.id}`)}>
      <Avatar name={item?.nickname || item?.name || ''} uri={item?.photoUrl} size={48} />
      <View style={styles.cardContent}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{item?.nickname || item?.name || 'Teacher'}</Text>
          {item?.isActive === false ? <Text style={styles.inactiveBadge}>Inactive</Text> : null}
        </View>
        {item?.nickname && item?.name ? <Text style={styles.sub}>{item.name}</Text> : null}
        <Text style={styles.sub}>{item?.contactNumber ?? ''}</Text>
        <View style={styles.classRow}>
          {(item?.assignedClasses ?? []).slice(0, 3).map(c => (
            <View key={c?.id} style={styles.classBadge}>
              <Text style={styles.classBadgeText}>{c?.name ?? ''}</Text>
            </View>
          ))}
          {(item?.assignedClasses?.length ?? 0) > 3 && (
            <Text style={styles.moreText}>+{(item?.assignedClasses?.length ?? 0) - 3}</Text>
          )}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={16}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </Pressable>
        <Text style={styles.title}>Teachers</Text>
        <View style={{ width: 24 }} />
      </View>
      <Searchbar placeholder="Search teachers..." value={search} onChangeText={setSearch} style={styles.search} />
      <View style={styles.statusFilters}>
        {(['ACTIVE', 'INACTIVE', 'ALL'] as const).map((filter) => (
          <Pressable
            key={filter}
            style={[styles.statusFilter, statusFilter === filter && styles.statusFilterActive]}
            onPress={() => setStatusFilter(filter)}
          >
            <Text style={[styles.statusFilterText, statusFilter === filter && styles.statusFilterTextActive]}>
              {filter === 'ALL' ? 'All' : filter === 'ACTIVE' ? 'Active' : 'Inactive'}
            </Text>
          </Pressable>
        ))}
      </View>
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 40 }} color={theme.colors.primary} />
      ) : (
        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={item => item?.id ?? ''}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>No teachers found</Text>}
        />
      )}
      <FAB icon="plus" style={styles.fab} onPress={() => router.push('/add-teacher')} color="#FFF" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  title: { fontSize: 20, fontWeight: '700', color: theme.colors.text },
  search: { marginHorizontal: 16, marginBottom: 8, backgroundColor: '#FFF', elevation: 1 },
  list: { paddingHorizontal: 16, paddingBottom: 100 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 12, padding: 14, marginBottom: 10, elevation: 1 },
  cardContent: { flex: 1, marginLeft: 12 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  name: { fontSize: 16, fontWeight: '600', color: theme.colors.text },
  inactiveBadge: { fontSize: 10, fontWeight: '700', color: '#B91C1C', backgroundColor: '#FEE2E2', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  statusFilters: { flexDirection: 'row', gap: 8, marginHorizontal: 16, marginBottom: 8 },
  statusFilter: { flex: 1, alignItems: 'center', paddingVertical: 9, borderRadius: 8, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E5E7EB' },
  statusFilterActive: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  statusFilterText: { fontSize: 13, fontWeight: '600', color: theme.colors.textSecondary },
  statusFilterTextActive: { color: '#FFF' },
  sub: { fontSize: 13, color: theme.colors.textSecondary, marginTop: 2 },
  classRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 6, gap: 4 },
  classBadge: { backgroundColor: theme.colors.primaryLight, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  classBadgeText: { fontSize: 11, color: theme.colors.primary, fontWeight: '600' },
  moreText: { fontSize: 11, color: theme.colors.textSecondary, alignSelf: 'center' },
  empty: { textAlign: 'center', color: theme.colors.textSecondary, marginTop: 40, fontSize: 15 },
  fab: { position: 'absolute', right: 20, bottom: 30, backgroundColor: theme.colors.primary },
});
