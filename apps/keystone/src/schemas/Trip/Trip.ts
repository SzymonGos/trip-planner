import { list } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

export const Trip = list({
  fields: {
    title: text({ validation: { isRequired: true } }),
    origin: text({ validation: { isRequired: true } }),
    destination: text({ validation: { isRequired: true } }),
    creator: relationship({ ref: 'User' }),
  },
  access: allowAll,
});
