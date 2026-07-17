import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Pressable } from 'react-native';
import { Text, TextInput, Button, ActivityIndicator, Portal, Modal, Switch } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  useNotificationsControllerListAlertSettings,
  useNotificationsControllerUpdateAlertSetting,
} from '@/src/api/generated/api';
import type { AlertSettingDto } from '@/src/api/generated/schemas';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/src/theme';
import { getErrorMessage } from '@/src/api/customFetch';

export default function AlertSettingsScreen() {
  const router = useRouter();
  const { data, isLoading, refetch } = useNotificationsControllerListAlertSettings();
  const updateMutation = useNotificationsControllerUpdateAlertSetting();

  const [editing, setEditing] = useState<AlertSettingDto | null>(null);
  const [enabled, setEnabled] = useState(true);
  const [delay, setDelay] = useState('60');
  const [error, setError] = useState('');

  const settings = data ?? [];

  const openEdit = (s: AlertSettingDto) => {
    setEditing(s);
    setEnabled(s?.enabled ?? true);
    setDelay(String(s?.delayMinutes ?? 60));
    setError('');
  };

  const handleSave = () => {
    setError('');
    const teacherId = editing?.teacherId ?? '';
    if (!teacherId) return;
    const delayNum = parseInt(delay, 10);
    if (isNaN(delayNum) || delayNum < 0) { setError('Delay must be a non-negative number'); return; }
    updateMutation.mutate({ teacherId, data: { enabled, delayMinutes: delayNum } }, {
      onSuccess: () => { setEditing(null); refetch(); },
      onError: (e) => setError(getErrorMessage(e, 'Failed to save setting')),
    });
  };

  const renderItem = ({ item }: { item: AlertSettingDto }) => (
    <Pressable style={styles.card} onPress={() => openEdit(item)}>
      <View style={[styles.iconBox, { backgroundColor: item?.enabled ? theme.colors.primaryLight : '#F0F0F0' }]}>
        <Ionicons name={item?.enabled ? 'notifications' : 'notifications-off'} size={20} color={item?.enabled ? theme.colors.primary : theme.colors.textSecondary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{item?.teacherName ?? ''}</Text>
        <Text style={styles.cardSub}>{item?.enabled ? `Alert after ${item?.delayMinutes ?? 0} min` : 'Alerts disabled'}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={16}><Ionicons name="arrow-back" size={24} color={theme.colors.text} /></Pressable>
        <Text style={styles.headerTitle}>Alert Settings</Text>
        <View style={{ width: 24 }} />
      </View>
      <Text style={styles.subtitle}>Attendance alerts remind teachers if a session has no attendance recorded after the set delay.</Text>
      {isLoading ? <ActivityIndicator style={{ marginTop: 40 }} color={theme.colors.primary} /> : (
        <FlatList data={settings} renderItem={renderItem} keyExtractor={(i) => i?.teacherId ?? ''} contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>No teachers found</Text>} />
      )}
      <Portal>
        <Modal visible={!!editing} onDismiss={() => setEditing(null)} contentContainerStyle={styles.modal}>
          <Text style={styles.modalTitle}>{editing?.teacherName ?? ''}</Text>
          {!!error && <Text style={styles.error}>{error}</Text>}
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Enable attendance alerts</Text>
            <Switch value={enabled} onValueChange={setEnabled} color={theme.colors.primary} />
          </View>
          <TextInput label="Delay (minutes)" value={delay} onChangeText={setDelay} mode="outlined" keyboardType="number-pad" disabled={!enabled} style={styles.input} outlineColor={theme.colors.border} activeOutlineColor={theme.colors.primary} />
          <Button mode="contained" onPress={handleSave} loading={updateMutation?.isPending} style={styles.btn} buttonColor={theme.colors.primary}>Save</Button>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 10 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.text },
  subtitle: { fontSize: 13, color: theme.colors.textSecondary, paddingHorizontal: 16, marginBottom: 8, lineHeight: 18 },
  list: { paddingHorizontal: 16, paddingBottom: 40 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 12, padding: 14, marginBottom: 10, elevation: 1, gap: 12 },
  iconBox: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  cardTitle: { fontSize: 15, fontWeight: '600', color: theme.colors.text },
  cardSub: { fontSize: 13, color: theme.colors.textSecondary, marginTop: 3 },
  empty: { textAlign: 'center', color: theme.colors.textSecondary, marginTop: 40, fontSize: 15 },
  modal: { backgroundColor: '#FFF', margin: 20, borderRadius: 16, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.text, marginBottom: 16 },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  switchLabel: { fontSize: 15, color: theme.colors.text, flex: 1 },
  input: { marginBottom: 12, backgroundColor: '#FFF' },
  error: { color: theme.colors.error, marginBottom: 12, textAlign: 'center' },
  btn: { marginTop: 4, borderRadius: 8 },
});
