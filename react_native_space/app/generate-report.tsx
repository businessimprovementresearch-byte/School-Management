import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Button, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useStudentsControllerFindAll, useAcademicYearsControllerFindAll, useTermsControllerFindAll, useReportCardsControllerGenerate } from '@/src/api/generated/api';
import type { StudentListItemDto, AcademicYearListItemDto, TermListItemDto } from '@/src/api/generated/schemas';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/src/theme';
import { getErrorMessage } from '@/src/api/customFetch';

export default function GenerateReportScreen() {
  const router = useRouter();
  const { data: studentsData, isLoading: studentsLoading } = useStudentsControllerFindAll({ page: 1, limit: 500 });
  const { data: years } = useAcademicYearsControllerFindAll();
  const activeYear = (years ?? []).find((y: AcademicYearListItemDto) => y?.isActive);
  const { data: terms } = useTermsControllerFindAll({ academicYearId: activeYear?.id ?? '' }, { query: { enabled: !!activeYear?.id } });
  const generateMutation = useReportCardsControllerGenerate();

  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [selectedTermId, setSelectedTermId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const students = studentsData?.items ?? [];

  const handleGenerate = () => {
    setError(''); setSuccess('');
    if (!selectedStudentId || !activeYear?.id) { setError('Select a student. An active academic year is required.'); return; }
    generateMutation.mutate({ data: { studentId: selectedStudentId, academicYearId: activeYear.id, termId: selectedTermId || undefined } }, {
      onSuccess: () => setSuccess('Report card generated successfully!'),
      onError: (e) => setError(getErrorMessage(e, 'Failed to generate')),
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={16}><Ionicons name="arrow-back" size={24} color={theme.colors.text} /></Pressable>
        <Text style={styles.headerTitle}>Generate Report Card</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        {!!error && <Text style={styles.error}>{error}</Text>}
        {!!success && <Text style={styles.success}>{success}</Text>}

        <Text style={styles.label}>Academic Year</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{activeYear?.name ?? 'No active year'}</Text>
        </View>

        <Text style={styles.label}>Select Student</Text>
        {studentsLoading ? <ActivityIndicator color={theme.colors.primary} /> : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
            {students.map((s: StudentListItemDto) => (
              <Pressable key={s?.id} style={[styles.selectChip, selectedStudentId === s?.id && styles.selectChipActive]} onPress={() => setSelectedStudentId(s?.id ?? '')}>
                <Text style={[styles.selectChipText, selectedStudentId === s?.id && styles.selectChipTextActive]}>{s?.name ?? ''}</Text>
              </Pressable>
            ))}
          </ScrollView>
        )}

        <Text style={styles.label}>Select Term (optional)</Text>
        <View style={styles.termRow}>
          <Pressable style={[styles.selectChip, !selectedTermId && styles.selectChipActive]} onPress={() => setSelectedTermId('')}>
            <Text style={[styles.selectChipText, !selectedTermId && styles.selectChipTextActive]}>Full Year</Text>
          </Pressable>
          {(terms ?? []).map((t: TermListItemDto) => (
            <Pressable key={t?.id} style={[styles.selectChip, selectedTermId === t?.id && styles.selectChipActive]} onPress={() => setSelectedTermId(t?.id ?? '')}>
              <Text style={[styles.selectChipText, selectedTermId === t?.id && styles.selectChipTextActive]}>{t?.name ?? ''}</Text>
            </Pressable>
          ))}
        </View>

        <Button mode="contained" onPress={handleGenerate} loading={generateMutation?.isPending} style={styles.btn} buttonColor={theme.colors.primary} disabled={!selectedStudentId || !activeYear?.id}>
          Generate Report Card
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.text },
  scroll: { padding: 16, paddingBottom: 40 },
  label: { fontSize: 14, fontWeight: '600', color: theme.colors.text, marginBottom: 8, marginTop: 12 },
  infoBox: { backgroundColor: '#FFF', borderRadius: 8, padding: 12, marginBottom: 8 },
  infoText: { fontSize: 15, color: theme.colors.text },
  selectChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: theme.colors.border, marginRight: 8, marginBottom: 8 },
  selectChipActive: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  selectChipText: { fontSize: 13, color: theme.colors.textSecondary },
  selectChipTextActive: { color: '#FFF', fontWeight: '600' },
  termRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  error: { color: theme.colors.error, marginBottom: 12, textAlign: 'center', fontSize: 14 },
  success: { color: theme.colors.success, marginBottom: 12, textAlign: 'center', fontSize: 14, fontWeight: '600' },
  btn: { marginTop: 16, borderRadius: 8 },
});
