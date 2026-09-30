import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { customFetch } from '../../../src/api/customFetch';

export default function EditTeacherScreen() {
  const { teacherId } = useLocalSearchParams<{ teacherId: string }>();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [dob, setDob] = useState('');
  const [remarks, setRemarks] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (teacherId) {
      customFetch(`/api/teachers/${teacherId}`)
        .then((data) => {
          setName(data.name || '');
          setEmail(data.email || '');
          setContactNumber(data.contactNumber || '');
          setDob(data.dob ? data.dob.split('T')[0] : '');
          setRemarks(data.remarks || '');
        })
        .catch(() => Alert.alert('Error', 'Gagal memuat data guru'));
    }
  }, [teacherId]);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Validasi', 'Nama lengkap wajib diisi');
      return;
    }

    setLoading(true);
    try {
      const payload: any = {
        name,
        email: email || undefined,
        contactNumber: contactNumber || null,
        dob: dob || null,
        remarks: remarks || null,
      };

      if (password.trim().length > 0) {
        payload.password = password;
      }

      await customFetch(`/api/teachers/${teacherId}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      });

      Alert.alert('Sukses', 'Data guru berhasil diperbarui');
      router.back();
    } catch (err: any) {
      Alert.alert('Gagal', err.message || 'Terjadi kesalahan saat menyimpan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Profil Guru</Text>

      <Text style={styles.label}>Nama Lengkap *</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nama Guru" />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

      <Text style={styles.label}>Password Baru (Isi jika ingin diubah)</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry placeholder="******" />

      <Text style={styles.label}>Nomor Telepon</Text>
      <TextInput style={styles.input} value={contactNumber} onChangeText={setContactNumber} keyboardType="phone-pad" />

      <Text style={styles.label}>Tanggal Lahir (YYYY-MM-DD)</Text>
      <TextInput style={styles.input} value={dob} onChangeText={setDob} placeholder="1990-01-01" />

      <Text style={styles.label}>Catatan (Remarks)</Text>
      <TextInput style={styles.input} value={remarks} onChangeText={setRemarks} multiline numberOfLines={3} />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
        <Text style={styles.saveButtonText}>{loading ? 'Menyimpan...' : 'Simpan Perubahan'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FFF' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#CCC', borderRadius: 8, padding: 10, fontSize: 15 },
  saveButton: { backgroundColor: '#FF6B00', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 24, marginBottom: 40 },
  saveButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});