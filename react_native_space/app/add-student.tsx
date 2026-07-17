import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Pressable, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '@/src/theme';
import { useStudentsControllerCreate, useClassesControllerFindAll } from '@/src/api/generated/api';
import { getErrorMessage } from '@/src/api/customFetch';

export default function AddStudentScreen() {
  const router = useRouter();
  const createMutation = useStudentsControllerCreate();
  const { data: classes } = useClassesControllerFindAll();

  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [parentName, setParentName] = useState('');
  const [dob, setDob] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  const toggleClass = (id: string) => {
    setSelectedClasses((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const handleSave = async () => {
    if (!name.trim() || !parentName.trim() || !dob.trim() || !contactNumber.trim()) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    try {
      await createMutation.mutateAsync({
        data: { name: name.trim(), nickname: nickname.trim() || undefined, parentName: parentName.trim(), dob, contactNumber: contactNumber.trim(), classIds: selectedClasses },
      });
      router.back();
    } catch (e) {
      Alert.alert('Error', getErrorMessage(e, 'Failed to create student'));
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color={Colors.textPrimary} /></Pressable>
        <Text style={styles.topTitle}>Add Student</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Name *</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Student name" placeholderTextColor={Colors.textSecondary + '80'} />
        <Text style={styles.label}>Nickname</Text>
        <TextInput style={styles.input} value={nickname} onChangeText={setNickname} placeholder="What the student prefers to be called" placeholderTextColor={Colors.textSecondary + '80'} />
        <Text style={styles.label}>Parent Name *</Text>
        <TextInput style={styles.input} value={parentName} onChangeText={setParentName} placeholder="Parent/Guardian name" placeholderTextColor={Colors.textSecondary + '80'} />
        <Text style={styles.label}>Date of Birth * (YYYY-MM-DD)</Text>
        <TextInput style={styles.input} value={dob} onChangeText={setDob} placeholder="2015-06-15" placeholderTextColor={Colors.textSecondary + '80'} />
        <Text style={styles.label}>Contact Number *</Text>
        <TextInput style={styles.input} value={contactNumber} onChangeText={setContactNumber} placeholder="+65 xxxx xxxx" placeholderTextColor={Colors.textSecondary + '80'} keyboardType="phone-pad" />

        <Text style={[styles.label, { marginTop: Spacing.xl }]}>Enroll in Classes</Text>
        <View style={styles.classGrid}>
          {(classes ?? []).map((c) => (
            <Pressable
              key={c?.id}
              style={[styles.classChip, selectedClasses.includes(c?.id ?? '') && styles.classChipSelected]}
              onPress={() => toggleClass(c?.id ?? '')}
            >
              <Text style={[styles.classChipText, selectedClasses.includes(c?.id ?? '') && styles.classChipTextSelected]}>{c?.name ?? ''}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.saveButton} onPress={handleSave} disabled={createMutation.isPending}>
          {createMutation.isPending ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveText}>Create Student</Text>}
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
  classGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  classChip: { backgroundColor: Colors.surface, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.border },
  classChipSelected: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  classChipText: { fontSize: 13, color: Colors.textSecondary, fontWeight: '600' },
  classChipTextSelected: { color: '#fff' },
  saveButton: { backgroundColor: Colors.primary, borderRadius: BorderRadius.md, padding: Spacing.lg, alignItems: 'center', marginTop: Spacing.xxl },
  saveText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
