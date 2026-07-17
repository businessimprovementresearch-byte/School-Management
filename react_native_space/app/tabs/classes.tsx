import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '@/src/theme';
import { useClassesControllerFindAll } from '@/src/api/generated/api';
import LoadingScreen from '@/src/components/LoadingScreen';
import { useFocusEffect } from 'expo-router';

const gradeOrder = ['Nursery', '1', '2', '3', '4', '5', '6', 'Special'];

export default function ClassesScreen() {
  const router = useRouter();
  const { data, isLoading, refetch } = useClassesControllerFindAll();
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(useCallback(() => { refetch(); }, []));

  const onRefresh = async () => { setRefreshing(true); await refetch(); setRefreshing(false); };

  if (isLoading || !data) return <LoadingScreen />;

  const grouped = gradeOrder.reduce<Record<string, typeof data>>((acc, grade) => {
    const items = (data ?? []).filter((c) => c?.grade === grade);
    if (items.length > 0) acc[grade] = items;
    return acc;
  }, {});

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Classes</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
      >
        {Object.entries(grouped).map(([grade, classes]) => (
          <View key={grade} style={styles.section}>
            <Text style={styles.sectionTitle}>
              {grade === 'Special' ? 'Special Classes' : grade === 'Nursery' ? 'Nursery' : `Grade ${grade}`}
            </Text>
            {(classes ?? []).map((c) => (
              <Pressable
                key={c?.id}
                style={styles.classCard}
                onPress={() => router.push(`/class/${c?.id}`)}
              >
                <View style={styles.classIcon}>
                  <Ionicons name="book" size={24} color={Colors.secondary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.className}>{c?.name ?? ''}</Text>
                  <Text style={styles.classInfo}>
                    {c?.studentCount ?? 0} students
                    {(c?.teachers?.length ?? 0) > 0 ? ` · ${(c?.teachers ?? []).map((t) => t?.name ?? '').join(', ')}` : ''}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
              </Pressable>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, paddingBottom: Spacing.sm },
  title: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary },
  content: { padding: Spacing.lg },
  section: { marginBottom: Spacing.xl },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.textSecondary, marginBottom: Spacing.sm, textTransform: 'uppercase', letterSpacing: 0.5 },
  classCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg, padding: Spacing.lg, marginBottom: Spacing.sm,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1,
  },
  classIcon: {
    width: 48, height: 48, borderRadius: 12, backgroundColor: Colors.secondary + '12',
    justifyContent: 'center', alignItems: 'center', marginRight: Spacing.md,
  },
  className: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary },
  classInfo: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
});
