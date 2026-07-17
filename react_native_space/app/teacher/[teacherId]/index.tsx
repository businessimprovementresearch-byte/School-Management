import React from 'react';
import { View, ScrollView, StyleSheet, Pressable, Alert, Platform } from 'react-native';
import { Text, ActivityIndicator, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTeachersControllerFindOne, useTeachersControllerRemove } from '@/src/api/generated/api';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/src/theme';
import Avatar from '@/src/components/Avatar';
import { useAuth } from '@/src/context/AuthContext';

export default function TeacherDetailScreen() {
  const router = useRouter();
  const { teacherId = '' } = useLocalSearchParams<{ teacherId: string }>();
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const { data, isLoading, refetch } = useTeachersControllerFindOne(teacherId, { query: { enabled: !!teacherId } });
  const deleteMutation = useTeachersControllerRemove();

  useFocusEffect(React.useCallback(() => { if (teacherId) refetch(); }, [teacherId]));

  const handleDelete = () => {
    const doDelete = () => {
      deleteMutation.mutate({ id: teacherId }, {
        onSuccess: () => router.back(),
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
          <Text style={styles.name}>{data?.name ?? ''}</Text>
          <Text style={styles.sub}>Age: {data?.age ?? '-'} • {data?.contactNumber ?? ''}</Text>
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
                <Text style={styles.classGrade}>{c?.grade ?? ''}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={theme.colors.textSecondary} />
            </Pressable>
          ))}
        </View>

        {isAdmin && (
          <Button mode="outlined" textColor={theme.colors.error} style={styles.deleteBtn} onPress={handleDelete} loading={deleteMutation?.isPending}>
            Remove Teacher
          </Button>
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
  name: { fontSize: 22, fontWeight: '700', color: theme.colors.text, marginTop: 12 },
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
  deleteBtn: { marginHorizontal: 16, marginTop: 24, borderColor: theme.colors.error },
});
