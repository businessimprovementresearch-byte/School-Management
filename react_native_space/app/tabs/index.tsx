import React, { useCallback, useState, useMemo } from 'react';
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
import { Colors, Spacing, BorderRadius } from '@/src/theme';
import { useClassesControllerFindAll } from '@/src/api/generated/api';
import LoadingScreen from '@/src/components/LoadingScreen';

export default function DashboardScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  // Fetch data semua kelas dari backend
  const { data: classesData, isLoading, refetch } = useClassesControllerFindAll();

  // Refetch data otomatis setiap kali halaman di-fokuskan (kembali dari halaman lain)
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  // Fungsi Pull-to-Refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // Filter hanya kelas yang aktif
  // Mendukung pengecekan c.isActive === true ATAU c.status === 'ACTIVE'
  const activeClasses = useMemo(() => {
    if (!classesData || !Array.isArray(classesData)) return [];

    return classesData.filter((item: any) => {
      if (typeof item?.isActive === 'boolean') {
        return item.isActive === true;
      }
      if (item?.status) {
        return String(item.status).toUpperCase() === 'ACTIVE';
      }
      // Jika backend belum menyediakan flag status/isActive,
      // tampilkan semua data sebagai fallback
      return true;
    });
  }, [classesData]);

  if (isLoading || !classesData) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Dashboard */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Dashboard Utama</Text>
          <Text style={styles.subtitle}>Ringkasan kelas aktif saat ini</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
          />
        }
      >
        {/* Card Statistik Kelas Aktif */}
        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Ionicons name="checkmark-circle" size={28} color={Colors.primary} />
          </View>
          <View style={styles.statInfo}>
            <Text style={styles.statCount}>{activeClasses.length}</Text>
            <Text style={styles.statLabel}>Kelas Aktif</Text>
          </View>
        </View>

        {/* Section List Kelas Aktif */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Daftar Kelas Aktif</Text>
          <Text style={styles.badgeCount}>{activeClasses.length} Total</Text>
        </View>

        {/* Tampilan Jika Tidak Ada Kelas Aktif */}
        {activeClasses.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="sparkles-outline" size={48} color={Colors.textSecondary} />
            <Text style={styles.emptyTitle}>Tidak Ada Kelas Aktif</Text>
            <Text style={styles.emptySubtitle}>
              Saat ini belum ada kelas yang berstatus aktif.
            </Text>
          </View>
        ) : (
          /* Render Daftar Kelas Aktif */
          activeClasses.map((item: any) => {
            const teacherNames = item?.teachers
              ? item.teachers.map((t: any) => t?.name ?? '').filter(Boolean).join(', ')
              : '';

            return (
              <Pressable
                key={item?.id}
                style={({ pressed }) => [
                  styles.classCard,
                  pressed && styles.cardPressed,
                ]}
                onPress={() => router.push(`/class/${item?.id}`)}
              >
                <View style={styles.classIcon}>
                  <Ionicons name="book-outline" size={22} color={Colors.primary} />
                </View>

                <View style={styles.classMainInfo}>
                  <View style={styles.cardHeaderRow}>
                    <Text style={styles.className}>{item?.name ?? 'Tanpa Nama'}</Text>
                    <View style={styles.activeBadge}>
                      <View style={styles.activeDot} />
                      <Text style={styles.activeBadgeText}>Aktif</Text>
                    </View>
                  </View>

                  <Text style={styles.classDetails}>
                    Grade {item?.grade ?? '-'} · {item?.studentCount ?? 0} Siswa
                  </Text>

                  {teacherNames ? (
                    <Text style={styles.teacherText} numberOfLines={1}>
                      Pengajar: {teacherNames}
                    </Text>
                  ) : null}
                </View>

                <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl * 2,
  },

  // Stat Card
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.xl,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary + '15',
    justify: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  statInfo: {
    justify: 'center',
  },
  statCount: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  statLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
  },

  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  badgeCount: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
  },

  // Class Card
  classCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
  },
  cardPressed: {
    opacity: 0.8,
  },
  classIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.secondary + '15',
    justify: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  classMainInfo: {
    flex: 1,
    marginRight: Spacing.xs,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    marginRight: Spacing.xs,
  },
  className: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
    flex: 1,
  },
  classDetails: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  teacherText: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  // Active Badge
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F4EA',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#137333',
  },
  activeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#137333',
  },

  // Empty State
  emptyCard: {
    alignItems: 'center',
    justify: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl * 1.5,
    marginTop: Spacing.md,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: Spacing.md,
  },
  emptySubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
});