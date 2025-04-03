import { list } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

export const Trip = list({
  fields: {
    title: text({ validation: { isRequired: true, length: { min: 5, max: 100 } } }),
    origin: text({ validation: { isRequired: true } }),
    destination: text({ validation: { isRequired: true } }),
    creator: relationship({ ref: 'User' }),
    distance: text({
      ui: {
        itemView: {
          fieldMode: 'read',
        },
      },
    }),
    estimatedDuration: text({
      ui: {
        itemView: {
          fieldMode: 'read',
        },
      },
    }),
  },
  access: allowAll,
  hooks: {
    validateInput: async ({ resolvedData, addValidationError }) => {
      const { title, origin, destination } = resolvedData;

      if (title && !/^[a-zA-Z0-9\s.,!?'-]+$/.test(title)) {
        addValidationError('Title contains invalid characters.');
      }

      if (origin && origin.length < 1) {
        addValidationError('Origin must be at least 3 characters long.');
      }

      if (destination && destination.length < 1) {
        addValidationError('Destination must be at least 3 characters long.');
      }

      if (origin && destination && origin === destination) {
        addValidationError('Origin and destination cannot be the same.');
      }
    },
  },
});
