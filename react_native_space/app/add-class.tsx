import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Pressable, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '@/src/theme';
import { useClassesControllerCreate } from '@/src/api/generated/api';
import { getErrorMessage } from '@/src/api/customFetch';

// Kept in sync with the grade grouping in app/tabs/classes.tsx
const gradeOrder = ['Nursery', '1', '2', '3', '4', '5', '6', 'Special'];

export default function AddClassScreen() {
  const router = useRouter();
  const createMutation = useClassesControllerCreate();

  const [name, setName] = useState('');
  const [grade, setGrade] = useState<string | null>(null);
  const [description, setDescription] = useState('');

  const handleSave = async () => {
    if (!name.trim() || !grade) {
      Alert.alert('Error', 'Please fill in the class name and select a grade');
      return;
    }
    try {
      await createMutation.mutateAsync({
        data: {
          name: name.trim(),
          grade,
          description: description.trim() || undefined,
        },
      });
      router.back();
    } catch (e) {
      Alert.alert('Error', getErrorMessage(e, 'Failed to create class'));
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color={Colors.textPrimary} /></Pressable>
        <Text style={styles.topTitle}>Add Class</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Class Name *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="e.g. Class 3A"
          placeholderTextColor={Colors.textSecondary + '80'}
        />

        <Text style={[styles.label, { marginTop: Spacing.xl }]}>Grade *</Text>
        <View style={styles.gradeGrid}>
          {gradeOrder.map((g) => (
            <Pressable
              key={g}
              style={[styles.gradeChip, grade === g && styles.gradeChipSelected]}
              onPress={() => setGrade(g)}
            >
              <Text style={[styles.gradeChipText, grade === g && styles.gradeChipTextSelected]}>
                {g === 'Special' ? 'Special' : g === 'Nursery' ? 'Nursery' : `Grade ${g}`}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={[styles.label, { marginTop: Spacing.xl }]}>Description</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={description}
          onChangeText={setDescription}
          placeholder="Optional notes about this class"
          placeholderTextColor={Colors.textSecondary + '80'}
          multiline
          numberOfLines={3}
        />

        <Pressable style={styles.saveButton} onPress={handleSave} disabled={createMutation.isPending}>
          {createMutation.isPending ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveText}>Create Class</Text>}
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
  label: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary, marginBottom: Spacing.xs, marginTop: Spacing.md },
  input: { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, borderRadius: BorderRadius.md, padding: Spacing.md, fontSize: 16, color: Colors.textPrimary },
  multiline: { minHeight: 80, textAlignVertical: 'top' },
  gradeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  gradeChip: { backgroundColor: Colors.surface, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.border },
  gradeChipSelected: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  gradeChipText: { fontSize: 13, color: Colors.textSecondary, fontWeight: '600' },
  gradeChipTextSelected: { color: '#fff' },
  saveButton: { backgroundColor: Colors.primary, borderRadius: BorderRadius.md, padding: Spacing.lg, alignItems: 'center', marginTop: Spacing.xxl },
  saveText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});