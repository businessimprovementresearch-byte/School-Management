import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, RefreshControl, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '@/src/theme';
import {
  useClassesControllerFindAll,
  useAcademicYearsControllerFindAll,
  useSessionsControllerBulkCreate,
} from '@/src/api/generated/api';
import LoadingScreen from '@/src/components/LoadingScreen';
import { useAuth } from '@/src/context/AuthContext';
import { getErrorMessage } from '@/src/api/customFetch';

const gradeOrder = ['Nursery', '1', '2', '3', '4', '5', '6', 'Special'];

const getUpcomingSunday = () => {
  const d = new Date();
  const day = d.getDay();
  const diff = day === 0 ? 0 : 7 - day;
  d.setDate(d.getDate() + diff);
  return d.toISOString().split('T')[0];
};

const confirmAsync = (title: string, message: string): Promise<boolean> => {
  if (Platform.OS === 'web') {
    return Promise.resolve(window.confirm(`${title}\n\n${message}`));
  }
  return new Promise((resolve) => {
    Alert.alert(title, message, [
      { text: 'Cancel', style: 'cancel', onPress: () => resolve(false) },
      { text: 'Create', onPress: () => resolve(true) },
    ]);
  });
};

const notify = (title: string, message: string) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};

export default function ClassesScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  const { data: rawClasses, isLoading: isLoadingClasses, refetch: refetchClasses } = useClassesControllerFindAll();
  const { data: years, isLoading: isLoadingYears, refetch: refetchYears } = useAcademicYearsControllerFindAll();
  const [refreshing, setRefreshing] = useState(false);
  const bulkCreateMutation = useSessionsControllerBulkCreate();

  useFocusEffect(
    useCallback(() => {
      refetchClasses();
      refetchYears();
    }, [refetchClasses, refetchYears])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchClasses(), refetchYears()]);
    setRefreshing(false);
  };

  // 1. Identifikasi Academic Years
  const activeYear = useMemo(() => {
    if (!years || !Array.isArray(years)) return null;
    return years.find((y: any) => y?.isActive === true || String(y?.status).toUpperCase() === 'ACTIVE');
  }, [years]);

  // 2. Filter HANYA Class yang Aktif pada Tahun Ajaran Berjalan
  const activeClasses = useMemo(() => {
    if (!rawClasses || !Array.isArray(rawClasses)) return [];

    return rawClasses.filter((c: any) => {
      const isClassActive = c?.isActive !== false && String(c?.status).toUpperCase() !== 'INACTIVE';
      if (!isClassActive) return false;

      if (activeYear) {
        if (c?.academicYearId) return c.academicYearId === activeYear.id;
        if (c?.academicYear?.id) return c.academicYear.id === activeYear.id;
        if (c?.academicYear?.isActive !== undefined) return c.academicYear.isActive === true;
      }
      return isClassActive;
    });
  }, [rawClasses, activeYear]);

  const handleBulkCreateSessions = async () => {
    const sundayDate = getUpcomingSunday();
    const confirmed = await confirmAsync(
      'Create Sessions for Sunday',
      `This will create a session for every active class on ${sundayDate} (skipping any class that already has one for that date). Continue?`
    );
    if (!confirmed) return;

    bulkCreateMutation.mutate(
      { data: { date: sundayDate } },
      {
        onSuccess: (res) => {
          notify(
            'Sessions Created',
            `${sundayDate}: created ${res?.createdCount ?? 0}, skipped ${res?.skippedCount ?? 0} (already existed), out of ${res?.totalClasses ?? 0} classes.`
          );
          refetchClasses();
        },
        onError: (e) => notify('Error', getErrorMessage(e, 'Failed to create sessions')),
      }
    );
  };

  if ((isLoadingClasses || isLoadingYears) && !refreshing) return <LoadingScreen />;

  const grouped = gradeOrder.map(
    (grade) => [grade, activeClasses.filter((c: any) => c?.grade === grade)] as const
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Classes</Text>
        {isAdmin ? (
          <View style={styles.headerActions}>
            <Pressable style={styles.addBtn} onPress={() => router.push('/add-class')}>
              <Ionicons name="add" size={18} color="#fff" />
              <Text style={styles.addBtnText}>Add Class</Text>
            </Pressable>
            <Pressable style={styles.bulkBtn} onPress={handleBulkCreateSessions} disabled={bulkCreateMutation.isPending}>
              <Ionicons name="calendar" size={16} color={Colors.primary} />
              <Text style={styles.bulkBtnText}>
                {bulkCreateMutation.isPending ? 'Creating...' : 'Create Sessions (Sun)'}
              </Text>
            </Pressable>
          </View>
        ) : null}
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
      >
        {grouped.map(([grade, classes]) => (
          <View key={grade} style={styles.section}>
            <Text style={styles.sectionTitle}>
              {grade === 'Special' ? 'Special Classes' : grade === 'Nursery' ? 'Nursery' : `Grade ${grade}`}
            </Text>
            {classes.length === 0 ? (
              <Text style={styles.emptyGradeText}>No active classes for this grade</Text>
            ) : (
              classes.map((c: any) => (
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
                      {(c?.teachers?.length ?? 0) > 0
                        ? ` · ${(c?.teachers ?? []).map((t: any) => t?.name ?? '').join(', ')}`
                        : ''}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
                </Pressable>
              ))
            )}
          </View>
        ))}
      </ScrollView>
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
    paddingBottom: Spacing.sm,
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, flexWrap: 'wrap' },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
  },
  addBtnText: { fontSize: 12, fontWeight: '700', color: '#fff' },
  bulkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primary + '14',
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
  },
  bulkBtnText: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  title: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary },
  content: { padding: Spacing.lg },
  section: { marginBottom: Spacing.xl },
  emptyGradeText: { fontSize: 13, color: Colors.textSecondary, fontStyle: 'italic', paddingVertical: 4 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  classCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  classIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.secondary + '12',
    justify: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  className: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary },
  classInfo: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
});