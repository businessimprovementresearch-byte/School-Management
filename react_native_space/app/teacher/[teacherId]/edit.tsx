import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { customFetch, getErrorMessage } from '../../../src/api/customFetch';
import type { TeacherDetailResponseDto } from '../../../src/api/generated/schemas/teacherDetailResponseDto';

export default function EditTeacherScreen() {
  const { teacherId } = useLocalSearchParams<{ teacherId: string }>();
  const router = useRouter();

  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [dob, setDob] = useState('');
  const [remarks, setRemarks] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (teacherId) {
      customFetch<TeacherDetailResponseDto>(`/api/teachers/${teacherId}`)
        .then((data) => {
          setName(data.name || '');
          setNickname(data.nickname || '');
          setTitle(data.title || '');
          setAddress(data.address || '');
          setEmail(data.email || '');
          setContactNumber(data.contactNumber || '');
          setDob(data.dob ? data.dob.split('T')[0] : '');
          setRemarks(data.remarks || '');
          setIsActive(data.isActive ?? true);
        })
        .catch((err) => Alert.alert('Error', 'Gagal memuat data guru'));
    }
  }, [teacherId]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload: any = {
        name: name.trim() || null,
        nickname: nickname || null,
        title: title || null,
        address: address || null,
        email: email || undefined,
        contactNumber: contactNumber || null,
        dob: dob || null,
        remarks: remarks || null,
        isActive,
      };

      if (password.trim().length > 0) {
        payload.password = password;
      }

      await customFetch(`/api/teachers/${teacherId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      Alert.alert('Sukses', 'Data guru berhasil diperbarui');
      router.back();
    } catch (err: unknown) {
      Alert.alert('Gagal', getErrorMessage(err, 'Terjadi kesalahan saat menyimpan'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Profile Guru</Text>

      <Text style={styles.label}>Nama Lengkap (Opsional)</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nama Guru" />

      <Text style={styles.label}>Nama Panggilan (Nickname)</Text>
      <TextInput style={styles.input} value={nickname} onChangeText={setNickname} placeholder="Contoh: Pak Budi" />

      <Text style={styles.label}>Gelar (Opsional)</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Contoh: Guru" />

      <Text style={styles.label}>Alamat (Opsional)</Text>
      <TextInput style={styles.input} value={address} onChangeText={setAddress} multiline numberOfLines={3} />

      <Text style={styles.label}>Email (Detail Login)</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

      <Text style={styles.label}>Password Baru (Kosongkan jika tidak diubah)</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry placeholder="******" />

      <Text style={styles.label}>Nomor Telepon (Opsional)</Text>
      <TextInput style={styles.input} value={contactNumber} onChangeText={setContactNumber} keyboardType="phone-pad" />

      <Text style={styles.label}>Tanggal Lahir (YYYY-MM-DD) (Opsional)</Text>
      <TextInput style={styles.input} value={dob} onChangeText={setDob} placeholder="1990-01-01" />

      <Text style={styles.label}>Catatan / Remarks (Opsional)</Text>
      <TextInput style={styles.input} value={remarks} onChangeText={setRemarks} multiline numberOfLines={3} />

      <View style={styles.switchRow}>
        <Text style={styles.label}>Status Akun Aktif</Text>
        <Switch value={isActive} onValueChange={setIsActive} />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
        <Text style={styles.saveButtonText}>{loading ? 'Saving...' : 'Simpan Perubahan'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FFF' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#CCC', borderRadius: 8, padding: 10, fontSize: 15 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 },
  saveButton: { backgroundColor: '#FF6B00', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 24, marginBottom: 40 },
  saveButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});