import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Pressable, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '@/src/theme';
import { useProgressControllerCreate } from '@/src/api/generated/api';
import { getErrorMessage } from '@/src/api/customFetch';

export default function AddProgressScreen() {
  const router = useRouter();
  const createMutation = useProgressControllerCreate();
  const [studentId, setStudentId] = useState('');
  const [metricId, setMetricId] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = async () => {
    if (!studentId || !metricId || !sessionId || !value) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    try {
      await createMutation.mutateAsync({
        data: { studentId, progressMetricId: metricId, classSessionId: sessionId, value: parseFloat(value), notes: notes || undefined },
      });
      router.back();
    } catch (e) {
      Alert.alert('Error', getErrorMessage(e, 'Failed to add progress'));
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color={Colors.textPrimary} /></Pressable>
        <Text style={styles.topTitle}>Add Progress</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Student ID</Text>
        <TextInput style={styles.input} value={studentId} onChangeText={setStudentId} placeholder="Enter student UUID" placeholderTextColor={Colors.textSecondary + '80'} />
        <Text style={styles.label}>Metric ID</Text>
        <TextInput style={styles.input} value={metricId} onChangeText={setMetricId} placeholder="Enter metric UUID" placeholderTextColor={Colors.textSecondary + '80'} />
        <Text style={styles.label}>Session ID</Text>
        <TextInput style={styles.input} value={sessionId} onChangeText={setSessionId} placeholder="Enter session UUID" placeholderTextColor={Colors.textSecondary + '80'} />
        <Text style={styles.label}>Value</Text>
        <TextInput style={styles.input} value={value} onChangeText={setValue} keyboardType="numeric" placeholder="Score/Level" placeholderTextColor={Colors.textSecondary + '80'} />
        <Text style={styles.label}>Notes (optional)</Text>
        <TextInput style={[styles.input, { height: 80 }]} value={notes} onChangeText={setNotes} multiline placeholder="Additional notes" placeholderTextColor={Colors.textSecondary + '80'} />

        <Pressable style={styles.saveButton} onPress={handleSave} disabled={createMutation.isPending}>
          {createMutation.isPending ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveText}>Add Progress Entry</Text>}
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
  saveButton: { backgroundColor: Colors.primary, borderRadius: BorderRadius.md, padding: Spacing.lg, alignItems: 'center', marginTop: Spacing.xxl },
  saveText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
