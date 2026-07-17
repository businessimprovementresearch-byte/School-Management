import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '@/src/theme';
import { useAuth } from '@/src/context/AuthContext';
import { useDashboardControllerGetDashboard } from '@/src/api/generated/api';
import LoadingScreen from '@/src/components/LoadingScreen';

export default function DashboardScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const { data, isLoading, refetch } = useDashboardControllerGetDashboard();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isLoading || !data) return <LoadingScreen />;

  const isAdmin = user?.role === 'ADMIN';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
      >
        <Text style={styles.welcome}>Welcome, {user?.name ?? 'User'}</Text>
        {(data as any)?.activeAcademicYear?.name ? (
          <View style={styles.yearBadge}>
            <Text style={styles.yearBadgeText}>{(data as any).activeAcademicYear.name}</Text>
          </View>
        ) : null}

        {/* Stats */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsRow}>
          <StatCard icon="people" label="Students" value={data?.totalStudents ?? 0} color={Colors.primary} />
          <StatCard icon="school" label="Teachers" value={data?.totalTeachers ?? 0} color={Colors.secondary} />
          <StatCard icon="book" label="Classes" value={data?.activeClasses ?? 0} color={Colors.accent} />
          <StatCard icon="calendar" label="Today" value={data?.todaySessions?.length ?? 0} color={Colors.success} />
        </ScrollView>

        {/* Pending Attendance */}
        {(data?.pendingAttendanceSessions?.length ?? 0) > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pending Attendance</Text>
            {data?.pendingAttendanceSessions?.map((s) => (
              <Pressable
                key={s?.id}
                style={styles.pendingCard}
                onPress={() => router.push(`/class/${s?.classId}/session/${s?.id}`)}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.pendingClass}>{s?.className ?? ''}</Text>
                  <Text style={styles.pendingDate}>{s?.date ? new Date(s.date).toLocaleDateString() : ''}</Text>
                </View>
                <View style={styles.pendingChip}>
                  <Text style={styles.pendingChipText}>Not Submitted</Text>
                </View>
              </Pressable>
            ))}
          </View>
        ) : null}

        {/* Quick Actions */}
        {isAdmin ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              <ActionButton icon="person-add" label="Add Student" onPress={() => router.push('/add-student')} />
              <ActionButton icon="add-circle" label="Add Session" onPress={() => router.push('/add-session')} />
              <ActionButton icon="document-text" label="Report Card" onPress={() => router.push('/generate-report')} />
              <ActionButton icon="calendar" label="Years" onPress={() => router.push('/academic-years')} />
            </View>
          </View>
        ) : null}

        {/* Today's Sessions */}
        {(data?.todaySessions?.length ?? 0) > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today's Sessions</Text>
            {data?.todaySessions?.map((s) => (
              <Pressable
                key={s?.id}
                style={styles.sessionCard}
                onPress={() => router.push(`/class/${s?.classId}/session/${s?.id}`)}
              >
                <Ionicons name="time" size={20} color={Colors.primary} />
                <View style={{ flex: 1, marginLeft: Spacing.md }}>
                  <Text style={styles.sessionName}>{s?.className ?? ''}</Text>
                </View>
                <View style={[styles.statusDot, { backgroundColor: s?.attendanceSubmitted ? Colors.success : Colors.error }]} />
              </Pressable>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ icon, label, value, color }: { icon: string; label: string; value: number; color: string }) {
  return (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <Ionicons name={icon as any} size={24} color={color} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ActionButton({ icon, label, onPress }: { icon: string; label: string; onPress: () => void }) {
  return (
    <Pressable style={styles.actionButton} onPress={onPress}>
      <Ionicons name={icon as any} size={28} color={Colors.primary} />
      <Text style={styles.actionLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.lg },
  welcome: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary, marginBottom: Spacing.sm },
  yearBadge: {
    backgroundColor: Colors.secondary + '15', paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full, alignSelf: 'flex-start', marginBottom: Spacing.lg,
  },
  yearBadgeText: { color: Colors.secondary, fontSize: 13, fontWeight: '600' },
  statsRow: { marginBottom: Spacing.xl },
  statCard: {
    backgroundColor: Colors.surface, borderRadius: BorderRadius.lg,
    padding: Spacing.lg, marginRight: Spacing.md, width: 120,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
    borderLeftWidth: 3,
  },
  statValue: { fontSize: 28, fontWeight: '700', color: Colors.textPrimary, marginTop: Spacing.sm },
  statLabel: { fontSize: 13, color: Colors.textSecondary },
  section: { marginBottom: Spacing.xl },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary, marginBottom: Spacing.md },
  pendingCard: {
    backgroundColor: Colors.surface, borderRadius: BorderRadius.md, padding: Spacing.lg,
    flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm,
    borderLeftWidth: 3, borderLeftColor: Colors.error,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1,
  },
  pendingClass: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary },
  pendingDate: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  pendingChip: { backgroundColor: Colors.error + '15', paddingHorizontal: Spacing.sm, paddingVertical: 4, borderRadius: BorderRadius.full },
  pendingChipText: { color: Colors.error, fontSize: 11, fontWeight: '600' },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
  actionButton: {
    backgroundColor: Colors.surface, borderRadius: BorderRadius.lg,
    padding: Spacing.lg, alignItems: 'center', width: '47%',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1,
  },
  actionLabel: { fontSize: 13, fontWeight: '600', color: Colors.textPrimary, marginTop: Spacing.sm },
  sessionCard: {
    backgroundColor: Colors.surface, borderRadius: BorderRadius.md,
    padding: Spacing.lg, flexDirection: 'row', alignItems: 'center',
    marginBottom: Spacing.sm,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1,
  },
  sessionName: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
});
