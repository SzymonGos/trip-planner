import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text } from "@keystone-6/core/fields";

export const User = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
  },
  access: allowAll,
});
