import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Pressable, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '@/src/theme';
import { useStudentsControllerFindOne, useStudentsControllerUpdate } from '@/src/api/generated/api';
import { getErrorMessage } from '@/src/api/customFetch';

export default function EditStudentScreen() {
  const { studentId = '' } = useLocalSearchParams<{ studentId: string }>();
  const router = useRouter();
  const { data } = useStudentsControllerFindOne(studentId, { query: { enabled: !!studentId } });
  const updateMutation = useStudentsControllerUpdate();

  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [parentName, setParentName] = useState('');
  const [dob, setDob] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  useEffect(() => {
    if (data) {
      setName(data?.name ?? '');
      setNickname(data?.nickname ?? '');
      setParentName(data?.parentName ?? '');
      setDob(data?.dob ? data.dob.split('T')[0] : '');
      setContactNumber(data?.contactNumber ?? '');
    }
  }, [data]);

  const handleSave = async () => {
    try {
      await updateMutation.mutateAsync({ id: studentId, data: { name, nickname, parentName, dob, contactNumber } });
      router.back();
    } catch (e) {
      Alert.alert('Error', getErrorMessage(e, 'Failed to update student'));
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color={Colors.textPrimary} /></Pressable>
        <Text style={styles.topTitle}>Edit Student</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
        <Text style={styles.label}>Nickname</Text>
        <TextInput style={styles.input} value={nickname} onChangeText={setNickname} placeholder="What the student prefers to be called" placeholderTextColor={Colors.textSecondary + '80'} />
        <Text style={styles.label}>Parent Name</Text>
        <TextInput style={styles.input} value={parentName} onChangeText={setParentName} />
        <Text style={styles.label}>Date of Birth (YYYY-MM-DD)</Text>
        <TextInput style={styles.input} value={dob} onChangeText={setDob} />
        <Text style={styles.label}>Contact Number</Text>
        <TextInput style={styles.input} value={contactNumber} onChangeText={setContactNumber} keyboardType="phone-pad" />

        <Pressable style={styles.saveButton} onPress={handleSave} disabled={updateMutation.isPending}>
          {updateMutation.isPending ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveText}>Save Changes</Text>}
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
