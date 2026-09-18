import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, RefreshControl, Alert, Platform, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '@/src/theme';
import {
  useStudentsControllerFindOne,
  useStudentsControllerUpdate,
  useStudentsControllerRemove,
  useAcademicYearsControllerFindAll,
  useStudentsControllerAddEnrollment,
  useStudentsControllerUpdateEnrollment,
  useStudentsControllerDeleteEnrollment,
  useClassesControllerFindAll,
  useAwardsControllerFindIssuances,
} from '@/src/api/generated/api';
import { useAuth } from '@/src/context/AuthContext';
import Avatar from '@/src/components/Avatar';
import StatusChip from '@/src/components/StatusChip';
import LoadingScreen from '@/src/components/LoadingScreen';
import { getErrorMessage } from '@/src/api/customFetch';

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

  const updateStudentMutation = useStudentsControllerUpdate();
  const addEnrollmentMutation = useStudentsControllerAddEnrollment();
  const updateEnrollmentMutation = useStudentsControllerUpdateEnrollment();
  const deleteEnrollmentMutation = useStudentsControllerDeleteEnrollment();
  const deleteMutation = useStudentsControllerRemove();

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('classes');

  const [pickerOpen, setPickerOpen] = useState(false);
  const [editingEnrollmentId, setEditingEnrollmentId] = useState<string | null>(null);
  const [pickerYearId, setPickerYearId] = useState<string | undefined>(undefined);
  const { data: allClasses } = useClassesControllerFindAll({ query: { enabled: pickerOpen } });
  const { data: awardIssuances } = useAwardsControllerFindIssuances(
    { studentId },
    { query: { enabled: !!studentId } },
  );

  useFocusEffect(useCallback(() => { if (studentId) refetch(); }, [studentId]));

  const onRefresh = async () => { setRefreshing(true); await refetch(); setRefreshing(false); };

  const isEnrolledThisYear = !activeYear || (data?.enrollments ?? []).some((e) => e?.academicYearId === activeYear.id);
  const mostRecentClassId = data?.enrollments?.[0]?.classId;

  const currentYearEnrollments = (data?.enrollments ?? []).filter(
    (e) => !activeYear || e?.academicYearId === activeYear.id,
  );

  const getEnrollmentDisplayStatus = (e?: { status?: string; academicYearId?: string }) => {
    if (!e) return 'ACTIVE';
    if (e.status && e.status !== 'ACTIVE') return e.status;
    if (!activeYear) return e.status ?? 'ACTIVE';
    return e.academicYearId === activeYear.id ? 'ACTIVE' : 'COMPLETED';
  };

  const handleToggleStatus = async () => {
    const isCurrentlyActive = data?.isActive ?? true;
    const newStatus = !isCurrentlyActive;
    const actionText = newStatus ? 'Activate' : 'Deactivate';

    const confirmed = await confirmAsync(
      `${actionText} Student`,
      `Are you sure you want to ${actionText.toLowerCase()} "${data?.name ?? 'this student'}"?`
    );
    if (!confirmed) return;

    updateStudentMutation.mutate(
      { id: studentId, data: { isActive: newStatus } },
      {
        onSuccess: () => {
          refetch();
          notify('Success', `Student successfully marked as ${newStatus ? 'Active' : 'Inactive'}.`);
        },
        onError: (e) => notify('Error', getErrorMessage(e, `Failed to ${actionText.toLowerCase()} student`)),
      }
    );
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

  const tabs = ['classes', 'attendance', 'progress', 'feedback'];
  const isActive = data?.isActive ?? true;

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
        {/* Hero Header */}
        <View style={styles.hero}>
          <Avatar uri={data?.photoUrl} name={data?.name} size={80} />
          
          <View style={styles.nameRow}>
            <Text style={styles.name}>{data?.name ?? ''}</Text>
            <View style={[styles.statusBadge, isActive ? styles.activeBadge : styles.inactiveBadge]}>
              <Text style={[styles.statusBadgeText, isActive ? styles.activeBadgeText : styles.inactiveBadgeText]}>
                {isActive ? 'ACTIVE' : 'INACTIVE'}
              </Text>
            </View>
          </View>

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

        {/* Notes / Remarks */}
        {!!data?.remarks && (
          <View style={styles.notesCard}>
            <View style={styles.notesHeader}>
              <Ionicons name="document-text-outline" size={16} color={Colors.textSecondary} />
              <Text style={styles.notesTitle}>Notes</Text>
            </View>
            <Text style={styles.notesText}>{data.remarks}</Text>
          </View>
        )}

        {/* Classes Tab */}
        {activeTab === 'classes' && (
          <View>
            {currentYearEnrollments.map((e) => (
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
            {currentYearEnrollments.length === 0 && <Text style={styles.emptyText}>No enrollments</Text>}

            {isAdmin && activeYear && (
              <Pressable
                style={styles.addYearChip}
                onPress={() => openAddYearPicker(activeYear.id)}
              >
                <Ionicons name="add" size={14} color={Colors.primary} />
                <Text style={styles.addYearChipText}>+ Add Another Class ({activeYear.name})</Text>
              </Pressable>
            )}

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

        {/* Class Picker Modal */}
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

        {/* Attendance Tab */}
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

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <View>
            <Text style={styles.sectionTitle}>Awards</Text>
            {(awardIssuances ?? []).map((a) => (
              <View key={a?.id} style={styles.card}>
                <View style={styles.iconBox}>
                  <Ionicons name="ribbon" size={20} color={Colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{a?.awardName ?? ''}</Text>
                  <Text style={styles.cardSub}>
                    {a?.issuedAt ? new Date(a.issuedAt).toLocaleDateString() : ''}
                    {a?.note ? ` • ${a.note}` : ''}
                  </Text>
                </View>
              </View>
            ))}
            {(awardIssuances?.length ?? 0) === 0 && <Text style={styles.emptyText}>No awards yet</Text>}

            <Pressable style={styles.reportButton} onPress={() => router.push(`/student/${studentId}/progress`)}>
              <Ionicons name="trending-up" size={20} color={Colors.secondary} />
              <Text style={styles.reportButtonText}>View Progress</Text>
            </Pressable>
          </View>
        )}

        {/* Feedback Tab */}
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

        {/* Report Cards Button */}
        <Pressable style={styles.reportButton} onPress={() => router.push(`/student/${studentId}/report-cards`)}>
          <Ionicons name="document-text" size={20} color={Colors.secondary} />
          <Text style={styles.reportButtonText}>View Report Cards</Text>
        </Pressable>

        {/* Toggle Status Active / Inactive Button */}
        {isAdmin && (
          <Pressable
            style={[styles.statusToggleBtn, isActive ? styles.deactivateBtn : styles.activateBtn]}
            onPress={handleToggleStatus}
            disabled={updateStudentMutation.isPending}
          >
            <Ionicons
              name={isActive ? 'pause-circle-outline' : 'checkmark-circle-outline'}
              size={18}
              color={isActive ? '#D97706' : '#16A34A'}
            />
            <Text style={[styles.statusToggleText, isActive ? styles.deactivateText : styles.activateText]}>
              {updateStudentMutation.isPending
                ? 'Updating...'
                : isActive
                ? 'Deactivate Student'
                : 'Activate Student'}
            </Text>
          </Pressable>
        )}

        {/* Delete Student Button */}
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
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginTop: Spacing.md },
  name: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: BorderRadius.full },
  activeBadge: { backgroundColor: '#DCFCE7' },
  inactiveBadge: { backgroundColor: '#FEE2E2' },
  statusBadgeText: { fontSize: 11, fontWeight: '700' },
  activeBadgeText: { color: '#15803D' },
  inactiveBadgeText: { color: '#B91C1C' },
  nickname: { fontSize: 15, fontStyle: 'italic', color: Colors.textSecondary, marginTop: 2 },
  info: { fontSize: 14, color: Colors.textSecondary, marginTop: 2 },
  tabRow: { marginBottom: Spacing.lg, maxHeight: 40 },
  tab: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm, marginRight: Spacing.sm, borderRadius: BorderRadius.full, backgroundColor: Colors.surface },
  tabActive: { backgroundColor: Colors.primary },
  tabText: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary },
  tabTextActive: { color: '#fff' },
  notesCard: { backgroundColor: Colors.surface, borderRadius: BorderRadius.md, padding: Spacing.lg, marginBottom: Spacing.lg },
  notesHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: Spacing.xs },
  notesTitle: { fontSize: 13, fontWeight: '700', color: Colors.textSecondary, textTransform: 'uppercase' },
  notesText: { fontSize: 14, color: Colors.textPrimary, lineHeight: 20 },
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md, padding: Spacing.lg, marginBottom: Spacing.sm,
  },
  iconBox: { width: 40, height: 40, borderRadius: BorderRadius.md, backgroundColor: Colors.primary + '14', alignItems: 'center', justifyContent: 'center', marginRight: Spacing.sm },
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
  statusToggleBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    borderRadius: BorderRadius.md, padding: Spacing.lg, marginTop: Spacing.md, gap: Spacing.sm,
    borderWidth: 1,
  },
  deactivateBtn: { borderColor: '#F59E0B', backgroundColor: '#FEF3C7' + '40' },
  activateBtn: { borderColor: '#16A34A', backgroundColor: '#DCFCE7' + '40' },
  statusToggleText: { fontSize: 16, fontWeight: '600' },
  deactivateText: { color: '#D97706' },
  activateText: { color: '#16A34A' },
  deleteButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.error, borderRadius: BorderRadius.md, padding: Spacing.lg, marginTop: Spacing.sm, gap: Spacing.sm },
  deleteButtonText: { fontSize: 16, fontWeight: '600', color: Colors.error },
  cardIconBtn: { padding: 6, marginLeft: 4 },
  addYearSection: { marginTop: Spacing.md, backgroundColor: Colors.surface, borderRadius: BorderRadius.md, padding: Spacing.md },
  addYearLabel: { fontSize: 13, color: Colors.textSecondary, marginBottom: Spacing.sm },
  addYearChip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.primary + '14', borderRadius: BorderRadius.full, paddingHorizontal: Spacing.md, paddingVertical: 6, marginRight: Spacing.sm, marginTop: Spacing.xs },
  addYearChipText: { fontSize: 13, fontWeight: '600', color: Colors.primary },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalCard: { backgroundColor: Colors.background, borderTopLeftRadius: BorderRadius.lg, borderTopRightRadius: BorderRadius.lg, padding: Spacing.lg, maxHeight: '70%' },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.md },
  modalTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  pickerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.divider },
  pickerName: { fontSize: 15, color: Colors.textPrimary, fontWeight: '600' },
  pickerSub: { fontSize: 13, color: Colors.textSecondary },
});