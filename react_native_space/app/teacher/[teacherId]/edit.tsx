import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTeachersControllerFindOne, useTeachersControllerUpdate } from '@/src/api/generated/api';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/src/theme';
import { getErrorMessage } from '@/src/api/customFetch';

export default function EditTeacherScreen() {
  const router = useRouter();
  const { teacherId = '' } = useLocalSearchParams<{ teacherId: string }>();
  const { data, isLoading } = useTeachersControllerFindOne(teacherId, { query: { enabled: !!teacherId } });
  const updateMutation = useTeachersControllerUpdate();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (data) {
      setName(data?.name ?? '');
      setDob(data?.dob ? data.dob.split('T')[0] : '');
      setContactNumber(data?.contactNumber ?? '');
    }
  }, [data]);

  const handleSave = () => {
    setError('');
    if (!name?.trim()) { setError('Name is required'); return; }
    updateMutation.mutate({ id: teacherId, data: { name: name.trim(), dob: dob || undefined, contactNumber: contactNumber || undefined } }, {
      onSuccess: () => router.back(),
      onError: (e) => setError(getErrorMessage(e, 'Failed to update')),
    });
  };

  if (isLoading) return <SafeAreaView style={styles.container}><ActivityIndicator style={{ marginTop: 60 }} color={theme.colors.primary} /></SafeAreaView>;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={16}><Ionicons name="arrow-back" size={24} color={theme.colors.text} /></Pressable>
        <Text style={styles.headerTitle}>Edit Teacher</Text>
        <View style={{ width: 24 }} />
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll}>
          {!!error && <Text style={styles.error}>{error}</Text>}
          <TextInput label="Name" value={name} onChangeText={setName} mode="outlined" style={styles.input} outlineColor={theme.colors.border} activeOutlineColor={theme.colors.primary} />
          <TextInput label="Date of Birth (YYYY-MM-DD)" value={dob} onChangeText={setDob} mode="outlined" style={styles.input} outlineColor={theme.colors.border} activeOutlineColor={theme.colors.primary} />
          <TextInput label="Contact Number" value={contactNumber} onChangeText={setContactNumber} mode="outlined" style={styles.input} outlineColor={theme.colors.border} activeOutlineColor={theme.colors.primary} keyboardType="phone-pad" />
          <Button mode="contained" onPress={handleSave} loading={updateMutation?.isPending} style={styles.btn} buttonColor={theme.colors.primary}>
            Save Changes
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.text },
  scroll: { padding: 16, paddingBottom: 40 },
  input: { marginBottom: 14, backgroundColor: '#FFF' },
  error: { color: theme.colors.error, marginBottom: 12, textAlign: 'center' },
  btn: { marginTop: 8, borderRadius: 8 },
});
