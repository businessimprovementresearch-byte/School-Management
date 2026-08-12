import React, { useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Button, ActivityIndicator, Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { useStudentsControllerFindAll, useAcademicYearsControllerFindAll, useTermsControllerFindAll, useReportCardsControllerGenerate } from '@/src/api/generated/api';
import type { StudentListItemDto, AcademicYearListItemDto, TermListItemDto } from '@/src/api/generated/schemas';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/src/theme';
import { getErrorMessage } from '@/src/api/customFetch';

export default function GenerateReportScreen() {
  const router = useRouter();
  const { data: studentsData, isLoading: studentsLoading } = useStudentsControllerFindAll({ page: 1, limit: 500 });
  const { data: years, refetch: refetchYears } = useAcademicYearsControllerFindAll();
  const activeYear = (years ?? []).find((y: AcademicYearListItemDto) => y?.isActive);

  useFocusEffect(useCallback(() => { refetchYears(); }, [refetchYears]));
  const { data: terms } = useTermsControllerFindAll({ academicYearId: activeYear?.id ?? '' }, { query: { enabled: !!activeYear?.id } });
  const generateMutation = useReportCardsControllerGenerate();

  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [selectedTermId, setSelectedTermId] = useState('');
  const [studentSearch, setStudentSearch] = useState('');   // 👈 baris baru (tambahan state)
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const students = studentsData?.items ?? [];

  const selectedStudent = students.find((s) => s?.id === selectedStudentId);   // 👈 taruh di sini
  const filteredStudents = React.useMemo(() => {                                // 👈 dan ini
    const q = studentSearch.trim().toLowerCase();
    if (!q) return [];
  return students.filter((s) => s?.name?.toLowerCase()?.includes(q)).slice(0, 8);   // 👈 dibatasi max 8 hasil
}, [students, studentSearch]);

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
        <>
          {selectedStudent ? (                                    // 👈 GANTI seluruh blok chip horizontal lama di sini
            <View style={styles.selectedStudentRow}>
              <View style={styles.selectedStudentChip}>
                <Text style={styles.selectedStudentText}>{selectedStudent?.name ?? ''}</Text>
                <Pressable onPress={() => { setSelectedStudentId(''); setStudentSearch(''); }} hitSlop={8}>
                  <Ionicons name="close-circle" size={18} color="#FFF" />
                </Pressable>
              </View>
            </View>
          ) : (
           <>
              <Searchbar
                placeholder="Search student by name..."
                value={studentSearch}
                onChangeText={setStudentSearch}
                style={styles.searchbar}
                inputStyle={styles.searchbarInput}
                autoFocus
              />
              {studentSearch.trim().length > 0 && (
                <View style={styles.studentList}>
                  {filteredStudents.map((s, idx) => (
                    <Pressable
                      key={s?.id}
                      style={[styles.studentRow, idx === filteredStudents.length - 1 && styles.studentRowLast]}
                      onPress={() => { setSelectedStudentId(s?.id ?? ''); setStudentSearch(''); }}
                    >
                      <Text style={styles.studentRowText}>{s?.name ?? ''}</Text>
                    </Pressable>
                  ))}
                  {filteredStudents.length === 0 && (
                    <Text style={styles.emptyStudentText}>No students found</Text>
                  )}
                </View>
              )}
            </>
          )}
        </>
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
  searchbar: { backgroundColor: '#FFF', elevation: 1, marginBottom: 8, borderWidth: 1, borderColor: theme.colors.border },
  searchbarInput: { fontSize: 14, minHeight: 0, color: theme.colors.text },
  studentList: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  studentRow: { paddingHorizontal: 14, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: theme.colors.divider, backgroundColor: '#FFFFFF' },
  studentRowLast: { borderBottomWidth: 0 },
  studentRowText: { fontSize: 15, color: theme.colors.text, fontWeight: '500' },
  emptyStudentText: { textAlign: 'center', color: theme.colors.textSecondary, paddingVertical: 16, fontSize: 13 },
  selectedStudentRow: { marginBottom: 16 },
  selectedStudentChip: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', backgroundColor: theme.colors.primary, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  selectedStudentText: { color: '#FFF', fontWeight: '600', fontSize: 13, marginRight: 8 },
  selectChipText: { fontSize: 13, color: theme.colors.textSecondary },
  selectChipTextActive: { color: '#FFF', fontWeight: '600' },
  termRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  error: { color: theme.colors.error, marginBottom: 12, textAlign: 'center', fontSize: 14 },
  success: { color: theme.colors.success, marginBottom: 12, textAlign: 'center', fontSize: 14, fontWeight: '600' },
  btn: { marginTop: 16, borderRadius: 8 },
});
