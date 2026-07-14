import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '@/src/theme';
import { useClassesControllerFindOne } from '@/src/api/generated/api';
import { useAuth } from '@/src/context/AuthContext';
import Avatar from '@/src/components/Avatar';
import LoadingScreen from '@/src/components/LoadingScreen';

export default function ClassDetailScreen() {
  const { classId = '' } = useLocalSearchParams<{ classId: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const { data, isLoading, refetch } = useClassesControllerFindOne(classId, { query: { enabled: !!classId } });
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(useCallback(() => { if (classId) refetch(); }, [classId]));

  const onRefresh = async () => { setRefreshing(true); await refetch(); setRefreshing(false); };

  if (isLoading || !data) return <LoadingScreen />;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color={Colors.textPrimary} /></Pressable>
        <Text style={styles.topTitle}>{data?.name ?? ''}</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
      >
        <View style={styles.headerCard}>
          <Text style={styles.className}>{data?.name ?? ''}</Text>
          <Text style={styles.classGrade}>Grade: {data?.grade ?? ''}</Text>
          {data?.description ? <Text style={styles.classDesc}>{data.description}</Text> : null}
        </View>

        {/* Teachers */}
        <Text style={styles.sectionTitle}>Teachers</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.teacherRow}>
          {(data?.teachers ?? []).map((t) => (
            <View key={t?.id} style={styles.teacherItem}>
              <Avatar uri={t?.photoUrl} name={t?.name} size={48} borderColor={Colors.secondary} />
              <Text style={styles.teacherName} numberOfLines={1}>{t?.name ?? ''}</Text>
            </View>
          ))}
          {(data?.teachers?.length ?? 0) === 0 && <Text style={styles.emptySmall}>No teachers assigned</Text>}
        </ScrollView>

        {/* Students */}
        <Text style={styles.sectionTitle}>Students ({data?.students?.length ?? 0})</Text>
        {(data?.students ?? []).map((s) => (
          <Pressable key={s?.id} style={styles.studentRow} onPress={() => router.push(`/student/${s?.id}`)}>
            <Avatar uri={s?.photoUrl} name={s?.name} size={40} />
            <Text style={styles.studentName}>{s?.name ?? ''}</Text>
            <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
          </Pressable>
        ))}

        {/* Sessions */}
        <Text style={styles.sectionTitle}>Sessions</Text>
        {(data?.sessions ?? []).slice(0, 20).map((s) => (
          <Pressable key={s?.id} style={styles.sessionRow} onPress={() => router.push(`/class/${classId}/session/${s?.id}`)}>
            <View style={[styles.statusDot, { backgroundColor: s?.attendanceSubmitted ? Colors.success : Colors.error }]} />
            <Text style={styles.sessionDate}>{s?.date ? new Date(s.date).toLocaleDateString() : ''}</Text>
            <Text style={styles.sessionTerm}>{s?.termName ?? ''}</Text>
          </Pressable>
        ))}

        {isAdmin ? (
          <Pressable style={styles.addSessionBtn} onPress={() => router.push({ pathname: '/add-session', params: { classId } })}>
            <Ionicons name="add-circle" size={20} color={Colors.primary} />
            <Text style={styles.addSessionText}>Add Session</Text>
          </Pressable>
        ) : null}

        {/* Metrics */}
        {(data?.metrics?.length ?? 0) > 0 ? (
          <>
            <Text style={styles.sectionTitle}>Progress Metrics</Text>
            {(data?.metrics ?? []).map((m) => (
              <View key={m?.id} style={styles.metricRow}>
                <Ionicons name="analytics" size={18} color={Colors.accent} />
                <Text style={styles.metricName}>{m?.name ?? ''}</Text>
                <Text style={styles.metricType}>{m?.type ?? ''}</Text>
              </View>
            ))}
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  topTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  content: { padding: Spacing.lg },
  headerCard: { backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.lg, marginBottom: Spacing.lg },
  className: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary },
  classGrade: { fontSize: 14, color: Colors.textSecondary, marginTop: 2 },
  classDesc: { fontSize: 14, color: Colors.textSecondary, marginTop: Spacing.sm },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginTop: Spacing.lg, marginBottom: Spacing.sm },
  teacherRow: { marginBottom: Spacing.sm, maxHeight: 80 },
  teacherItem: { alignItems: 'center', marginRight: Spacing.lg, width: 70 },
  teacherName: { fontSize: 12, color: Colors.textSecondary, marginTop: 4, textAlign: 'center' },
  emptySmall: { color: Colors.textSecondary, fontSize: 13 },
  studentRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: BorderRadius.sm, padding: Spacing.md, marginBottom: 4, gap: Spacing.md },
  studentName: { flex: 1, fontSize: 15, fontWeight: '600', color: Colors.textPrimary },
  sessionRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: BorderRadius.sm, padding: Spacing.md, marginBottom: 4, gap: Spacing.md },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  sessionDate: { flex: 1, fontSize: 14, color: Colors.textPrimary },
  sessionTerm: { fontSize: 12, color: Colors.textSecondary },
  addSessionBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: Spacing.md, gap: Spacing.sm, marginTop: Spacing.sm },
  addSessionText: { fontSize: 15, fontWeight: '600', color: Colors.primary },
  metricRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: BorderRadius.sm, padding: Spacing.md, marginBottom: 4, gap: Spacing.sm },
  metricName: { flex: 1, fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  metricType: { fontSize: 12, color: Colors.textSecondary },
});
