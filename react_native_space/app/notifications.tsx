import React from 'react';
import { View, FlatList, StyleSheet, Pressable } from 'react-native';
import { Text, ActivityIndicator, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  useNotificationsControllerList,
  useNotificationsControllerUnreadCount,
  useNotificationsControllerMarkRead,
  useNotificationsControllerMarkAllRead,
} from '@/src/api/generated/api';
import type { NotificationDto } from '@/src/api/generated/schemas';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/src/theme';

function iconForType(type?: string): keyof typeof Ionicons.glyphMap {
  switch (type) {
    case 'ATTENDANCE_ALERT': return 'alert-circle';
    case 'AWARD': return 'trophy';
    case 'EVENT': return 'sparkles';
    default: return 'notifications';
  }
}

export default function NotificationsScreen() {
  const router = useRouter();
  const { data, isLoading, refetch } = useNotificationsControllerList();
  const unreadQuery = useNotificationsControllerUnreadCount();
  const markRead = useNotificationsControllerMarkRead();
  const markAllRead = useNotificationsControllerMarkAllRead();

  const items = data ?? [];
  const unread = unreadQuery?.data?.count ?? 0;

  const handlePress = (n: NotificationDto) => {
    if (!n?.read && n?.id) {
      markRead.mutate({ id: n.id }, { onSuccess: () => { refetch(); unreadQuery.refetch(); } });
    }
  };

  const handleMarkAll = () => {
    markAllRead.mutate(undefined as any, { onSuccess: () => { refetch(); unreadQuery.refetch(); } });
  };

  const renderItem = ({ item }: { item: NotificationDto }) => (
    <Pressable style={[styles.card, !item?.read && styles.cardUnread]} onPress={() => handlePress(item)}>
      <View style={[styles.iconBox, !item?.read && styles.iconBoxUnread]}>
        <Ionicons name={iconForType(item?.type)} size={20} color={item?.read ? theme.colors.textSecondary : theme.colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{item?.title ?? ''}</Text>
        <Text style={styles.cardBody}>{item?.body ?? ''}</Text>
        <Text style={styles.cardMeta}>{item?.createdAt?.split('T')?.[0] ?? ''}</Text>
      </View>
      {!item?.read ? <View style={styles.dot} /> : null}
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={16}><Ionicons name="arrow-back" size={24} color={theme.colors.text} /></Pressable>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 24 }} />
      </View>
      {unread > 0 ? (
        <View style={styles.markAllRow}>
          <Text style={styles.unreadLabel}>{unread} unread</Text>
          <Button compact mode="text" textColor={theme.colors.primary} onPress={handleMarkAll} loading={markAllRead?.isPending}>Mark all read</Button>
        </View>
      ) : null}
      {isLoading ? <ActivityIndicator style={{ marginTop: 40 }} color={theme.colors.primary} /> : (
        <FlatList data={items} renderItem={renderItem} keyExtractor={(i) => i?.id ?? ''} contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>No notifications</Text>} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 10 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.text },
  markAllRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 4 },
  unreadLabel: { fontSize: 13, color: theme.colors.textSecondary, fontWeight: '600' },
  list: { paddingHorizontal: 16, paddingBottom: 40 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 12, padding: 14, marginBottom: 10, elevation: 1, gap: 12 },
  cardUnread: { backgroundColor: theme.colors.primaryLight },
  iconBox: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F0F0F0', alignItems: 'center', justifyContent: 'center' },
  iconBoxUnread: { backgroundColor: '#FFF' },
  cardTitle: { fontSize: 15, fontWeight: '600', color: theme.colors.text },
  cardBody: { fontSize: 13, color: theme.colors.textSecondary, marginTop: 3, lineHeight: 18 },
  cardMeta: { fontSize: 11, color: theme.colors.textSecondary, marginTop: 4 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: theme.colors.primary },
  empty: { textAlign: 'center', color: theme.colors.textSecondary, marginTop: 40, fontSize: 15 },
});
