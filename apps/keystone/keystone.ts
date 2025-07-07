import { config } from '@keystone-6/core';
import { CORS_ORIGIN, DATABASE_URL } from './config';
import { exec } from 'child_process';
import { lists } from './index';

export default config({
  server: {
    cors: {
      origin: CORS_ORIGIN,
      credentials: true,
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Apollo-Require-Preflight'],
    },
  },
  db: {
    provider: 'postgresql',
    url: DATABASE_URL,
    onConnect: async () => {
      console.log('--- Generate graphql types');

      exec('nx graphqlTypes:generate tp-graphql-types', () => {
        console.log('--- Generate graphql types is completed');
      });
    },
  },
  lists,
});
