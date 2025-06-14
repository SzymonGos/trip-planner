import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { text } from '@keystone-6/core/fields';
import { cloudinaryImage } from '@keystone-6/cloudinary';
import { CLOUDINARY_CONFIGS } from '../../../config';
import { removeCloudinaryImage } from './hooks/removeCloudinaryImage';

export const User = list({
  fields: {
    clerkId: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
      access: { update: () => false },
      ui: {
        itemView: { fieldMode: 'read' },
      },
    }),
    username: text({ validation: { isRequired: true } }),
    email: text({ validation: { isRequired: true } }),
    profileImage: cloudinaryImage({
      cloudinary: CLOUDINARY_CONFIGS,
      hooks: {
        beforeOperation: (...args) => {
          console.log('beforeOperation user profile image triggered');
          removeCloudinaryImage('profileImage')?.(...args);
        },
      },
    }),
  },
  access: allowAll,
});
