import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { Colors, Spacing, BorderRadius } from '@/src/theme';
import { useProgressControllerFindByStudent, useStudentsControllerFindOne } from '@/src/api/generated/api';
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
          {(data?.metrics?.length ?? 0) === 0 && <Text style={styles.emptyText}>No progress data</Text>}
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
  card: { backgroundColor: Colors.surface, borderRadius: BorderRadius.md, padding: Spacing.lg, marginBottom: Spacing.md },
  metricName: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginBottom: Spacing.sm },
  entryRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.xs, gap: Spacing.md },
  entryDate: { fontSize: 13, color: Colors.textSecondary, width: 80 },
  entryValue: { fontSize: 16, fontWeight: '700', color: Colors.primary },
  entryNotes: { fontSize: 13, color: Colors.textSecondary, flex: 1 },
  emptyText: { textAlign: 'center', color: Colors.textSecondary, marginVertical: Spacing.lg },
});
