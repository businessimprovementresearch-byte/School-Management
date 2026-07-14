import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Pressable, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '@/src/theme';
import { useSessionsControllerCreate, useClassesControllerFindAll, useAcademicYearsControllerFindAll, useTermsControllerFindAll } from '@/src/api/generated/api';
import { getErrorMessage } from '@/src/api/customFetch';

export default function AddSessionScreen() {
  const { classId: preClassId = '' } = useLocalSearchParams<{ classId: string }>();
  const router = useRouter();
  const createMutation = useSessionsControllerCreate();
  const { data: classes } = useClassesControllerFindAll();
  const { data: years } = useAcademicYearsControllerFindAll();

  const [selectedClassId, setSelectedClassId] = useState(preClassId);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedYearId, setSelectedYearId] = useState('');
  const [selectedTermId, setSelectedTermId] = useState<string | undefined>(undefined);

  const activeYear = years?.find((y) => y?.isActive);
  const yearId = selectedYearId || (activeYear?.id ?? '');
  const { data: terms } = useTermsControllerFindAll({ academicYearId: yearId }, { query: { enabled: !!yearId } });

  const handleCreate = async () => {
    if (!selectedClassId || !yearId || !date) {
      Alert.alert('Error', 'Please select class, date, and academic year');
      return;
    }
    try {
      await createMutation.mutateAsync({
        data: { classId: selectedClassId, date, academicYearId: yearId, termId: selectedTermId },
      });
      router.back();
    } catch (e) {
      Alert.alert('Error', getErrorMessage(e, 'Failed to create session'));
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color={Colors.textPrimary} /></Pressable>
        <Text style={styles.topTitle}>Add Session</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Class *</Text>
        <View style={styles.chipGrid}>
          {(classes ?? []).map((c) => (
            <Pressable key={c?.id} style={[styles.chip, selectedClassId === c?.id && styles.chipActive]} onPress={() => setSelectedClassId(c?.id ?? '')}>
              <Text style={[styles.chipText, selectedClassId === c?.id && styles.chipTextActive]}>{c?.name ?? ''}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Date * (YYYY-MM-DD)</Text>
        <TextInput style={styles.input} value={date} onChangeText={setDate} />

        <Text style={styles.label}>Academic Year *</Text>
        <View style={styles.chipGrid}>
          {(years ?? []).map((y) => (
            <Pressable key={y?.id} style={[styles.chip, yearId === y?.id && styles.chipActive]} onPress={() => setSelectedYearId(y?.id ?? '')}>
              <Text style={[styles.chipText, yearId === y?.id && styles.chipTextActive]}>{y?.name ?? ''}</Text>
            </Pressable>
          ))}
        </View>

        {(terms?.length ?? 0) > 0 ? (
          <>
            <Text style={styles.label}>Term (optional)</Text>
            <View style={styles.chipGrid}>
              <Pressable style={[styles.chip, !selectedTermId && styles.chipActive]} onPress={() => setSelectedTermId(undefined)}>
                <Text style={[styles.chipText, !selectedTermId && styles.chipTextActive]}>None</Text>
              </Pressable>
              {(terms ?? []).map((t) => (
                <Pressable key={t?.id} style={[styles.chip, selectedTermId === t?.id && styles.chipActive]} onPress={() => setSelectedTermId(t?.id)}>
                  <Text style={[styles.chipText, selectedTermId === t?.id && styles.chipTextActive]}>{t?.name ?? ''}</Text>
                </Pressable>
              ))}
            </View>
          </>
        ) : null}

        <Pressable style={styles.saveButton} onPress={handleCreate} disabled={createMutation.isPending}>
          {createMutation.isPending ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveText}>Create Session</Text>}
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
  label: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary, marginBottom: Spacing.xs, marginTop: Spacing.lg },
  input: { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, borderRadius: BorderRadius.md, padding: Spacing.md, fontSize: 16, color: Colors.textPrimary },
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  chip: { backgroundColor: Colors.surface, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.border },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  chipTextActive: { color: '#fff' },
  saveButton: { backgroundColor: Colors.primary, borderRadius: BorderRadius.md, padding: Spacing.lg, alignItems: 'center', marginTop: Spacing.xxl },
  saveText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
