import React from 'react';
import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Text, Button, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/src/theme';
import Avatar from '@/src/components/Avatar';
import { useAuth } from '@/src/context/AuthContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={16}><Ionicons name="arrow-back" size={24} color={theme.colors.text} /></Pressable>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.profileSection}>
          <Avatar name={user?.name ?? 'User'} size={80} />
          <Text style={styles.name}>{user?.name ?? 'User'}</Text>
          <Text style={styles.email}>{user?.email ?? ''}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{user?.role ?? 'USER'}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Details</Text>
          <Divider style={{ marginBottom: 12 }} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user?.email ?? '-'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Role</Text>
            <Text style={styles.infoValue}>{user?.role ?? '-'}</Text>
          </View>
          {user?.teacherId && (
            <Pressable style={styles.infoRow} onPress={() => router.push(`/teacher/${user.teacherId}`)}>
              <Text style={styles.infoLabel}>Teacher Profile</Text>
              <Ionicons name="chevron-forward" size={18} color={theme.colors.primary} />
            </Pressable>
          )}
        </View>

        <Button mode="contained" onPress={logout} style={styles.logoutBtn} buttonColor={theme.colors.error} textColor="#FFF">
          Sign Out
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.text },
  scroll: { paddingBottom: 40 },
  profileSection: { alignItems: 'center', paddingVertical: 28 },
  name: { fontSize: 24, fontWeight: '700', color: theme.colors.text, marginTop: 12 },
  email: { fontSize: 14, color: theme.colors.textSecondary, marginTop: 4 },
  roleBadge: { marginTop: 8, backgroundColor: theme.colors.primaryLight, paddingHorizontal: 14, paddingVertical: 4, borderRadius: 12 },
  roleText: { fontSize: 12, fontWeight: '700', color: theme.colors.primary },
  section: { marginHorizontal: 16, marginTop: 8, backgroundColor: '#FFF', borderRadius: 12, padding: 16, elevation: 1 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: theme.colors.text, marginBottom: 8 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  infoLabel: { fontSize: 14, color: theme.colors.textSecondary },
  infoValue: { fontSize: 14, fontWeight: '600', color: theme.colors.text },
  logoutBtn: { marginHorizontal: 16, marginTop: 32, borderRadius: 8 },
});
