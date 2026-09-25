"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePresignedUploadUrl = generatePresignedUploadUrl;
exports.getFileUrl = getFileUrl;
exports.deleteFile = deleteFile;
exports.initiateMultipartUpload = initiateMultipartUpload;
exports.getPresignedUrlForPart = getPresignedUrlForPart;
exports.completeMultipartUpload = completeMultipartUpload;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const aws_config_1 = require("./aws-config");
let s3Client = null;
function getS3() {
    if (!s3Client) {
        s3Client = (0, aws_config_1.createS3Client)();
    }
    return s3Client;
}
function shouldServeInline(contentType) {
    return ((contentType.startsWith('image/') && contentType !== 'image/svg+xml') ||
        contentType.startsWith('video/') ||
        contentType.startsWith('audio/'));
}
async function generatePresignedUploadUrl(fileName, contentType, isPublic = false) {
    const { bucketName, folderPrefix } = (0, aws_config_1.getBucketConfig)();
    const prefix = isPublic ? `${folderPrefix}public/uploads` : `${folderPrefix}uploads`;
    const cloud_storage_path = `${prefix}/${Date.now()}-${fileName}`;
    const command = new client_s3_1.PutObjectCommand({
        Bucket: bucketName,
        Key: cloud_storage_path,
        ContentType: contentType,
    });
    const uploadUrl = await (0, s3_request_presigner_1.getSignedUrl)(getS3(), command, { expiresIn: 3600 });
    return { uploadUrl, cloud_storage_path };
}
async function getFileUrl(cloud_storage_path, contentType, isPublic) {
    const { bucketName } = (0, aws_config_1.getBucketConfig)();
    if (isPublic) {
        const region = await getS3().config.region();
        return `https://${bucketName}.s3.${region}.amazonaws.com/${cloud_storage_path.split('/').map(encodeURIComponent).join('/')}`;
    }
    const disposition = shouldServeInline(contentType) ? 'inline' : 'attachment';
    const command = new client_s3_1.GetObjectCommand({
        Bucket: bucketName,
        Key: cloud_storage_path,
        ResponseContentDisposition: disposition,
    });
    return (0, s3_request_presigner_1.getSignedUrl)(getS3(), command, { expiresIn: 3600 });
}
async function deleteFile(cloud_storage_path) {
    const { bucketName } = (0, aws_config_1.getBucketConfig)();
    await getS3().send(new client_s3_1.DeleteObjectCommand({ Bucket: bucketName, Key: cloud_storage_path }));
}
async function initiateMultipartUpload(fileName, contentType, isPublic) {
    const { bucketName, folderPrefix } = (0, aws_config_1.getBucketConfig)();
    const prefix = isPublic ? `${folderPrefix}public/uploads` : `${folderPrefix}uploads`;
    const cloud_storage_path = `${prefix}/${Date.now()}-${fileName}`;
    const result = await getS3().send(new client_s3_1.CreateMultipartUploadCommand({
        Bucket: bucketName,
        Key: cloud_storage_path,
        ContentType: contentType,
    }));
    return { uploadId: result.UploadId ?? '', cloud_storage_path };
}
async function getPresignedUrlForPart(cloud_storage_path, uploadId, partNumber) {
    const { bucketName } = (0, aws_config_1.getBucketConfig)();
    const command = new client_s3_1.UploadPartCommand({
        Bucket: bucketName,
        Key: cloud_storage_path,
        UploadId: uploadId,
        PartNumber: partNumber,
    });
    return (0, s3_request_presigner_1.getSignedUrl)(getS3(), command, { expiresIn: 3600 });
}
async function completeMultipartUpload(cloud_storage_path, uploadId, parts) {
    const { bucketName } = (0, aws_config_1.getBucketConfig)();
    await getS3().send(new client_s3_1.CompleteMultipartUploadCommand({
        Bucket: bucketName,
        Key: cloud_storage_path,
        UploadId: uploadId,
        MultipartUpload: { Parts: parts },
    }));
}
//# sourceMappingURL=s3.js.map