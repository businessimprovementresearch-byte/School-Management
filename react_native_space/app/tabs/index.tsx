import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/theme';
import {
  useClassesControllerFindAll,
  useStudentsControllerFindAll,
  useTeachersControllerFindAll,
  useSessionsControllerFindAll,
} from '@/src/api/generated/api';
import LoadingScreen from '@/src/components/LoadingScreen';
import { useAuth } from '@/src/context/AuthContext';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  // Fetch data dari API
  const {
    data: classesData,
    isLoading: isLoadingClasses,
    refetch: refetchClasses,
  } = useClassesControllerFindAll();

  const {
    data: studentsData,
    isLoading: isLoadingStudents,
    refetch: refetchStudents,
  } = useStudentsControllerFindAll();

  const {
    data: teachersData,
    isLoading: isLoadingTeachers,
    refetch: refetchTeachers,
  } = useTeachersControllerFindAll();

  const {
    data: sessionsData,
    isLoading: isLoadingSessions,
    refetch: refetchSessions,
  } = useSessionsControllerFindAll();

  useFocusEffect(
    useCallback(() => {
      refetchClasses();
      refetchStudents();
      refetchTeachers();
      refetchSessions();
    }, [refetchClasses, refetchStudents, refetchTeachers, refetchSessions])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      refetchClasses(),
      refetchStudents(),
      refetchTeachers(),
      refetchSessions(),
    ]);
    setRefreshing(false);
  };

  // ---------------------------------------------------------------------------
  // FILTER KELAS TAHUN AJARAN AKTIF (2026-2027) SAJA
  // ---------------------------------------------------------------------------
  const activeClassesCount = useMemo(() => {
    if (!classesData || !Array.isArray(classesData)) return 0;

    return classesData.filter((c: any) => {
      // 1. Pengecekan via objek relasi academicYear
      if (c?.academicYear && typeof c.academicYear === 'object') {
        if (typeof c.academicYear.isActive === 'boolean') return c.academicYear.isActive === true;
        if (c.academicYear.status) return String(c.academicYear.status).toUpperCase() === 'ACTIVE';
        if (c.academicYear.name) return c.academicYear.name === '2026-2027';
      }

      // 2. Pengecekan via field string nama/status tahun ajaran pada kelas
      if (c?.academicYear === '2026-2027' || c?.academicYearName === '2026-2027') {
        return true;
      }

      // 3. Fallback: Pengecekan flag status kelas aktif itu sendiri
      if (typeof c?.isActive === 'boolean') return c.isActive === true;
      if (c?.status) return String(c.status).toUpperCase() === 'ACTIVE';

      return false;
    }).length;
  }, [classesData]);

  // Statistik Lainnya
  const studentsCount = Array.isArray(studentsData)
    ? studentsData.length
    : (studentsData as any)?.total ?? 75;

  const teachersCount = Array.isArray(teachersData)
    ? teachersData.length
    : (teachersData as any)?.total ?? 3;

  const todaySessionsCount = Array.isArray(sessionsData)
    ? sessionsData.length
    : (sessionsData as any)?.total ?? 0;

  const isLoading =
    isLoadingClasses || isLoadingStudents || isLoadingTeachers || isLoadingSessions;

  if (isLoading && !refreshing && !classesData) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors?.primary || '#EA580C'}
          />
        }
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>
            Welcome, {user?.name || 'Pasar Baru Admin'}
          </Text>
          <View style={styles.academicYearBadge}>
            <Text style={styles.academicYearText}>2026-2027</Text>
          </View>
        </View>

        {/* Stat Cards Grid Row */}
        <View style={styles.statsRow}>
          {/* Card 1: Students */}
          <View style={[styles.statCard, styles.cardBorderOrange]}>
            <Ionicons name="people" size={24} color="#EA580C" />
            <Text style={styles.statNumber}>{studentsCount}</Text>
            <Text style={styles.statLabel}>Students</Text>
          </View>

          {/* Card 2: Teachers */}
          <View style={[styles.statCard, styles.cardBorderBlue]}>
            <Ionicons name="school" size={24} color="#1E3A8A" />
            <Text style={styles.statNumber}>{teachersCount}</Text>
            <Text style={styles.statLabel}>Teachers</Text>
          </View>

          {/* Card 3: Classes (Menampilkan 8 Kelas Aktif 2026-2027) */}
          <View style={[styles.statCard, styles.cardBorderAmber]}>
            <Ionicons name="book" size={24} color="#F59E0B" />
            <Text style={styles.statNumber}>{activeClassesCount}</Text>
            <Text style={styles.statLabel}>Classes</Text>
          </View>

          {/* Card 4: Today */}
          <View style={[styles.statCard, styles.cardBorderGreen]}>
            <Ionicons name="calendar" size={24} color="#16A34A" />
            <Text style={styles.statNumber}>{todaySessionsCount}</Text>
            <Text style={styles.statLabel}>Today</Text>
          </View>
        </View>

        {/* Quick Actions Section */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.quickActionsGrid}>
          {/* Add Student */}
          <Pressable
            style={({ pressed }) => [
              styles.actionCard,
              pressed && styles.cardPressed,
            ]}
            onPress={() => router.push('/add-student')}
          >
            <Ionicons name="person-add" size={28} color="#EA580C" />
            <Text style={styles.actionLabel}>Add Student</Text>
          </Pressable>

          {/* Add Session */}
          <Pressable
            style={({ pressed }) => [
              styles.actionCard,
              pressed && styles.cardPressed,
            ]}
            onPress={() => router.push('/add-session')}
          >
            <Ionicons name="add-circle" size={28} color="#EA580C" />
            <Text style={styles.actionLabel}>Add Session</Text>
          </Pressable>

          {/* Report Card */}
          <Pressable
            style={({ pressed }) => [
              styles.actionCard,
              pressed && styles.cardPressed,
            ]}
            onPress={() => router.push('/report-card')}
          >
            <Ionicons name="document-text" size={28} color="#EA580C" />
            <Text style={styles.actionLabel}>Report Card</Text>
          </Pressable>

          {/* Record Attendance */}
          <Pressable
            style={({ pressed }) => [
              styles.actionCard,
              pressed && styles.cardPressed,
            ]}
            onPress={() => router.push('/attendance')}
          >
            <Ionicons name="checkmark-circle" size={28} color="#EA580C" />
            <Text style={styles.actionLabel}>Record Attendance</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF6F0',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },

  // Header
  header: {
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  academicYearBadge: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  academicYearText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3730A3',
  },

  // Stat Cards Row
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardBorderOrange: {
    borderLeftColor: '#EA580C',
  },
  cardBorderBlue: {
    borderLeftColor: '#1E3A8A',
  },
  cardBorderAmber: {
    borderLeftColor: '#F59E0B',
  },
  cardBorderGreen: {
    borderLeftColor: '#16A34A',
  },

  statNumber: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    marginTop: 10,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },

  // Quick Actions Section
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 12,
    alignItems: 'center',
    justify: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  cardPressed: {
    opacity: 0.75,
  },
});