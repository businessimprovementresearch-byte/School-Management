import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, RefreshControl, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '@/src/theme';
import { useClassesControllerFindAll, useAttendanceControllerGetOverview, useAttendanceControllerGetByDate } from '@/src/api/generated/api';
import LoadingScreen from '@/src/components/LoadingScreen';
import { useFocusEffect } from 'expo-router';

export default function AttendanceScreen() {
  const router = useRouter();
  const { data: classesData } = useClassesControllerFindAll();
  const [viewMode, setViewMode] = useState<'CLASS' | 'DATE'>('CLASS');
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const now = new Date();
  const [month] = useState(now.getMonth() + 1);
  const [year] = useState(now.getFullYear());

  const classId = selectedClassId || (classesData?.[0]?.id ?? '');

  const { data: overview, isLoading, refetch } = useAttendanceControllerGetOverview(
    { classId, month, year },
    { query: { enabled: !!classId && viewMode === 'CLASS' } },
  );
  const [refreshing, setRefreshing] = useState(false);

  const [selectedDate, setSelectedDate] = useState(now.toISOString().split('T')[0]);
  const { data: byDate, isLoading: isLoadingByDate, refetch: refetchByDate } = useAttendanceControllerGetByDate(
    { date: selectedDate },
    { query: { enabled: viewMode === 'DATE' } },
  );

  useFocusEffect(useCallback(() => { if (classId && viewMode === 'CLASS') refetch(); }, [classId, viewMode]));
  useFocusEffect(useCallback(() => { if (viewMode === 'DATE') refetchByDate(); }, [selectedDate, viewMode]));

  const onRefresh = async () => {
    setRefreshing(true);
    if (viewMode === 'CLASS') await refetch(); else await refetchByDate();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Attendance</Text>
      </View>

      {/* View mode toggle */}
      <View style={styles.modeToggle}>
        <Pressable style={[styles.modeBtn, viewMode === 'CLASS' && styles.modeBtnActive]} onPress={() => setViewMode('CLASS')}>
          <Text style={[styles.modeBtnText, viewMode === 'CLASS' && styles.modeBtnTextActive]}>By Class</Text>
        </Pressable>
        <Pressable style={[styles.modeBtn, viewMode === 'DATE' && styles.modeBtnActive]} onPress={() => setViewMode('DATE')}>
          <Text style={[styles.modeBtnText, viewMode === 'DATE' && styles.modeBtnTextActive]}>By Date</Text>
        </Pressable>
      </View>

      {viewMode === 'CLASS' ? (
        <>
          {/* Class selector */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.classSelector}>
            {(classesData ?? []).map((c) => (
              <Pressable
                key={c?.id}
                style={[styles.classChip, classId === c?.id && styles.classChipActive]}
                onPress={() => setSelectedClassId(c?.id ?? '')}
              >
                <Text style={[styles.classChipText, classId === c?.id && styles.classChipTextActive]}>
                  {c?.name ?? ''}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {!classId ? (
            <View style={styles.empty}><Text style={styles.emptyText}>Select a class</Text></View>
          ) : isLoading ? <LoadingScreen /> : (
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
        >
          {/* Summary */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>This Month</Text>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{overview?.classSummary?.totalSessions ?? 0}</Text>
                <Text style={styles.summaryLabel}>Sessions</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryValue, { color: Colors.success }]}>{overview?.classSummary?.averageAttendance ?? 0}%</Text>
                <Text style={styles.summaryLabel}>Avg Attendance</Text>
              </View>
            </View>
          </View>

          {/* Sessions list */}
          <Text style={styles.sectionTitle}>Sessions</Text>
          {(overview?.sessions ?? []).map((s) => (
            <Pressable
              key={s?.id}
              style={styles.sessionCard}
              onPress={() => {
                const cls = classesData?.find((c) => c?.id === classId);
                if (cls) router.push(`/class/${classId}/session/${s?.id}`);
              }}
            >
              <View style={[styles.statusDot, { backgroundColor: s?.attendanceSubmitted ? Colors.success : Colors.error }]} />
              <Text style={styles.sessionDate}>{s?.date ? new Date(s.date).toLocaleDateString() : ''}</Text>
              <Text style={styles.sessionStatus}>{s?.attendanceSubmitted ? 'Submitted' : 'Pending'}</Text>
            </Pressable>
          ))}

          {/* Student breakdown */}
          {(overview?.studentBreakdown?.length ?? 0) > 0 ? (
            <>
              <Text style={[styles.sectionTitle, { marginTop: Spacing.xl }]}>Student Breakdown</Text>
              {(overview?.studentBreakdown ?? []).map((sb) => (
                <View key={sb?.studentId} style={styles.breakdownRow}>
                  <Text style={styles.breakdownName} numberOfLines={1}>{sb?.studentName ?? ''}</Text>
                  <View style={styles.breakdownStats}>
                    <Text style={[styles.breakdownStat, { color: Colors.success }]}>P:{sb?.present ?? 0}</Text>
                    <Text style={[styles.breakdownStat, { color: Colors.error }]}>A:{sb?.absent ?? 0}</Text>
                    <Text style={[styles.breakdownStat, { color: Colors.warning }]}>L:{sb?.late ?? 0}</Text>
                    <Text style={styles.breakdownPercent}>{sb?.percentage ?? 0}%</Text>
                  </View>
                </View>
              ))}
            </>
          ) : null}
        </ScrollView>
      )}
        </>
      ) : (
        <>
          {/* Date picker row */}
          <View style={styles.dateRow}>
            <Pressable
              style={styles.dateNavBtn}
              onPress={() => {
                const d = new Date(selectedDate);
                d.setDate(d.getDate() - 1);
                setSelectedDate(d.toISOString().split('T')[0]);
              }}
            >
              <Ionicons name="chevron-back" size={20} color={Colors.textPrimary} />
            </Pressable>
            <TextInput
              style={styles.dateInput}
              value={selectedDate}
              onChangeText={setSelectedDate}
              placeholder="YYYY-MM-DD"
            />
            <Pressable
              style={styles.dateNavBtn}
              onPress={() => {
                const d = new Date(selectedDate);
                d.setDate(d.getDate() + 1);
                setSelectedDate(d.toISOString().split('T')[0]);
              }}
            >
              <Ionicons name="chevron-forward" size={20} color={Colors.textPrimary} />
            </Pressable>
            <Pressable style={styles.todayBtn} onPress={() => setSelectedDate(now.toISOString().split('T')[0])}>
              <Text style={styles.todayBtnText}>Today</Text>
            </Pressable>
          </View>

          {isLoadingByDate ? <LoadingScreen /> : (
            <ScrollView
              contentContainerStyle={styles.content}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
            >
              {(byDate?.classes ?? []).length === 0 ? (
                <View style={styles.empty}><Text style={styles.emptyText}>No classes found</Text></View>
              ) : (
                (byDate?.classes ?? []).map((c) => (
                  <Pressable
                    key={c?.classId}
                    style={styles.dateClassCard}
                    onPress={() => {
                      if (c?.sessionId) {
                        router.push(`/class/${c.classId}/session/${c.sessionId}`);
                      } else {
                        router.push(`/add-session?classId=${c?.classId ?? ''}`);
                      }
                    }}
                  >
                    <View style={[styles.statusDot, { backgroundColor: c?.attendanceSubmitted ? Colors.success : c?.sessionId ? Colors.warning : Colors.error }]} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.dateClassName}>{c?.className ?? ''}</Text>
                      <Text style={styles.dateClassStatus}>
                        {c?.attendanceSubmitted
                          ? `Submitted • ${c?.present ?? 0} present, ${c?.absent ?? 0} absent, ${c?.unsure ?? 0} unsure`
                          : c?.sessionId
                            ? 'Session created — attendance not yet submitted'
                            : 'No session created for this date'}
                      </Text>
                    </View>
                    <Text style={styles.dateClassCount}>{c?.totalStudents ?? 0} students</Text>
                  </Pressable>
                ))
              )}
            </ScrollView>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, paddingBottom: Spacing.sm },
  title: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary },
  modeToggle: { flexDirection: 'row', backgroundColor: Colors.surface, borderRadius: BorderRadius.md, padding: 4, marginHorizontal: Spacing.lg, marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.border },
  modeBtn: { flex: 1, paddingVertical: 8, borderRadius: BorderRadius.sm, alignItems: 'center' },
  modeBtnActive: { backgroundColor: Colors.primary },
  modeBtnText: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  modeBtnTextActive: { color: '#fff' },
  dateRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.lg, marginBottom: Spacing.md, gap: Spacing.sm },
  dateNavBtn: { width: 36, height: 36, borderRadius: BorderRadius.sm, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center' },
  dateInput: { flex: 1, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, borderRadius: BorderRadius.sm, paddingHorizontal: Spacing.md, paddingVertical: 8, fontSize: 15, color: Colors.textPrimary, textAlign: 'center' },
  todayBtn: { paddingHorizontal: Spacing.md, paddingVertical: 8, borderRadius: BorderRadius.sm, backgroundColor: Colors.primary },
  todayBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  dateClassCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md, padding: Spacing.lg, marginBottom: Spacing.sm,
  },
  dateClassName: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary },
  dateClassStatus: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  dateClassCount: { fontSize: 12, color: Colors.textSecondary, marginLeft: Spacing.sm },
  classSelector: { paddingHorizontal: Spacing.lg, marginBottom: Spacing.md, maxHeight: 40 },
  classChip: { backgroundColor: Colors.surface, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.full, marginRight: Spacing.sm, borderWidth: 1, borderColor: Colors.border },
  classChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  classChipText: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  classChipTextActive: { color: '#fff' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: Colors.textSecondary, fontSize: 16 },
  content: { padding: Spacing.lg },
  summaryCard: { backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.lg, marginBottom: Spacing.xl },
  summaryTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginBottom: Spacing.md },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-around' },
  summaryItem: { alignItems: 'center' },
  summaryValue: { fontSize: 28, fontWeight: '700', color: Colors.textPrimary },
  summaryLabel: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginBottom: Spacing.sm },
  sessionCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md, padding: Spacing.lg, marginBottom: Spacing.sm,
  },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: Spacing.md },
  sessionDate: { flex: 1, fontSize: 15, color: Colors.textPrimary },
  sessionStatus: { fontSize: 13, color: Colors.textSecondary },
  breakdownRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface,
    borderRadius: BorderRadius.sm, padding: Spacing.md, marginBottom: 4,
  },
  breakdownName: { flex: 1, fontSize: 14, color: Colors.textPrimary },
  breakdownStats: { flexDirection: 'row', gap: Spacing.sm, alignItems: 'center' },
  breakdownStat: { fontSize: 12, fontWeight: '600' },
  breakdownPercent: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary, minWidth: 35, textAlign: 'right' },
});