/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from 'cloudinary';
import { TCloudinaryImageProps } from '../../../../config';

type BeforeOperationArgs = {
  operation: 'create' | 'update' | 'delete';
  resolvedData: Record<string, any>;
  item: Record<string, any>;
};

const renameCloudinaryImage = async (publicId: string) => {
  if (!publicId) {
    console.log('No public_id provided');
    return;
  }

  try {
    const filename = publicId.split('/').pop() || publicId;
    const newPublicId = `removed-${filename}`;

    const fullPublicId = `${process.env.CLOUDINARY_API_FOLDER}/${filename}`;

    await cloudinary.uploader.rename(fullPublicId, `${newPublicId}`, {
      invalidate: true,
    });
    console.log(`Successfully renamed ${fullPublicId} to ${newPublicId}`);
  } catch (error) {
    console.error('Failed to rename Cloudinary image:', error);
  }
};

export const removeCloudinaryImage =
  (field: string) =>
  async ({ item, operation, resolvedData }: BeforeOperationArgs) => {
    try {
      if (!item?.[field]) return;

      const profileImage = item[field] as TCloudinaryImageProps;
      const currentPublicId = profileImage._meta?.public_id;
      if (!currentPublicId) return;

      switch (operation) {
        case 'update':
          if (
            resolvedData[field] &&
            (resolvedData[field] as TCloudinaryImageProps)._meta?.public_id !== currentPublicId
          ) {
            console.log(`Cleaning up old image on update: ${currentPublicId}`);
            await renameCloudinaryImage(currentPublicId);
          }
          break;

        case 'delete':
          console.log(`Cleaning up image on delete: ${currentPublicId}`);
          await renameCloudinaryImage(currentPublicId);
          break;
      }
    } catch (error) {
      console.error('Error in removeCloudinaryImage:', error);
    }
  };
