import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "../../apps/keystone/schema.graphql",
  documents: ["src/**/*.tsx"],
  generates: {
    "./src/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
