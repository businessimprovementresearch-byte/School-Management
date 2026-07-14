import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '@/src/theme';
import { useReportCardsControllerFindAll, reportCardsControllerGetDownload } from '@/src/api/generated/api';
import LoadingScreen from '@/src/components/LoadingScreen';

export default function StudentReportCardsScreen() {
  const { studentId = '' } = useLocalSearchParams<{ studentId: string }>();
  const router = useRouter();
  const { data, isLoading } = useReportCardsControllerFindAll({ studentId }, { query: { enabled: !!studentId } });

  const handleDownload = async (id: string) => {
    try {
      const result = await reportCardsControllerGetDownload(id);
      if (result?.url) Linking.openURL(result.url);
    } catch { /* ignore */ }
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
          <Pressable key={rc?.id} style={styles.card} onPress={() => handleDownload(rc?.id ?? '')}>
            <Ionicons name="document" size={24} color={Colors.secondary} />
            <View style={{ flex: 1, marginLeft: Spacing.md }}>
              <Text style={styles.cardTitle}>{rc?.academicYearName ?? ''}{rc?.termName ? ` - ${rc.termName}` : ''}</Text>
              <Text style={styles.cardSub}>Generated {rc?.generatedAt ? new Date(rc.generatedAt).toLocaleDateString() : ''}</Text>
            </View>
            <Ionicons name="download" size={20} color={Colors.primary} />
          </Pressable>
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
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: BorderRadius.md, padding: Spacing.lg, marginBottom: Spacing.sm },
  cardTitle: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary },
  cardSub: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  emptyText: { textAlign: 'center', color: Colors.textSecondary, marginVertical: Spacing.xxxl },
});
