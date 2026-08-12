import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '@/src/theme';
import { useReportCardsControllerFindAll, reportCardsControllerGetDownload, useReportCardsControllerRemove } from '@/src/api/generated/api';
import LoadingScreen from '@/src/components/LoadingScreen';
import { formatDate } from '@/src/lib/dateFormat';

export default function StudentReportCardsScreen() {
  const { studentId = '' } = useLocalSearchParams<{ studentId: string }>();
  const router = useRouter();
  const { data, isLoading, refetch } = useReportCardsControllerFindAll({ studentId }, { query: { enabled: !!studentId } });
  const removeMutation = useReportCardsControllerRemove();

  const handleDownload = async (id: string) => {
    try {
      const result = await reportCardsControllerGetDownload(id);
      if (result?.url) Linking.openURL(result.url);
    } catch { /* ignore */ }
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Report Card',
      'Are you sure you want to delete this report card? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => removeMutation.mutate({ id }, { onSuccess: () => refetch() }),
        },
      ],
    );
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color={Colors.textPrimary} /></Pressable>
        <Text style={styles.topTitle}>Report Cards</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {(data ?? []).map((rc) => (
          <View key={rc?.id} style={styles.card}>
            <Pressable style={styles.cardMain} onPress={() => handleDownload(rc?.id ?? '')}>
              <Ionicons name="document" size={24} color={Colors.secondary} />
              <View style={styles.cardTextWrap}>
                <Text style={styles.cardTitle}>{rc?.academicYearName ?? ''}{rc?.termName ? ` - ${rc.termName}` : ''}</Text>
                <Text style={styles.cardSub}>Generated {rc?.generatedAt ? formatDate(rc.generatedAt) : ''}</Text>
              </View>
              <Ionicons name="download" size={20} color={Colors.primary} />
            </Pressable>
            <Pressable style={styles.deleteBtn} onPress={() => handleDelete(rc?.id ?? '')} hitSlop={8}>
              <Ionicons name="trash-outline" size={20} color={Colors.error} />
            </Pressable>
          </View>
        ))}
        {(data?.length ?? 0) === 0 && <Text style={styles.emptyText}>No report cards generated yet</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  topTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  content: { padding: Spacing.lg },
  card: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
  },
  cardMain: { flex: 1, flexDirection: 'row', alignItems: 'center', padding: Spacing.lg, minWidth: 0 },
  cardTextWrap: { flex: 1, marginLeft: Spacing.md, marginRight: Spacing.md },
  deleteBtn: {
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: Colors.divider,
  },
  cardTitle: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary },
  cardSub: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  emptyText: { textAlign: 'center', color: Colors.textSecondary, marginVertical: Spacing.xxxl },
});