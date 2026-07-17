import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Pressable } from 'react-native';
import { Text, TextInput, Button, ActivityIndicator, Portal, Modal, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useGalleryControllerFindAllAlbums, useGalleryControllerCreateAlbum } from '@/src/api/generated/api';
import type { AlbumListItemDto } from '@/src/api/generated/schemas';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/src/theme';
import { getErrorMessage } from '@/src/api/customFetch';
import { useAuth } from '@/src/context/AuthContext';

export default function GalleryScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const { data, isLoading, refetch } = useGalleryControllerFindAllAlbums();
  const createMutation = useGalleryControllerCreateAlbum();

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const albums = data ?? [];

  const handleCreate = () => {
    setError('');
    if (!title?.trim()) { setError('Title is required'); return; }
    createMutation.mutate({ data: { title: title.trim(), description: description || undefined } }, {
      onSuccess: () => { setShowModal(false); setTitle(''); setDescription(''); refetch(); },
      onError: (e) => setError(getErrorMessage(e, 'Failed to create album')),
    });
  };

  const renderItem = ({ item }: { item: AlbumListItemDto }) => (
    <Pressable style={styles.card} onPress={() => router.push(`/album/${item?.id ?? ''}`)}>
      <View style={styles.cover}>
        {item?.coverUrl ? (
          <Image source={{ uri: item.coverUrl }} style={styles.coverImg} contentFit="cover" transition={200} />
        ) : (
          <Ionicons name="images" size={30} color={theme.colors.primary} />
        )}
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item?.title ?? ''}</Text>
        <Text style={styles.cardMeta}>{item?.photoCount ?? 0} photo(s)</Text>
        {!!item?.eventName && <Text style={styles.cardSub} numberOfLines={1}>{item.eventName}</Text>}
        {!!item?.className && <Text style={styles.cardSub} numberOfLines={1}>{item.className}</Text>}
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={16}><Ionicons name="arrow-back" size={24} color={theme.colors.text} /></Pressable>
        <Text style={styles.headerTitle}>Photo Gallery</Text>
        {isAdmin ? <IconButton icon="plus" onPress={() => setShowModal(true)} iconColor={theme.colors.primary} /> : <View style={{ width: 40 }} />}
      </View>
      {isLoading ? <ActivityIndicator style={{ marginTop: 40 }} color={theme.colors.primary} /> : (
        <FlatList data={albums} renderItem={renderItem} keyExtractor={(i) => i?.id ?? ''} numColumns={2}
          columnWrapperStyle={{ gap: 12 }} contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>No albums yet</Text>} />
      )}
      <Portal>
        <Modal visible={showModal} onDismiss={() => setShowModal(false)} contentContainerStyle={styles.modal}>
          <Text style={styles.modalTitle}>New Album</Text>
          {!!error && <Text style={styles.error}>{error}</Text>}
          <TextInput label="Title" value={title} onChangeText={setTitle} mode="outlined" style={styles.input} outlineColor={theme.colors.border} activeOutlineColor={theme.colors.primary} />
          <TextInput label="Description (optional)" value={description} onChangeText={setDescription} mode="outlined" style={styles.input} outlineColor={theme.colors.border} activeOutlineColor={theme.colors.primary} />
          <Button mode="contained" onPress={handleCreate} loading={createMutation?.isPending} style={styles.btn} buttonColor={theme.colors.primary}>Create Album</Button>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 4 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.text },
  list: { paddingHorizontal: 16, paddingBottom: 40, gap: 12 },
  card: { flex: 1, backgroundColor: '#FFF', borderRadius: 12, overflow: 'hidden', elevation: 1 },
  cover: { height: 120, backgroundColor: theme.colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  coverImg: { width: '100%', height: '100%' },
  cardBody: { padding: 10 },
  cardTitle: { fontSize: 15, fontWeight: '600', color: theme.colors.text },
  cardMeta: { fontSize: 12, color: theme.colors.primary, marginTop: 2, fontWeight: '600' },
  cardSub: { fontSize: 12, color: theme.colors.textSecondary, marginTop: 2 },
  empty: { textAlign: 'center', color: theme.colors.textSecondary, marginTop: 40, fontSize: 15, width: '100%' },
  modal: { backgroundColor: '#FFF', margin: 20, borderRadius: 16, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.text, marginBottom: 16 },
  input: { marginBottom: 12, backgroundColor: '#FFF' },
  error: { color: theme.colors.error, marginBottom: 12, textAlign: 'center' },
  btn: { marginTop: 4, borderRadius: 8 },
});
