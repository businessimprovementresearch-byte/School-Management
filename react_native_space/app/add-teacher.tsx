import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Pressable, Alert, ActivityIndicator, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';
import { Colors, Spacing, BorderRadius } from '@/src/theme';
import { useTeachersControllerCreate, useClassesControllerFindAll } from '@/src/api/generated/api';
import { getErrorMessage } from '@/src/api/customFetch';

export default function AddTeacherScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const createMutation = useTeachersControllerCreate();
  const { data: classes } = useClassesControllerFindAll();

  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  const toggleClass = (id: string) => {
    setSelectedClasses((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  };

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleGoHome = () => {
    router.replace('/(tabs)');
  };

  const handleSave = async () => {
    const trimmedName = name.trim();

    // Validasi: Hanya Nama yang Wajib Diisi
    if (!trimmedName) {
      Alert.alert('Error', 'Please fill in the required field: Teacher Name');
      return;
    }

    try {
      // Hanya masukkan field yang diisi ke dalam payload (field kosong tidak dikirim)
      const payload: Record<string, any> = {
        name: trimmedName,
        isActive,
      };

      if (nickname.trim()) payload.nickname = nickname.trim();
      if (email.trim()) payload.email = email.trim();
      if (password.trim()) payload.password = password.trim();
      if (dob.trim()) payload.dob = dob.trim();
      if (contactNumber.trim()) payload.contactNumber = contactNumber.trim();
      if (selectedClasses.length > 0) payload.classIds = selectedClasses;

      await createMutation.mutateAsync({
        data: payload as any,
      });

      // Refresh seluruh cache React Query agar daftar guru langsung ter-update
      await queryClient.invalidateQueries();

      // Pesan Sukses Eksplisit
      Alert.alert('Success', 'Add teacher success', [
        {
          text: 'OK',
          onPress: handleGoBack,
        },
      ]);
    } catch (e) {
      Alert.alert('Error', getErrorMessage(e, 'Failed to add teacher. Please check the entered data.'));
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Pressable onPress={handleGoBack} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <Text style={styles.topTitle}>Add Teacher</Text>
        <Pressable onPress={handleGoHome} style={styles.iconBtn}>
          <Ionicons name="home-outline" size={22} color={Colors.primary} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Name (Hanya ini yang wajib) */}
        <Text style={styles.label}>Name *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Full name (Required)"
          placeholderTextColor={Colors.textSecondary + '80'}
        />

        {/* Nickname (Optional) */}
        <Text style={styles.label}>Nickname (Optional)</Text>
        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={setNickname}
          placeholder="Nickname"
          placeholderTextColor={Colors.textSecondary + '80'}
        />

        {/* Email (Optional) */}
        <Text style={styles.label}>Email (Optional)</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          placeholder="teacher@example.com"
          placeholderTextColor={Colors.textSecondary + '80'}
        />

        {/* Password (Optional) */}
        <Text style={styles.label}>Password (Optional)</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="new-password"
          placeholder="Min 6 characters"
          placeholderTextColor={Colors.textSecondary + '80'}
        />

        {/* Date of Birth (Optional) */}
        <Text style={styles.label}>Date of Birth (Optional, YYYY-MM-DD)</Text>
        <TextInput
          style={styles.input}
          value={dob}
          onChangeText={setDob}
          placeholder="1990-01-01"
          placeholderTextColor={Colors.textSecondary + '80'}
        />

        {/* Contact Number (Optional) */}
        <Text style={styles.label}>Contact Number (Optional)</Text>
        <TextInput
          style={styles.input}
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="phone-pad"
          placeholder="+65 xxxx xxxx"
          placeholderTextColor={Colors.textSecondary + '80'}
        />

        {/* Teacher Status Switch */}
        <View style={styles.statusRow}>
          <View>
            <Text style={styles.statusLabel}>Teacher Status</Text>
            <Text style={styles.statusSubLabel}>{isActive ? 'Active' : 'Inactive'}</Text>
          </View>
          <Switch
            value={isActive}
            onValueChange={setIsActive}
            trackColor={{ false: Colors.border, true: Colors.primary + '80' }}
            thumbColor={isActive ? Colors.primary : '#f4f3f4'}
          />
        </View>

        {/* Class Assignment (Optional) */}
        <Text style={[styles.label, { marginTop: Spacing.xl }]}>Assign to Classes (Optional)</Text>
        <View style={styles.classGrid}>
          {(classes ?? []).map((c) => (
            <Pressable
              key={c?.id}
              style={[styles.classChip, selectedClasses.includes(c?.id ?? '') && styles.classChipSelected]}
              onPress={() => toggleClass(c?.id ?? '')}
            >
              <Text style={[styles.classChipText, selectedClasses.includes(c?.id ?? '') && styles.classChipTextSelected]}>
                {c?.name ?? ''}
              </Text>
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
  iconBtn: { padding: Spacing.xs },
  topTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxl * 2 },
  label: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary, marginBottom: Spacing.xs, marginTop: Spacing.md },
  input: { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, borderRadius: BorderRadius.md, padding: Spacing.md, fontSize: 16, color: Colors.textPrimary },
  statusRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: Spacing.lg, paddingVertical: Spacing.xs },
  statusLabel: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  statusSubLabel: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  classGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  classChip: { backgroundColor: Colors.surface, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.border },
  classChipSelected: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  classChipText: { fontSize: 13, color: Colors.textSecondary, fontWeight: '600' },
  classChipTextSelected: { color: '#fff' },
  saveButton: { backgroundColor: Colors.primary, borderRadius: BorderRadius.md, padding: Spacing.lg, alignItems: 'center', marginTop: Spacing.xxl },
  saveText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});