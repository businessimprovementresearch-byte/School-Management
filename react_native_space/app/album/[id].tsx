import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Pressable, Alert } from 'react-native';
import { Text, ActivityIndicator, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import {
  useGalleryControllerFindAlbum,
  useGalleryControllerAddPhoto,
  useGalleryControllerRemovePhoto,
} from '@/src/api/generated/api';
import type { GalleryPhotoDto } from '@/src/api/generated/schemas';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/src/theme';
import { getErrorMessage } from '@/src/api/customFetch';
import { useAuth } from '@/src/context/AuthContext';
import { pickAndUploadPhoto } from '@/src/lib/uploadPhoto';

export default function AlbumDetailScreen() {
  const { id = '' } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  const { data, isLoading, refetch } = useGalleryControllerFindAlbum(id, { query: { enabled: !!id } });
  const addPhoto = useGalleryControllerAddPhoto();
  const removePhoto = useGalleryControllerRemovePhoto();
  const [uploading, setUploading] = useState(false);

  if (!id) {
    return <SafeAreaView style={styles.container}><Text style={styles.empty}>Invalid album.</Text></SafeAreaView>;
  }

  const photos = data?.photos ?? [];

  const handleAddPhoto = async () => {
    try {
      setUploading(true);
      const res = await pickAndUploadPhoto();
      if (!res?.fileId) { setUploading(false); return; }
      addPhoto.mutate({ id, data: { fileId: res.fileId } }, {
        onSuccess: () => { setUploading(false); refetch(); },
        onError: (e) => { setUploading(false); Alert.alert('Error', getErrorMessage(e, 'Failed to add photo')); },
      });
    } catch (e: any) {
      setUploading(false);
      Alert.alert('Error', e?.message ?? 'Failed to upload photo');
    }
  };

  const confirmRemove = (pid: string) => {
    Alert.alert('Remove Photo', 'Remove this photo from the album?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => removePhoto.mutate({ id: pid }, { onSuccess: () => refetch() }) },
    ]);
  };

  const renderItem = ({ item }: { item: GalleryPhotoDto }) => (
    <View style={styles.photoWrap}>
      {item?.url ? (
        <Image source={{ uri: item.url }} style={styles.photo} contentFit="cover" transition={200} />
      ) : (
        <View style={[styles.photo, styles.photoPlaceholder]}><Ionicons name="image" size={24} color={theme.colors.textSecondary} /></View>
      )}
      {isAdmin ? (
        <Pressable style={styles.removeBadge} onPress={() => confirmRemove(item?.id ?? '')} hitSlop={6}>
          <Ionicons name="close" size={14} color="#FFF" />
        </Pressable>
      ) : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={16}><Ionicons name="arrow-back" size={24} color={theme.colors.text} /></Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>{data?.title ?? 'Album'}</Text>
        {isAdmin ? (
          uploading ? <ActivityIndicator style={{ width: 40 }} color={theme.colors.primary} />
            : <IconButton icon="camera-plus" onPress={handleAddPhoto} iconColor={theme.colors.primary} />
        ) : <View style={{ width: 40 }} />}
      </View>
      {isLoading ? <ActivityIndicator style={{ marginTop: 40 }} color={theme.colors.primary} /> : (
        <FlatList data={photos} renderItem={renderItem} keyExtractor={(i) => i?.id ?? ''} numColumns={3}
          columnWrapperStyle={{ gap: 6 }} contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>No photos yet{isAdmin ? '. Tap the camera icon to add one.' : ''}</Text>} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 4, gap: 12 },
  headerTitle: { flex: 1, fontSize: 18, fontWeight: '700', color: theme.colors.text },
  list: { padding: 16, gap: 6 },
  photoWrap: { flex: 1 / 3, aspectRatio: 1 },
  photo: { width: '100%', height: '100%', borderRadius: 8 },
  photoPlaceholder: { backgroundColor: theme.colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  removeBadge: { position: 'absolute', top: 4, right: 4, backgroundColor: 'rgba(0,0,0,0.55)', borderRadius: 12, width: 22, height: 22, alignItems: 'center', justifyContent: 'center' },
  empty: { textAlign: 'center', color: theme.colors.textSecondary, marginTop: 40, fontSize: 15, width: '100%' },
});
