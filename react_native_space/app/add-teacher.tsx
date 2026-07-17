import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Pressable, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '@/src/theme';
import { useTeachersControllerCreate, useClassesControllerFindAll } from '@/src/api/generated/api';
import { getErrorMessage } from '@/src/api/customFetch';

export default function AddTeacherScreen() {
  const router = useRouter();
  const createMutation = useTeachersControllerCreate();
  const { data: classes } = useClassesControllerFindAll();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  const toggleClass = (id: string) => {
    setSelectedClasses((prev) => prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]);
  };

  const handleSave = async () => {
    if (!email.trim() || !password.trim() || !name.trim() || !dob.trim() || !contactNumber.trim()) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    try {
      await createMutation.mutateAsync({
        data: { email: email.trim(), password, name: name.trim(), dob, contactNumber: contactNumber.trim(), classIds: selectedClasses },
      });
      router.back();
    } catch (e) {
      Alert.alert('Error', getErrorMessage(e, 'Failed to create teacher'));
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color={Colors.textPrimary} /></Pressable>
        <Text style={styles.topTitle}>Add Teacher</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Email *</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholder="teacher@example.com" placeholderTextColor={Colors.textSecondary + '80'} />
        <Text style={styles.label}>Password *</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry placeholder="Min 6 characters" placeholderTextColor={Colors.textSecondary + '80'} />
        <Text style={styles.label}>Name *</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Full name" placeholderTextColor={Colors.textSecondary + '80'} />
        <Text style={styles.label}>Date of Birth * (YYYY-MM-DD)</Text>
        <TextInput style={styles.input} value={dob} onChangeText={setDob} placeholder="1990-01-01" placeholderTextColor={Colors.textSecondary + '80'} />
        <Text style={styles.label}>Contact Number *</Text>
        <TextInput style={styles.input} value={contactNumber} onChangeText={setContactNumber} keyboardType="phone-pad" placeholder="+65 xxxx xxxx" placeholderTextColor={Colors.textSecondary + '80'} />

        <Text style={[styles.label, { marginTop: Spacing.xl }]}>Assign to Classes</Text>
        <View style={styles.classGrid}>
          {(classes ?? []).map((c) => (
            <Pressable key={c?.id} style={[styles.classChip, selectedClasses.includes(c?.id ?? '') && styles.classChipSelected]} onPress={() => toggleClass(c?.id ?? '')}>
              <Text style={[styles.classChipText, selectedClasses.includes(c?.id ?? '') && styles.classChipTextSelected]}>{c?.name ?? ''}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.saveButton} onPress={handleSave} disabled={createMutation.isPending}>
          {createMutation.isPending ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveText}>Create Teacher</Text>}
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
