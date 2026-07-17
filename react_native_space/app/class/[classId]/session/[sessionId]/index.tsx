import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '@/src/theme';
import { useSessionsControllerFindOne, useAttendanceControllerBulkSave, useFeedbackControllerCreate } from '@/src/api/generated/api';
import { useAuth } from '@/src/context/AuthContext';
import Avatar from '@/src/components/Avatar';
import LoadingScreen from '@/src/components/LoadingScreen';
import { getErrorMessage } from '@/src/api/customFetch';

type AttStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
type TAttStatus = 'PRESENT' | 'ABSENT';

export default function SessionDetailScreen() {
  const { sessionId = '', classId = '' } = useLocalSearchParams<{ sessionId: string; classId: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const { data, isLoading, refetch } = useSessionsControllerFindOne(sessionId, { query: { enabled: !!sessionId } });
  const bulkSave = useAttendanceControllerBulkSave();
  const createFeedback = useFeedbackControllerCreate();

  const [studentAtt, setStudentAtt] = useState<Record<string, AttStatus>>({});
  const [teacherAtt, setTeacherAtt] = useState<Record<string, TAttStatus>>({});
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackError, setFeedbackError] = useState('');
  const [saving, setSaving] = useState(false);
  const [attError, setAttError] = useState('');
  const [attSuccess, setAttSuccess] = useState('');

  useFocusEffect(useCallback(() => {
    if (sessionId) refetch();
  }, [sessionId]));

  // Initialize attendance from server data
  React.useEffect(() => {
    if (data) {
      const sAtt: Record<string, AttStatus> = {};
      for (const s of data?.students ?? []) {
        if (s?.attendanceStatus) sAtt[s.id] = s.attendanceStatus as AttStatus;
      }
      setStudentAtt(sAtt);
      const tAtt: Record<string, TAttStatus> = {};
      for (const t of data?.teacherAttendance ?? []) {
        if (t?.status) tAtt[t.teacherId] = t.status as TAttStatus;
      }
      setTeacherAtt(tAtt);
    }
  }, [data]);

  const toggleStudentAtt = (id: string, status: AttStatus) => {
    setStudentAtt((prev) => ({ ...prev, [id]: status }));
  };

  const handleSaveAttendance = async () => {
    setSaving(true);
    setAttError('');
    setAttSuccess('');
    try {
      const studentAttendance = Object.entries(studentAtt).map(([studentId, status]) => ({ studentId, status }));
      const teacherAttendance = Object.entries(teacherAtt).map(([teacherId, status]) => ({ teacherId, status }));
      await bulkSave.mutateAsync({ data: { sessionId, studentAttendance, teacherAttendance } });
      setAttSuccess('Attendance saved');
      refetch();
    } catch (e) {
      setAttError(getErrorMessage(e, 'Failed to save'));
    } finally {
      setSaving(false);
    }
  };

  const handleAddFeedback = async () => {
    if (!feedbackText.trim()) return;
    setFeedbackError('');
    try {
      await createFeedback.mutateAsync({ data: { classSessionId: sessionId, content: feedbackText.trim(), type: 'GENERAL' } });
      setFeedbackText('');
      refetch();
    } catch (e) {
      setFeedbackError(getErrorMessage(e, 'Failed to add feedback'));
    }
  };

  if (isLoading || !data) return <LoadingScreen />;

  const attButtons: { status: AttStatus; icon: string; color: string }[] = [
    { status: 'PRESENT', icon: 'checkmark', color: Colors.present },
    { status: 'ABSENT', icon: 'close', color: Colors.absent },
    { status: 'LATE', icon: 'time', color: Colors.late },
    { status: 'EXCUSED', icon: 'document', color: Colors.excused },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color={Colors.textPrimary} /></Pressable>
        <Text style={styles.topTitle}>{data?.className ?? ''}</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.dateText}>{data?.date ? new Date(data.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''}</Text>

        {/* Student Attendance */}
        <Text style={styles.sectionTitle}>Student Attendance</Text>
        {(data?.students ?? []).map((s) => (
          <View key={s?.id} style={styles.attRow}>
            <Avatar uri={s?.photoUrl} name={s?.name} size={36} />
            <Text style={styles.attName} numberOfLines={1}>{s?.name ?? ''}</Text>
            <View style={styles.attButtons}>
              {attButtons.map((btn) => (
                <Pressable
                  key={btn.status}
                  style={[styles.attBtn, studentAtt[s?.id ?? ''] === btn.status && { backgroundColor: btn.color }]}
                  onPress={() => toggleStudentAtt(s?.id ?? '', btn.status)}
                >
                  <Ionicons name={btn.icon as any} size={16} color={studentAtt[s?.id ?? ''] === btn.status ? '#fff' : btn.color} />
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        {/* Teacher Attendance (admin only) */}
        {isAdmin && (data?.teacherAttendance?.length ?? 0) > 0 ? (
          <>
            <Text style={styles.sectionTitle}>Teacher Attendance</Text>
            {(data?.teacherAttendance ?? []).map((t) => (
              <View key={t?.teacherId} style={styles.attRow}>
                <Ionicons name="person" size={20} color={Colors.secondary} />
                <Text style={styles.attName}>{t?.teacherName ?? ''}</Text>
                <View style={styles.attButtons}>
                  <Pressable
                    style={[styles.attBtn, teacherAtt[t?.teacherId ?? ''] === 'PRESENT' && { backgroundColor: Colors.present }]}
                    onPress={() => setTeacherAtt((prev) => ({ ...prev, [t?.teacherId ?? '']: 'PRESENT' }))}
                  >
                    <Ionicons name="checkmark" size={16} color={teacherAtt[t?.teacherId ?? ''] === 'PRESENT' ? '#fff' : Colors.present} />
                  </Pressable>
                  <Pressable
                    style={[styles.attBtn, teacherAtt[t?.teacherId ?? ''] === 'ABSENT' && { backgroundColor: Colors.absent }]}
                    onPress={() => setTeacherAtt((prev) => ({ ...prev, [t?.teacherId ?? '']: 'ABSENT' }))}
                  >
                    <Ionicons name="close" size={16} color={teacherAtt[t?.teacherId ?? ''] === 'ABSENT' ? '#fff' : Colors.absent} />
                  </Pressable>
                </View>
              </View>
            ))}
          </>
        ) : null}

        <Pressable style={styles.saveBtn} onPress={handleSaveAttendance} disabled={saving}>
          {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveBtnText}>Save Attendance</Text>}
        </Pressable>
        {!!attError && <Text style={styles.errorText}>{attError}</Text>}
        {!!attSuccess && <Text style={styles.successText}>{attSuccess}</Text>}

        {/* Feedback */}
        <Text style={styles.sectionTitle}>Feedback</Text>
        <View style={styles.feedbackInput}>
          <TextInput
            style={styles.feedbackTextInput}
            placeholder="Add a class note..."
            placeholderTextColor={Colors.textSecondary + '80'}
            value={feedbackText}
            onChangeText={setFeedbackText}
            multiline
          />
          <Pressable onPress={handleAddFeedback} disabled={!feedbackText.trim()}>
            <Ionicons name="send" size={22} color={feedbackText.trim() ? Colors.primary : Colors.textSecondary} />
          </Pressable>
        </View>
        {!!feedbackError && <Text style={styles.errorText}>{feedbackError}</Text>}
        {(data?.feedback ?? []).map((f) => (
          <View key={f?.id} style={styles.feedbackCard}>
            <Text style={styles.feedbackTeacher}>{f?.teacherName ?? ''} - {f?.type ?? ''}</Text>
            {f?.studentName ? <Text style={styles.feedbackStudent}>Re: {f.studentName}</Text> : null}
            <Text style={styles.feedbackContent}>{f?.content ?? ''}</Text>
            <Text style={styles.feedbackDate}>{f?.createdAt ? new Date(f.createdAt).toLocaleDateString() : ''}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  topTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  content: { padding: Spacing.lg },
  dateText: { fontSize: 16, color: Colors.textSecondary, marginBottom: Spacing.lg },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginTop: Spacing.lg, marginBottom: Spacing.sm },
  attRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: BorderRadius.sm, padding: Spacing.md, marginBottom: 4, gap: Spacing.sm },
  attName: { flex: 1, fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  attButtons: { flexDirection: 'row', gap: 6 },
  attBtn: { width: 32, height: 32, borderRadius: 16, borderWidth: 1.5, borderColor: Colors.border, justifyContent: 'center', alignItems: 'center' },
  saveBtn: { backgroundColor: Colors.primary, borderRadius: BorderRadius.md, padding: Spacing.lg, alignItems: 'center', marginTop: Spacing.lg },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  errorText: { color: Colors.absent, fontSize: 13, marginTop: Spacing.sm, textAlign: 'center' },
  successText: { color: Colors.present, fontSize: 13, marginTop: Spacing.sm, textAlign: 'center' },
  feedbackInput: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: BorderRadius.md, padding: Spacing.md, gap: Spacing.sm, marginBottom: Spacing.md },
  feedbackTextInput: { flex: 1, fontSize: 15, color: Colors.textPrimary, maxHeight: 80 },
  feedbackCard: { backgroundColor: Colors.surface, borderRadius: BorderRadius.sm, padding: Spacing.md, marginBottom: Spacing.sm },
  feedbackTeacher: { fontSize: 13, fontWeight: '600', color: Colors.secondary },
  feedbackStudent: { fontSize: 12, color: Colors.accent, marginTop: 2 },
  feedbackContent: { fontSize: 14, color: Colors.textPrimary, marginTop: Spacing.xs },
  feedbackDate: { fontSize: 11, color: Colors.textSecondary, marginTop: Spacing.xs },
});
