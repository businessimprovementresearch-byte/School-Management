import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Pressable, KeyboardAvoidingView, Platform, Switch } from 'react-native';
import { Text, TextInput, Button, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import { useTeachersControllerFindOne, useTeachersControllerUpdate, useClassesControllerFindAll } from '@/src/api/generated/api';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/src/theme';
import { getErrorMessage } from '@/src/api/customFetch';

export default function EditTeacherScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const params = useLocalSearchParams<{ teacherId?: string; id?: string }>();

  const effectiveId = (params.teacherId || params.id || '').toString();

  const { data, isLoading } = useTeachersControllerFindOne(effectiveId, {
    query: { enabled: !!effectiveId },
  });
  const { data: classes } = useClassesControllerFindAll();
  const updateMutation = useTeachersControllerUpdate();

  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [remarks, setRemarks] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (data) {
      const t = data as any;
      setName(t?.name ?? '');
      setNickname(t?.nickname ?? '');
      setEmail(t?.email ?? '');
      setPassword('');
      setDob(t?.dob ? t.dob.split('T')[0] : '');
      setContactNumber(t?.contactNumber ?? t?.phone ?? '');
      setRemarks(t?.remarks ?? '');
      setIsActive(t?.isActive ?? true);

      const initialClasses = t?.classes?.map((c: any) => c.id) || t?.classIds || [];
      setSelectedClasses(initialClasses);
    }
  }, [data]);

  const toggleClass = (classId: string) => {
    setSelectedClasses((prev) =>
      prev.includes(classId) ? prev.filter((id) => id !== classId) : [...prev, classId]
    );
  };

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleSave = async () => {
    setError('');

    if (!name?.trim()) {
      setError('Name is required');
      return;
    }

    try {
      const payload: any = {
        name: name.trim(),
        nickname: nickname.trim() || undefined,
        email: email.trim() || undefined,
        dob: dob.trim() || undefined,
        contactNumber: contactNumber.trim() || undefined,
        remarks: remarks.trim() || undefined,
        isActive,
        classIds: selectedClasses,
      };

      if (password.trim()) {
        payload.password = password.trim();
      }

      await updateMutation.mutateAsync({
        id: effectiveId,
        data: payload,
      });

      await queryClient.invalidateQueries();
      handleGoBack();
    } catch (e) {
      setError(getErrorMessage(e, 'Failed to update teacher'));
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator style={{ marginTop: 60 }} color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  // Konfigurasi warna label dan teks input agar selalu terlihat jelas dan berwarna hitam
  const inputTheme = {
    colors: {
      onSurfaceVariant: '#374151', // Warna label judul saat tidak fokus
      primary: theme.colors.primary, // Warna border & label saat aktif fokus
      text: '#000000',
    },
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleGoBack} hitSlop={16}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Edit Teacher</Text>
        <Pressable onPress={() => router.replace('/(tabs)')} hitSlop={16}>
          <Ionicons name="home-outline" size={22} color={theme.colors.primary} />
        </Pressable>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll}>
          {!!error && <Text style={styles.error}>{error}</Text>}

          {/* Name (Required) */}
          <TextInput
            label="Name *"
            value={name}
            onChangeText={setName}
            mode="outlined"
            textColor="#000000"
            placeholder="e.g. Gurmukh Singh"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            outlineColor="#D1D5DB"
            activeOutlineColor={theme.colors.primary}
            theme={inputTheme}
          />

          {/* Nickname (Optional) */}
          <TextInput
            label="Nickname (Optional)"
            value={nickname}
            onChangeText={setNickname}
            mode="outlined"
            textColor="#000000"
            placeholder="e.g. Gurmukh"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            outlineColor="#D1D5DB"
            activeOutlineColor={theme.colors.primary}
            theme={inputTheme}
          />

          {/* Email (Optional) */}
          <TextInput
            label="Email (Optional)"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            textColor="#000000"
            placeholder="e.g. teacher@example.com"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            outlineColor="#D1D5DB"
            activeOutlineColor={theme.colors.primary}
            keyboardType="email-address"
            autoCapitalize="none"
            theme={inputTheme}
          />

          {/* Password (Optional) */}
          <TextInput
            label="Password (Kosongkan jika tidak ingin diubah)"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            textColor="#000000"
            placeholder="Password baru"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            outlineColor="#D1D5DB"
            activeOutlineColor={theme.colors.primary}
            secureTextEntry
            theme={inputTheme}
          />

          {/* Date of Birth */}
          <TextInput
            label="Date of Birth (YYYY-MM-DD)"
            value={dob}
            onChangeText={setDob}
            mode="outlined"
            textColor="#000000"
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            outlineColor="#D1D5DB"
            activeOutlineColor={theme.colors.primary}
            theme={inputTheme}
          />

          {/* Contact Number */}
          <TextInput
            label="Contact Number"
            value={contactNumber}
            onChangeText={setContactNumber}
            mode="outlined"
            textColor="#000000"
            placeholder="+62xxxxxxx"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            outlineColor="#D1D5DB"
            activeOutlineColor={theme.colors.primary}
            keyboardType="phone-pad"
            theme={inputTheme}
          />

          {/* Remarks */}
          <TextInput
            label="Remarks / Special Comments"
            value={remarks}
            onChangeText={setRemarks}
            mode="outlined"
            textColor="#000000"
            placeholder="Catatan tambahan"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            outlineColor="#D1D5DB"
            activeOutlineColor={theme.colors.primary}
            multiline
            numberOfLines={3}
            theme={inputTheme}
          />

          {/* Status Switch */}
          <View style={styles.statusContainer}>
            <View>
              <Text style={styles.statusTitle}>Teacher Status</Text>
              <Text style={styles.statusSubTitle}>{isActive ? 'Active (Guru Aktif)' : 'Inactive (Guru Nonaktif)'}</Text>
            </View>
            <Switch
              value={isActive}
              onValueChange={setIsActive}
              trackColor={{ false: '#D1D5DB', true: theme.colors.primary + '80' }}
              thumbColor={isActive ? theme.colors.primary : '#F4F3F4'}
            />
          </View>

          {/* Assign to Classes */}
          <Text style={styles.sectionLabel}>Assign to Classes</Text>
          <View style={styles.classGrid}>
            {(classes ?? []).map((c) => {
              const isSelected = selectedClasses.includes(c?.id ?? '');
              return (
                <Pressable
                  key={c?.id}
                  style={[styles.classChip, isSelected && styles.classChipSelected]}
                  onPress={() => toggleClass(c?.id ?? '')}
                >
                  <Text style={[styles.classChipText, isSelected && styles.classChipTextSelected]}>
                    {c?.name ?? ''}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Save Button */}
          <Button
            mode="contained"
            onPress={handleSave}
            loading={updateMutation?.isPending}
            disabled={updateMutation?.isPending}
            style={styles.btn}
            buttonColor={theme.colors.primary}
          >
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
  input: { marginBottom: 14, backgroundColor: '#FFFFFF', fontSize: 15 },
  error: { color: theme.colors.error, marginBottom: 12, textAlign: 'center' },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  statusTitle: { fontSize: 14, fontWeight: '600', color: '#111827' },
  statusSubTitle: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  sectionLabel: { fontSize: 14, fontWeight: '600', color: '#111827', marginTop: 12, marginBottom: 8 },
  classGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  classChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  classChipSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  classChipText: { fontSize: 13, color: '#374151', fontWeight: '500' },
  classChipTextSelected: { color: '#FFFFFF', fontWeight: '700' },
  btn: { marginTop: 12, borderRadius: 8, paddingVertical: 4 },
});