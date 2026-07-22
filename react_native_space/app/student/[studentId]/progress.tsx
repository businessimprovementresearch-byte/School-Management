import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { Colors, Spacing, BorderRadius } from '@/src/theme';
import {
  useProgressControllerFindByStudent,
  useStudentsControllerFindOne,
  useReportCardsControllerFindAll,
  reportCardsControllerGetDownload,
} from '@/src/api/generated/api';
import LoadingScreen from '@/src/components/LoadingScreen';

export default function StudentProgressScreen() {
  const { studentId = '' } = useLocalSearchParams<{ studentId: string }>();
  const router = useRouter();
  const { data: student } = useStudentsControllerFindOne(studentId, { query: { enabled: !!studentId } });
  const enrollments = student?.enrollments ?? [];
  const [selectedClassId, setSelectedClassId] = useState<string | undefined>(undefined);

  const classId = selectedClassId || (enrollments?.[0]?.classId ?? undefined);
  const { data, isLoading } = useProgressControllerFindByStudent(
    { studentId, classId },
    { query: { enabled: !!studentId } },
  );

  // Which class + academic year is currently selected, so the screen can
  // say *what* has no progress data instead of just "No progress data".
  const selectedEnrollment = enrollments.find((e) => e?.classId === classId);

  // Report cards aren't keyed by classId, only by academic year name, so
  // that's what we match on to offer a direct shortcut when one exists.
  const { data: reportCards } = useReportCardsControllerFindAll({ studentId }, { query: { enabled: !!studentId } });
  const matchingReportCard = (reportCards ?? []).find((rc) => rc?.academicYearName === selectedEnrollment?.academicYearName);

  const handleDownloadReportCard = async (id: string) => {
    try {
      const result = await reportCardsControllerGetDownload(id);
      if (result?.url) Linking.openURL(result.url);
    } catch { /* ignore */ }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color={Colors.textPrimary} /></Pressable>
        <Text style={styles.topTitle}>Progress</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.classSelector}>
        {enrollments.map((e) => (
          <Pressable key={e?.classId} style={[styles.chip, classId === e?.classId && styles.chipActive]} onPress={() => setSelectedClassId(e?.classId)}>
            <Text style={[styles.chipText, classId === e?.classId && styles.chipTextActive]}>{e?.className ?? ''}</Text>
          </Pressable>
        ))}
      </ScrollView>
      {selectedEnrollment && (
        <View style={styles.contextBar}>
          <Ionicons name="school-outline" size={14} color={Colors.textSecondary} />
          <Text style={styles.contextText}>
            {selectedEnrollment.className} · Grade {selectedEnrollment.classGrade} · {selectedEnrollment.academicYearName ?? ''}
          </Text>
        </View>
      )}
      {isLoading ? <LoadingScreen /> : (
        <ScrollView contentContainerStyle={styles.content}>
          {(data?.metrics ?? []).map((m) => (
            <View key={m?.metricId} style={styles.card}>
              <Text style={styles.metricName}>{m?.metricName ?? ''} ({m?.metricType ?? ''})</Text>
              {(m?.entries ?? []).map((e, i) => (
                <View key={i} style={styles.entryRow}>
                  <Text style={styles.entryDate}>{e?.date ? new Date(e.date).toLocaleDateString() : ''}</Text>
                  <Text style={styles.entryValue}>{e?.value ?? 0}</Text>
                  {e?.notes ? <Text style={styles.entryNotes}>{e.notes}</Text> : null}
                </View>
              ))}
              {(m?.entries?.length ?? 0) === 0 && <Text style={styles.emptyText}>No entries yet</Text>}
            </View>
          ))}
          {(data?.metrics?.length ?? 0) === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                No progress data for {selectedEnrollment?.className ?? 'this class'}
                {selectedEnrollment?.academicYearName ? ` (${selectedEnrollment.academicYearName})` : ''} yet.
              </Text>
              {matchingReportCard ? (
                <Pressable style={styles.emptyShortcutBtn} onPress={() => handleDownloadReportCard(matchingReportCard.id)}>
                  <Ionicons name="document-text" size={16} color={Colors.secondary} />
                  <Text style={styles.emptyShortcutText}>View Report Card for {selectedEnrollment?.academicYearName}</Text>
                </Pressable>
              ) : (
                <Pressable style={styles.emptyShortcutBtn} onPress={() => router.push(`/student/${studentId}/report-cards`)}>
                  <Ionicons name="document-text" size={16} color={Colors.secondary} />
                  <Text style={styles.emptyShortcutText}>View All Report Cards</Text>
                </Pressable>
              )}
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  topTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  classSelector: { paddingHorizontal: Spacing.lg, marginBottom: Spacing.md, maxHeight: 40 },
  chip: { backgroundColor: Colors.surface, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.full, marginRight: Spacing.sm, borderWidth: 1, borderColor: Colors.border },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  chipTextActive: { color: '#fff' },
  content: { padding: Spacing.lg },
  contextBar: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: Spacing.lg, marginBottom: Spacing.sm },
  contextText: { fontSize: 13, color: Colors.textSecondary, fontWeight: '600' },
  emptyState: { alignItems: 'center', marginVertical: Spacing.lg, gap: Spacing.md },
  emptyShortcutBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.secondary + '12', borderRadius: BorderRadius.md, paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm },
  emptyShortcutText: { fontSize: 14, fontWeight: '600', color: Colors.secondary },
  card: { backgroundColor: Colors.surface, borderRadius: BorderRadius.md, padding: Spacing.lg, marginBottom: Spacing.md },
  metricName: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginBottom: Spacing.sm },
  entryRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.xs, gap: Spacing.md },
  entryDate: { fontSize: 13, color: Colors.textSecondary, width: 80 },
  entryValue: { fontSize: 16, fontWeight: '700', color: Colors.primary },
  entryNotes: { fontSize: 13, color: Colors.textSecondary, flex: 1 },
  emptyText: { textAlign: 'center', color: Colors.textSecondary, marginVertical: Spacing.lg },
});
