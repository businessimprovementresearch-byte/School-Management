import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '@/src/theme';
import { useAuth } from '@/src/context/AuthContext';
import { useNotificationsControllerUnreadCount } from '@/src/api/generated/api';

export default function MoreScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const isAdmin = user?.role === 'ADMIN';
  const unreadQuery = useNotificationsControllerUnreadCount();
  const unread = unreadQuery?.data?.count ?? 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>More</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <MenuItem icon="person" label="My Profile" onPress={() => router.push('/profile')} />
        <MenuItem icon="notifications" label="Notifications" badge={unread} onPress={() => router.push('/notifications')} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SCHOOL LIFE</Text>
          <MenuItem icon="sparkles" label="Events" onPress={() => router.push('/events')} />
          <MenuItem icon="trophy" label="Awards" onPress={() => router.push('/awards')} />
          <MenuItem icon="images" label="Photo Gallery" onPress={() => router.push('/gallery')} />
        </View>

        {isAdmin ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ADMINISTRATION</Text>
            <MenuItem icon="people" label="Teachers" onPress={() => router.push('/teachers-list')} />
            <MenuItem icon="calendar" label="Academic Years" onPress={() => router.push('/academic-years')} />
            <MenuItem icon="time" label="Terms" onPress={() => router.push('/terms')} />
            <MenuItem icon="bar-chart" label="Progress Metrics" onPress={() => router.push('/metrics')} />
            <MenuItem icon="document-text" label="Generate Report Card" onPress={() => router.push('/generate-report')} />
            <MenuItem icon="notifications-circle" label="Attendance Alert Settings" onPress={() => router.push('/alert-settings')} />
          </View>
        ) : null}

        <Pressable style={styles.logoutButton} onPress={logout}>
          <Ionicons name="log-out-outline" size={22} color={Colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function MenuItem({ icon, label, onPress, badge }: { icon: string; label: string; onPress: () => void; badge?: number }) {
  return (
    <Pressable style={styles.menuItem} onPress={onPress}>
      <Ionicons name={icon as any} size={22} color={Colors.secondary} />
      <Text style={styles.menuLabel}>{label}</Text>
      {badge && badge > 0 ? (
        <View style={styles.badge}><Text style={styles.badgeText}>{badge > 99 ? '99+' : badge}</Text></View>
      ) : null}
      <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, paddingBottom: Spacing.sm },
  title: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary },
  content: { padding: Spacing.lg },
  section: { marginTop: Spacing.xl },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: Colors.textSecondary, marginBottom: Spacing.sm, letterSpacing: 0.5 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface,
    padding: Spacing.lg, borderRadius: BorderRadius.md, marginBottom: Spacing.sm,
  },
  menuLabel: { flex: 1, fontSize: 16, fontWeight: '600', color: Colors.textPrimary, marginLeft: Spacing.md },
  badge: { backgroundColor: Colors.primary, borderRadius: 12, minWidth: 22, height: 22, paddingHorizontal: 6, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.sm },
  badgeText: { color: '#FFF', fontSize: 12, fontWeight: '700' },
  logoutButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    padding: Spacing.lg, marginTop: Spacing.xxxl, gap: Spacing.sm,
  },
  logoutText: { fontSize: 16, fontWeight: '600', color: Colors.error },
});
