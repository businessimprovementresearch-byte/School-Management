import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '@/src/theme';
import { useStudentsControllerFindOne } from '@/src/api/generated/api';
import { useAuth } from '@/src/context/AuthContext';
import Avatar from '@/src/components/Avatar';
import StatusChip from '@/src/components/StatusChip';
import LoadingScreen from '@/src/components/LoadingScreen';

export default function StudentDetailScreen() {
  const { studentId = '' } = useLocalSearchParams<{ studentId: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const { data, isLoading, refetch } = useStudentsControllerFindOne(studentId, { query: { enabled: !!studentId } });
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('classes');

  useFocusEffect(useCallback(() => { if (studentId) refetch(); }, [studentId]));

  const onRefresh = async () => { setRefreshing(true); await refetch(); setRefreshing(false); };

  if (isLoading || !data) return <LoadingScreen />;

  const tabs = ['classes', 'attendance', 'progress', 'feedback', 'history'];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <Text style={styles.topTitle}>Student</Text>
        {isAdmin ? (
          <Pressable onPress={() => router.push(`/student/${studentId}/edit`)}>
            <Ionicons name="pencil" size={22} color={Colors.primary} />
          </Pressable>
        ) : <View style={{ width: 24 }} />}
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <Avatar uri={data?.photoUrl} name={data?.name} size={80} />
          <Text style={styles.name}>{data?.name ?? ''}</Text>
          <Text style={styles.info}>Age: {data?.age ?? ''} | Parent: {data?.parentName ?? ''}</Text>
          <Text style={styles.info}>{data?.contactNumber ?? ''}</Text>
        </View>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabRow}>
          {tabs.map((t) => (
            <Pressable key={t} style={[styles.tab, activeTab === t && styles.tabActive]} onPress={() => setActiveTab(t)}>
              <Text style={[styles.tabText, activeTab === t && styles.tabTextActive]}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {activeTab === 'classes' && (
          <View>
            {(data?.enrollments ?? []).map((e) => (
              <Pressable key={e?.id} style={styles.card} onPress={() => router.push(`/class/${e?.classId}`)}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{e?.className ?? ''}</Text>
                  <Text style={styles.cardSub}>Grade {e?.classGrade ?? ''} | Enrolled {e?.enrollmentDate ? new Date(e.enrollmentDate).toLocaleDateString() : ''}</Text>
                </View>
                <StatusChip status={e?.status ?? 'ACTIVE'} small />
              </Pressable>
            ))}
            {(data?.enrollments?.length ?? 0) === 0 && <Text style={styles.emptyText}>No enrollments</Text>}
          </View>
        )}

        {activeTab === 'attendance' && (
          <View>
            <View style={styles.attendanceSummary}>
              <View style={styles.attItem}><Text style={styles.attValue}>{data?.attendanceSummary?.percentage ?? 0}%</Text><Text style={styles.attLabel}>Overall</Text></View>
              <View style={styles.attItem}><Text style={[styles.attValue, { color: Colors.success }]}>{data?.attendanceSummary?.present ?? 0}</Text><Text style={styles.attLabel}>Present</Text></View>
              <View style={styles.attItem}><Text style={[styles.attValue, { color: Colors.error }]}>{data?.attendanceSummary?.absent ?? 0}</Text><Text style={styles.attLabel}>Absent</Text></View>
              <View style={styles.attItem}><Text style={[styles.attValue, { color: Colors.warning }]}>{data?.attendanceSummary?.late ?? 0}</Text><Text style={styles.attLabel}>Late</Text></View>
            </View>
            <Text style={styles.sectionTitle}>Recent</Text>
            {(data?.recentAttendance ?? []).map((a, i) => (
              <View key={i} style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{a?.className ?? ''}</Text>
                  <Text style={styles.cardSub}>{a?.date ? new Date(a.date).toLocaleDateString() : ''}</Text>
                </View>
                <StatusChip status={a?.status ?? ''} small />
              </View>
            ))}
          </View>
        )}

        {activeTab === 'progress' && (
          <View>
            {(data?.progress ?? []).map((p) => (
              <View key={p?.metricId} style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{p?.metricName ?? ''}</Text>
                  <Text style={styles.cardSub}>{p?.className ?? ''} | {p?.metricType ?? ''}</Text>
                  <Text style={styles.cardSub}>{p?.entries?.length ?? 0} entries</Text>
                </View>
              </View>
            ))}
            {(data?.progress?.length ?? 0) === 0 && <Text style={styles.emptyText}>No progress data</Text>}
          </View>
        )}

        {activeTab === 'feedback' && (
          <View>
            {(data?.feedback ?? []).map((f) => (
              <View key={f?.id} style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{f?.className ?? ''}</Text>
                  <Text style={styles.cardSub}>{f?.teacherName ?? ''} | {f?.date ? new Date(f.date).toLocaleDateString() : ''}</Text>
                  <Text style={styles.feedbackContent}>{f?.content ?? ''}</Text>
                </View>
              </View>
            ))}
            {(data?.feedback?.length ?? 0) === 0 && <Text style={styles.emptyText}>No feedback</Text>}
          </View>
        )}

        {activeTab === 'history' && (
          <View>
            {(data?.classHistory ?? []).map((h) => (
              <View key={h?.id} style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{h?.className ?? ''}</Text>
                  <Text style={styles.cardSub}>{h?.academicYearName ?? ''} | {h?.date ? new Date(h.date).toLocaleDateString() : ''}</Text>
                </View>
                <StatusChip status={h?.action ?? ''} small />
              </View>
            ))}
            {(data?.classHistory?.length ?? 0) === 0 && <Text style={styles.emptyText}>No history</Text>}
          </View>
        )}

        {/* Report cards button */}
        <Pressable style={styles.reportButton} onPress={() => router.push(`/student/${studentId}/report-cards`)}>
          <Ionicons name="document-text" size={20} color={Colors.secondary} />
          <Text style={styles.reportButtonText}>View Report Cards</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  topTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  content: { padding: Spacing.lg },
  hero: { alignItems: 'center', marginBottom: Spacing.xl },
  name: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary, marginTop: Spacing.md },
  info: { fontSize: 14, color: Colors.textSecondary, marginTop: 2 },
  tabRow: { marginBottom: Spacing.lg, maxHeight: 40 },
  tab: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm, marginRight: Spacing.sm, borderRadius: BorderRadius.full, backgroundColor: Colors.surface },
  tabActive: { backgroundColor: Colors.primary },
  tabText: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary },
  tabTextActive: { color: '#fff' },
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md, padding: Spacing.lg, marginBottom: Spacing.sm,
  },
  cardTitle: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary },
  cardSub: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginVertical: Spacing.sm },
  attendanceSummary: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.lg, marginBottom: Spacing.lg },
  attItem: { alignItems: 'center' },
  attValue: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary },
  attLabel: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  feedbackContent: { fontSize: 14, color: Colors.textPrimary, marginTop: Spacing.sm, fontStyle: 'italic' },
  emptyText: { textAlign: 'center', color: Colors.textSecondary, marginVertical: Spacing.xl },
  reportButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.secondary + '12', borderRadius: BorderRadius.md,
    padding: Spacing.lg, marginTop: Spacing.xl, gap: Spacing.sm,
  },
  reportButtonText: { fontSize: 16, fontWeight: '600', color: Colors.secondary },
});
