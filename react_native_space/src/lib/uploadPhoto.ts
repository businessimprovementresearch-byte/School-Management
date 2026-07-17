import * as ImagePicker from 'expo-image-picker';
import { uploadControllerGetPresignedUrl, uploadControllerCompleteUpload } from '@/src/api/generated/api';

export type UploadResult = { fileId: string };

/**
 * Launches the image library, uploads the chosen image to S3 via the backend
 * presigned-url flow, and returns the created file's id. Returns null if the
 * user cancels. Throws on upload failure.
 */
export async function pickAndUploadPhoto(): Promise<UploadResult | null> {
  const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!perm.granted) {
    throw new Error('Photo library permission is required to upload images.');
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    quality: 0.7,
    allowsEditing: false,
  });
  if (result.canceled || !result.assets?.[0]) return null;

  const asset = result.assets[0];
  const uri = asset.uri ?? '';
  if (!uri) throw new Error('Could not read selected image.');

  const contentType = asset.mimeType ?? 'image/jpeg';
  const ext = contentType.split('/')?.[1] ?? 'jpg';
  const fileName = (asset.fileName ?? `photo-${Date.now()}.${ext}`).replace(/\s+/g, '_');

  // 1. Get presigned URL (public so images render inline).
  const presigned = await uploadControllerGetPresignedUrl({ fileName, contentType, isPublic: true });

  // 2. Read the file as a blob and upload directly to S3.
  const fileResponse = await fetch(uri);
  const blob = await fileResponse.blob();

  const headers: Record<string, string> = { 'Content-Type': contentType };
  // Our backend does NOT sign content-disposition, so only Content-Type is sent.
  if ((presigned?.uploadUrl ?? '').includes('content-disposition')) {
    headers['Content-Disposition'] = 'attachment';
  }

  const putRes = await fetch(presigned?.uploadUrl ?? '', {
    method: 'PUT',
    headers,
    body: blob,
  });
  if (!putRes.ok) throw new Error('Failed to upload image to storage.');

  // 3. Confirm the upload with the backend to create the File record.
  const completed = await uploadControllerCompleteUpload({
    cloud_storage_path: presigned?.cloud_storage_path ?? '',
    fileName,
    contentType,
    fileSize: (blob as any)?.size ?? undefined,
  });

  return { fileId: completed?.id ?? '' };
}
