import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { text } from '@keystone-6/core/fields';

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
  },
  access: allowAll,
});
