import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, RefreshControl, Alert, Platform, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '@/src/theme';
import {
  useStudentsControllerFindOne,
  useStudentsControllerRemove,
  useAcademicYearsControllerFindAll,
  useStudentsControllerAddEnrollment,
  useStudentsControllerUpdateEnrollment,
  useStudentsControllerDeleteEnrollment,
  useClassesControllerFindAll,
} from '@/src/api/generated/api';
import { useAuth } from '@/src/context/AuthContext';
import Avatar from '@/src/components/Avatar';
import StatusChip from '@/src/components/StatusChip';
import LoadingScreen from '@/src/components/LoadingScreen';
import { getErrorMessage } from '@/src/api/customFetch';

// Alert.alert() is a no-op on react-native-web; window.confirm/alert are
// the fallback so confirmations/errors actually show up on web.
// THIS WAS MISSING before — calls to confirmAsync/notify had nothing to
// call, which is what broke the class-move / delete flows.
const confirmAsync = (title: string, message: string): Promise<boolean> => {
  if (Platform.OS === 'web') return Promise.resolve(window.confirm(`${title}\n\n${message}`));
  return new Promise((resolve) => {
    Alert.alert(title, message, [
      { text: 'Cancel', style: 'cancel', onPress: () => resolve(false) },
      { text: 'Confirm', style: 'destructive', onPress: () => resolve(true) },
    ]);
  });
};
const notify = (title: string, message: string) => {
  if (Platform.OS === 'web') window.alert(`${title}\n\n${message}`);
  else Alert.alert(title, message);
};

export default function StudentDetailScreen() {
  const { studentId = '' } = useLocalSearchParams<{ studentId: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const { data, isLoading, refetch } = useStudentsControllerFindOne(studentId, { query: { enabled: !!studentId } });
  const { data: academicYears } = useAcademicYearsControllerFindAll();
  const activeYear = academicYears?.find((y) => y?.isActive);

  const addEnrollmentMutation = useStudentsControllerAddEnrollment();
  const updateEnrollmentMutation = useStudentsControllerUpdateEnrollment();
  const deleteEnrollmentMutation = useStudentsControllerDeleteEnrollment();
  const deleteMutation = useStudentsControllerRemove();

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('classes');

  // Class picker modal: either moving an existing enrollment to a
  // different class (editingEnrollmentId set), or adding a brand new
  // enrollment for a chosen academic year (editingEnrollmentId null,
  // pickerYearId set) — e.g. backfilling last year's class.
  const [pickerOpen, setPickerOpen] = useState(false);
  const [editingEnrollmentId, setEditingEnrollmentId] = useState<string | null>(null);
  const [pickerYearId, setPickerYearId] = useState<string | undefined>(undefined);
  const { data: allClasses } = useClassesControllerFindAll({ query: { enabled: pickerOpen } });

  useFocusEffect(useCallback(() => { if (studentId) refetch(); }, [studentId]));

  const onRefresh = async () => { setRefreshing(true); await refetch(); setRefreshing(false); };

  // "Archived" for the active year = no enrollment row exists yet for that
  // year. Re-enrolling just means adding one, into whichever class they
  // were last in (admin can move them to a different class afterwards via
  // the swap icon on that enrollment).
  const isEnrolledThisYear = !activeYear || (data?.enrollments ?? []).some((e) => e?.academicYearId === activeYear.id);
  const mostRecentClassId = data?.enrollments?.[0]?.classId;

  // Backend stamps every enrollment row "ACTIVE" the moment it's created and
  // never flips it when a new academic year starts — so a 2025-2026 row still
  // reads "ACTIVE" even after 2026-2027 has begun. Only trust the raw status
  // when it's something other than ACTIVE (WITHDRAWN/GRADUATED/etc. are real
  // signals); otherwise derive it from whether the enrollment belongs to the
  // currently-active academic year.
  const getEnrollmentDisplayStatus = (e?: { status?: string; academicYearId?: string }) => {
    if (!e) return 'ACTIVE';
    if (e.status && e.status !== 'ACTIVE') return e.status;
    if (!activeYear) return e.status ?? 'ACTIVE';
    return e.academicYearId === activeYear.id ? 'ACTIVE' : 'COMPLETED';
  };

  const handleReEnroll = () => {
    if (!activeYear || !mostRecentClassId) return;
    addEnrollmentMutation.mutate(
      { studentId, data: { classId: mostRecentClassId, academicYearId: activeYear.id } },
      {
        onSuccess: () => { notify('Enrolled', `${data?.name} is now enrolled for ${activeYear.name}.`); refetch(); },
        onError: (e) => notify('Error', getErrorMessage(e, 'Failed to enroll')),
      },
    );
  };

  const openMoveClassPicker = (enrollmentId: string) => {
    setEditingEnrollmentId(enrollmentId);
    setPickerYearId(undefined);
    setPickerOpen(true);
  };

  const openAddYearPicker = (academicYearId: string) => {
    setEditingEnrollmentId(null);
    setPickerYearId(academicYearId);
    setPickerOpen(true);
  };

  const handlePickClass = (classId: string) => {
    if (editingEnrollmentId) {
      updateEnrollmentMutation.mutate(
        { id: editingEnrollmentId, data: { classId } },
        {
          onSuccess: () => { setPickerOpen(false); refetch(); },
          onError: (e) => notify('Error', getErrorMessage(e, 'Failed to move class')),
        },
      );
    } else if (pickerYearId) {
      addEnrollmentMutation.mutate(
        { studentId, data: { classId, academicYearId: pickerYearId } },
        {
          onSuccess: () => { setPickerOpen(false); refetch(); },
          onError: (e) => notify('Error', getErrorMessage(e, 'Failed to add class history')),
        },
      );
    }
  };

  const handleDeleteEnrollment = async (enrollmentId: string, label: string) => {
    const confirmed = await confirmAsync('Remove Enrollment', `Remove "${label}" from this student's history? This cannot be undone.`);
    if (!confirmed) return;
    deleteEnrollmentMutation.mutate(
      { id: enrollmentId },
      { onSuccess: () => refetch(), onError: (e) => notify('Error', getErrorMessage(e, 'Failed to remove enrollment')) },
    );
  };

  // Years the student doesn't have any enrollment record for yet — offered
  // in "Backfill" so admins can fill in history for years that were never
  // entered.
  const enrolledYearIds = new Set((data?.enrollments ?? []).map((e) => e?.academicYearId));
  const missingYears = (academicYears ?? []).filter((y) => y?.id && !enrolledYearIds.has(y.id));

  const handleDelete = async () => {
    const confirmed = await confirmAsync(
      'Delete Student',
      `Remove ${data?.name ?? 'this student'} permanently? This cannot be undone.`,
    );
    if (!confirmed) return;
    deleteMutation.mutate(
      { id: studentId },
      {
        onSuccess: () => router.back(),
        onError: (e) => notify('Error', getErrorMessage(e, 'Failed to delete student')),
      },
    );
  };

  if (isLoading || !data) return <LoadingScreen />;

  // "history" tab removed — the enrollment list in "Classes" already
  // shows academic year + class per row, so a separate history tab
  // was redundant.
  const tabs = ['classes', 'attendance', 'progress', 'feedback'];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <Text style={styles.topTitle}>Student</Text>
        {isAdmin ? (
          <Pressable onPress={() => router.push(`/student/${studentId}/edit`)}>
            <Ionicons name="pencil" size={22} color={Colors.primary} />
          </Pressable>
        ) : <View style={{ width: 24 }} />}
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <Avatar uri={data?.photoUrl} name={data?.name} size={80} />
          <Text style={styles.name}>{data?.name ?? ''}</Text>
          {!!data?.nickname && <Text style={styles.nickname}>"{data.nickname}"</Text>}
          <Text style={styles.info}>Age: {data?.age ?? ''} | Parent: {data?.parentName ?? ''}</Text>
          <Text style={styles.info}>{data?.contactNumber ?? ''}</Text>
          {!isEnrolledThisYear && (
            <View style={styles.archiveBanner}>
              <Ionicons name="archive-outline" size={16} color={Colors.warning} />
              <Text style={styles.archiveBannerText}>Not enrolled for {activeYear?.name} (on leave/archived)</Text>
              {isAdmin && (
                <Pressable style={styles.reEnrollBtn} onPress={handleReEnroll} disabled={addEnrollmentMutation.isPending || !mostRecentClassId}>
                  <Text style={styles.reEnrollBtnText}>{addEnrollmentMutation.isPending ? 'Enrolling...' : `Enroll to ${activeYear?.name}`}</Text>
                </Pressable>
              )}
            </View>
          )}
        </View>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabRow}>
          {tabs.map((t) => (
            <Pressable key={t} style={[styles.tab, activeTab === t && styles.tabActive]} onPress={() => setActiveTab(t)}>
              <Text style={[styles.tabText, activeTab === t && styles.tabTextActive]}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {activeTab === 'classes' && (
          <View>
            {(data?.enrollments ?? []).map((e) => (
              <View key={e?.id} style={styles.card}>
                <Pressable style={{ flex: 1 }} onPress={() => router.push(`/class/${e?.classId}`)}>
                  <Text style={styles.cardTitle}>{e?.className ?? ''}</Text>
                  <Text style={styles.cardSub}>{e?.academicYearName ?? ''} | Grade {e?.classGrade ?? ''} | Enrolled {e?.enrollmentDate ? new Date(e.enrollmentDate).toLocaleDateString() : ''}</Text>
                </Pressable>
                <StatusChip status={getEnrollmentDisplayStatus(e)} small />
                {isAdmin && (
                  <>
                    <Pressable style={styles.cardIconBtn} onPress={() => e?.id && openMoveClassPicker(e.id)}>
                      <Ionicons name="swap-horizontal" size={18} color={Colors.secondary} />
                    </Pressable>
                    <Pressable style={styles.cardIconBtn} onPress={() => e?.id && handleDeleteEnrollment(e.id, `${e?.className ?? ''} (${e?.academicYearName ?? ''})`)}>
                      <Ionicons name="trash-outline" size={18} color={Colors.error} />
                    </Pressable>
                  </>
                )}
              </View>
            ))}
            {(data?.enrollments?.length ?? 0) === 0 && <Text style={styles.emptyText}>No enrollments</Text>}

            {isAdmin && missingYears.length > 0 && (
              <View style={styles.addYearSection}>
                <Text style={styles.addYearLabel}>Backfill a class for a past/missing year:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {missingYears.map((y) => (
                    <Pressable key={y?.id} style={styles.addYearChip} onPress={() => y?.id && openAddYearPicker(y.id)}>
                      <Ionicons name="add" size={14} color={Colors.primary} />
                      <Text style={styles.addYearChipText}>{y?.name ?? ''}</Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        )}

        <Modal visible={pickerOpen} transparent animationType="slide" onRequestClose={() => setPickerOpen(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{editingEnrollmentId ? 'Move to Class' : 'Add Class for Year'}</Text>
                <Pressable onPress={() => setPickerOpen(false)}><Ionicons name="close" size={24} color={Colors.textPrimary} /></Pressable>
              </View>
              <ScrollView style={{ maxHeight: 400 }}>
                {(allClasses ?? []).map((c) => (
                  <Pressable
                    key={c?.id}
                    style={styles.pickerRow}
                    onPress={() => c?.id && handlePickClass(c.id)}
                    disabled={updateEnrollmentMutation.isPending || addEnrollmentMutation.isPending}
                  >
                    <Text style={styles.pickerName}>{c?.name ?? ''}</Text>
                    <Text style={styles.pickerSub}>Grade {c?.grade ?? ''}</Text>
                  </Pressable>
                ))}
                {(allClasses?.length ?? 0) === 0 && <Text style={[styles.emptyText, { paddingVertical: Spacing.lg }]}>No classes found</Text>}
              </ScrollView>
            </View>
          </View>
        </Modal>

        {activeTab === 'attendance' && (
          <View>
            <View style={styles.attendanceSummary}>
              <View style={styles.attItem}><Text style={styles.attValue}>{data?.attendanceSummary?.percentage ?? 0}%</Text><Text style={styles.attLabel}>Overall</Text></View>
              <View style={styles.attItem}><Text style={[styles.attValue, { color: Colors.success }]}>{data?.attendanceSummary?.present ?? 0}</Text><Text style={styles.attLabel}>Present</Text></View>
              <View style={styles.attItem}><Text style={[styles.attValue, { color: Colors.error }]}>{data?.attendanceSummary?.absent ?? 0}</Text><Text style={styles.attLabel}>Absent</Text></View>
              <View style={styles.attItem}><Text style={[styles.attValue, { color: Colors.warning }]}>{data?.attendanceSummary?.late ?? 0}</Text><Text style={styles.attLabel}>Late</Text></View>
            </View>
            <Text style={styles.sectionTitle}>Recent</Text>
            {(data?.recentAttendance ?? []).map((a, i) => (
              <View key={i} style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{a?.className ?? ''}</Text>
                  <Text style={styles.cardSub}>{a?.date ? new Date(a.date).toLocaleDateString() : ''}</Text>
                </View>
                <StatusChip status={a?.status ?? ''} small />
              </View>
            ))}
          </View>
        )}

        {/* Progress: full year-by-year / class-by-class breakdown lives on
            its own screen (auto-grouped server-side) — no manual class
            picking needed there anymore. */}
        {activeTab === 'progress' && (
          <View>
            <Pressable style={styles.reportButton} onPress={() => router.push(`/student/${studentId}/progress`)}>
              <Ionicons name="trending-up" size={20} color={Colors.secondary} />
              <Text style={styles.reportButtonText}>View Progress</Text>
            </Pressable>
          </View>
        )}

        {activeTab === 'feedback' && (
          <View>
            {(data?.feedback ?? []).map((f) => (
              <View key={f?.id} style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{f?.className ?? ''}</Text>
                  <Text style={styles.cardSub}>{f?.teacherName ?? ''} | {f?.date ? new Date(f.date).toLocaleDateString() : ''}</Text>
                  <Text style={styles.feedbackContent}>{f?.content ?? ''}</Text>
                </View>
              </View>
            ))}
            {(data?.feedback?.length ?? 0) === 0 && <Text style={styles.emptyText}>No feedback</Text>}
          </View>
        )}

        {/* Report cards button */}
        <Pressable style={styles.reportButton} onPress={() => router.push(`/student/${studentId}/report-cards`)}>
          <Ionicons name="document-text" size={20} color={Colors.secondary} />
          <Text style={styles.reportButtonText}>View Report Cards</Text>
        </Pressable>

        {isAdmin && (
          <Pressable style={styles.deleteButton} onPress={handleDelete} disabled={deleteMutation.isPending}>
            <Ionicons name="trash-outline" size={18} color={Colors.error} />
            <Text style={styles.deleteButtonText}>{deleteMutation.isPending ? 'Deleting...' : 'Delete Student'}</Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  topTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  content: { padding: Spacing.lg },
  hero: { alignItems: 'center', marginBottom: Spacing.xl },
  name: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary, marginTop: Spacing.md },
  nickname: { fontSize: 15, fontStyle: 'italic', color: Colors.textSecondary, marginTop: 2 },
  info: { fontSize: 14, color: Colors.textSecondary, marginTop: 2 },
  tabRow: { marginBottom: Spacing.lg, maxHeight: 40 },
  tab: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm, marginRight: Spacing.sm, borderRadius: BorderRadius.full, backgroundColor: Colors.surface },
  tabActive: { backgroundColor: Colors.primary },
  tabText: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary },
  tabTextActive: { color: '#fff' },
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md, padding: Spacing.lg, marginBottom: Spacing.sm,
  },
  cardTitle: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary },
  cardSub: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginVertical: Spacing.sm },
  attendanceSummary: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.lg, marginBottom: Spacing.lg },
  attItem: { alignItems: 'center' },
  attValue: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary },
  attLabel: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  feedbackContent: { fontSize: 14, color: Colors.textPrimary, marginTop: Spacing.sm, fontStyle: 'italic' },
  emptyText: { textAlign: 'center', color: Colors.textSecondary, marginVertical: Spacing.xl },
  reportButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.secondary + '12', borderRadius: BorderRadius.md,
    padding: Spacing.lg, marginTop: Spacing.xl, gap: Spacing.sm,
  },
  reportButtonText: { fontSize: 16, fontWeight: '600', color: Colors.secondary },
  archiveBanner: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.warning + '14', borderRadius: BorderRadius.md, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, marginTop: Spacing.md, flexWrap: 'wrap', justifyContent: 'center' },
  archiveBannerText: { fontSize: 12, color: Colors.warning, fontWeight: '600' },
  reEnrollBtn: { backgroundColor: Colors.warning, borderRadius: BorderRadius.full, paddingHorizontal: Spacing.md, paddingVertical: 4, marginLeft: 4 },
  reEnrollBtnText: { fontSize: 12, fontWeight: '700', color: '#fff' },
  deleteButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.error, borderRadius: BorderRadius.md, padding: Spacing.lg, marginTop: Spacing.md, gap: Spacing.sm },
  deleteButtonText: { fontSize: 16, fontWeight: '600', color: Colors.error },
  cardIconBtn: { padding: 6, marginLeft: 4 },
  addYearSection: { marginTop: Spacing.md, backgroundColor: Colors.surface, borderRadius: BorderRadius.md, padding: Spacing.md },
  addYearLabel: { fontSize: 13, color: Colors.textSecondary, marginBottom: Spacing.sm },
  addYearChip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.primary + '14', borderRadius: BorderRadius.full, paddingHorizontal: Spacing.md, paddingVertical: 6, marginRight: Spacing.sm },
  addYearChipText: { fontSize: 13, fontWeight: '600', color: Colors.primary },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalCard: { backgroundColor: Colors.background, borderTopLeftRadius: BorderRadius.lg, borderTopRightRadius: BorderRadius.lg, padding: Spacing.lg, maxHeight: '70%' },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.md },
  modalTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  pickerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.divider },
  pickerName: { fontSize: 15, color: Colors.textPrimary, fontWeight: '600' },
  pickerSub: { fontSize: 13, color: Colors.textSecondary },
});