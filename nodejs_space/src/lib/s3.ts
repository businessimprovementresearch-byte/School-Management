import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { createS3Client, getBucketConfig } from './aws-config';

let s3Client: ReturnType<typeof createS3Client> | null = null;

function getS3() {
  if (!s3Client) {
    s3Client = createS3Client();
  }
  return s3Client;
}

function shouldServeInline(contentType: string): boolean {
  return (
    (contentType.startsWith('image/') && contentType !== 'image/svg+xml') ||
    contentType.startsWith('video/') ||
    contentType.startsWith('audio/')
  );
}

export async function generatePresignedUploadUrl(
  fileName: string,
  contentType: string,
  isPublic = false,
): Promise<{ uploadUrl: string; cloud_storage_path: string }> {
  const { bucketName, folderPrefix } = getBucketConfig();
  const prefix = isPublic ? `${folderPrefix}public/uploads` : `${folderPrefix}uploads`;
  const cloud_storage_path = `${prefix}/${Date.now()}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: cloud_storage_path,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(getS3(), command, { expiresIn: 3600 });
  return { uploadUrl, cloud_storage_path };
}

export async function getFileUrl(
  cloud_storage_path: string,
  contentType: string,
  isPublic: boolean,
): Promise<string> {
  const { bucketName } = getBucketConfig();
  if (isPublic) {
    const region = await getS3().config.region();
    return `https://${bucketName}.s3.${region}.amazonaws.com/${cloud_storage_path.split('/').map(encodeURIComponent).join('/')}`;
  }
  const disposition = shouldServeInline(contentType) ? 'inline' : 'attachment';
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: cloud_storage_path,
    ResponseContentDisposition: disposition,
  });
  return getSignedUrl(getS3(), command, { expiresIn: 3600 });
}

export async function deleteFile(cloud_storage_path: string): Promise<void> {
  const { bucketName } = getBucketConfig();
  await getS3().send(
    new DeleteObjectCommand({ Bucket: bucketName, Key: cloud_storage_path }),
  );
}

export async function initiateMultipartUpload(
  fileName: string,
  contentType: string,
  isPublic: boolean,
): Promise<{ uploadId: string; cloud_storage_path: string }> {
  const { bucketName, folderPrefix } = getBucketConfig();
  const prefix = isPublic ? `${folderPrefix}public/uploads` : `${folderPrefix}uploads`;
  const cloud_storage_path = `${prefix}/${Date.now()}-${fileName}`;
  const result = await getS3().send(
    new CreateMultipartUploadCommand({
      Bucket: bucketName,
      Key: cloud_storage_path,
      ContentType: contentType,
    }),
  );
  return { uploadId: result.UploadId ?? '', cloud_storage_path };
}

export async function getPresignedUrlForPart(
  cloud_storage_path: string,
  uploadId: string,
  partNumber: number,
): Promise<string> {
  const { bucketName } = getBucketConfig();
  const command = new UploadPartCommand({
    Bucket: bucketName,
    Key: cloud_storage_path,
    UploadId: uploadId,
    PartNumber: partNumber,
  });
  return getSignedUrl(getS3(), command, { expiresIn: 3600 });
}

export async function completeMultipartUpload(
  cloud_storage_path: string,
  uploadId: string,
  parts: { ETag: string; PartNumber: number }[],
): Promise<void> {
  const { bucketName } = getBucketConfig();
  await getS3().send(
    new CompleteMultipartUploadCommand({
      Bucket: bucketName,
      Key: cloud_storage_path,
      UploadId: uploadId,
      MultipartUpload: { Parts: parts },
    }),
  );
}
