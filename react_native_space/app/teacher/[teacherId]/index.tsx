import React from 'react';
import { View, ScrollView, StyleSheet, Pressable, Alert, Platform } from 'react-native';
import { Text, ActivityIndicator, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  useTeachersControllerFindOne,
  useTeachersControllerRemove,
  useTeachersControllerUpdate,
} from '@/src/api/generated/api';
import { useFocusEffect } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/src/theme';
import Avatar from '@/src/components/Avatar';
import { useAuth } from '@/src/context/AuthContext';

export default function TeacherDetailScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { teacherId = '' } = useLocalSearchParams<{ teacherId: string }>();
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  const { data, isLoading, refetch } = useTeachersControllerFindOne(teacherId, { query: { enabled: !!teacherId } });
  const deleteMutation = useTeachersControllerRemove();
  const updateMutation = useTeachersControllerUpdate();

  useFocusEffect(React.useCallback(() => { if (teacherId) refetch(); }, [teacherId]));

  const isActive = data?.isActive ?? true;

  const handleToggleStatus = () => {
    const newStatus = !isActive;
    const actionText = newStatus ? 'Activate' : 'Deactivate';

    const doToggle = () => {
      updateMutation.mutate(
        {
          id: teacherId,
          data: { isActive: newStatus, status: newStatus ? 'ACTIVE' : 'INACTIVE' } as any,
        },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries();
            refetch();
          },
        }
      );
    };

    if (Platform.OS === 'web') {
      if (confirm(`${actionText} teacher "${data?.name ?? 'this teacher'}"?`)) doToggle();
    } else {
      Alert.alert(`${actionText} Teacher`, `Are you sure you want to ${actionText.toLowerCase()} this teacher?`, [
        { text: 'Cancel', style: 'cancel' },
        { text: actionText, onPress: doToggle },
      ]);
    }
  };

  const handleDelete = () => {
    const doDelete = () => {
      deleteMutation.mutate({ id: teacherId }, {
        onSuccess: async () => {
          await queryClient.invalidateQueries();
          router.back();
        },
      });
    };
    if (Platform.OS === 'web') { if (confirm('Remove this teacher?')) doDelete(); }
    else { Alert.alert('Remove Teacher', 'Are you sure?', [{ text: 'Cancel', style: 'cancel' }, { text: 'Remove', style: 'destructive', onPress: doDelete }]); }
  };

  if (isLoading || !data) return <SafeAreaView style={styles.container}><ActivityIndicator style={{ marginTop: 60 }} color={theme.colors.primary} /></SafeAreaView>;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={16}><Ionicons name="arrow-back" size={24} color={theme.colors.text} /></Pressable>
        <Text style={styles.headerTitle}>Teacher Profile</Text>
        {isAdmin ? <Pressable onPress={() => router.push(`/teacher/${teacherId}/edit`)} hitSlop={16}><Ionicons name="create-outline" size={22} color={theme.colors.primary} /></Pressable> : <View style={{ width: 22 }} />}
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.profileSection}>
          <Avatar name={data?.name ?? ''} uri={data?.photoUrl} size={80} />
          <View style={styles.nameRow}>
            <Text style={styles.name}>{data?.name ?? ''}</Text>
            <View style={[styles.statusBadge, isActive ? styles.activeBadge : styles.inactiveBadge]}>
              <Text style={[styles.statusBadgeText, isActive ? styles.activeBadgeText : styles.inactiveBadgeText]}>
                {isActive ? 'ACTIVE' : 'INACTIVE'}
              </Text>
            </View>
          </View>
          <Text style={styles.sub}>Age: {data?.age ?? '-'} • {data?.contactNumber ?? '-'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Attendance Summary</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}><Text style={styles.statNum}>{data?.attendanceSummary?.totalSessions ?? 0}</Text><Text style={styles.statLabel}>Sessions</Text></View>
            <View style={styles.statBox}><Text style={[styles.statNum, { color: theme.colors.success }]}>{data?.attendanceSummary?.present ?? 0}</Text><Text style={styles.statLabel}>Present</Text></View>
            <View style={styles.statBox}><Text style={[styles.statNum, { color: theme.colors.error }]}>{data?.attendanceSummary?.absent ?? 0}</Text><Text style={styles.statLabel}>Absent</Text></View>
            <View style={styles.statBox}><Text style={[styles.statNum, { color: theme.colors.primary }]}>{data?.attendanceSummary?.percentage ?? 0}%</Text><Text style={styles.statLabel}>Rate</Text></View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Assigned Classes</Text>
          {(data?.assignedClasses ?? []).length === 0 ? <Text style={styles.emptyText}>No classes assigned</Text> : (data?.assignedClasses ?? []).map(c => (
            <Pressable key={c?.id} style={styles.classCard} onPress={() => router.push(`/class/${c?.id}`)}>
              <View style={styles.classIcon}><Ionicons name="school-outline" size={20} color={theme.colors.primary} /></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.className}>{c?.name ?? ''}</Text>
                <Text style={styles.classGrade}>Grade {c?.grade ?? ''}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={theme.colors.textSecondary} />
            </Pressable>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Remarks</Text>
          {data?.remarks ? <Text style={styles.remarksText}>{data.remarks}</Text> : <Text style={styles.emptyText}>No remarks added</Text>}
        </View>

        {isAdmin && (
          <View style={styles.actionSection}>
            <Button
              mode="outlined"
              textColor={isActive ? '#D97706' : '#16A34A'}
              style={[styles.actionBtn, isActive ? styles.deactivateBtn : styles.activateBtn]}
              onPress={handleToggleStatus}
              loading={updateMutation.isPending}
            >
              {isActive ? 'Deactivate Teacher' : 'Activate Teacher'}
            </Button>

            <Button
              mode="outlined"
              textColor={theme.colors.error}
              style={styles.deleteBtn}
              onPress={handleDelete}
              loading={deleteMutation?.isPending}
            >
              Remove Teacher
            </Button>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.text },
  scroll: { paddingBottom: 40 },
  profileSection: { alignItems: 'center', paddingVertical: 24 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12 },
  name: { fontSize: 22, fontWeight: '700', color: theme.colors.text },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  activeBadge: { backgroundColor: '#DCFCE7' },
  inactiveBadge: { backgroundColor: '#FEE2E2' },
  statusBadgeText: { fontSize: 11, fontWeight: '700' },
  activeBadgeText: { color: '#15803D' },
  inactiveBadgeText: { color: '#B91C1C' },
  sub: { fontSize: 14, color: theme.colors.textSecondary, marginTop: 4 },
  section: { marginHorizontal: 16, marginTop: 16, backgroundColor: '#FFF', borderRadius: 12, padding: 16, elevation: 1 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: theme.colors.text, marginBottom: 12 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  statBox: { alignItems: 'center' },
  statNum: { fontSize: 20, fontWeight: '700', color: theme.colors.text },
  statLabel: { fontSize: 12, color: theme.colors.textSecondary, marginTop: 2 },
  classCard: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  classIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: theme.colors.primaryLight, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  className: { fontSize: 15, fontWeight: '600', color: theme.colors.text },
  classGrade: { fontSize: 12, color: theme.colors.textSecondary },
  emptyText: { fontSize: 14, color: theme.colors.textSecondary, textAlign: 'center', paddingVertical: 16 },
  remarksText: { fontSize: 14, color: theme.colors.text, lineHeight: 20 },
  actionSection: { paddingHorizontal: 16, marginTop: 24, gap: 12 },
  actionBtn: { borderRadius: 8 },
  deactivateBtn: { borderColor: '#F59E0B' },
  activateBtn: { borderColor: '#16A34A' },
  deleteBtn: { borderColor: theme.colors.error, borderRadius: 8 },
});