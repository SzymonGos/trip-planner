import { config } from '@keystone-6/core';
import { CORS_ORIGIN, DATABASE_URL } from './config';
import { exec } from 'child_process';
import { lists } from './index';
import { scheduledCleanup } from './src/schemas/User/hooks/cleanupDeletedUsers';

export default config({
  server: {
    cors: {
      origin: CORS_ORIGIN,
      credentials: true,
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Apollo-Require-Preflight'],
    },
    extendExpressApp: () => {
      setInterval(
        async () => {
          try {
            await scheduledCleanup();
          } catch (error) {
            console.error('Scheduled cleanup failed:', error);
          }
        },
        24 * 60 * 60 * 1000,
      );

      setTimeout(async () => {
        try {
          console.log('Running initial cleanup on server start...');
          await scheduledCleanup();
        } catch (error) {
          console.error('Initial cleanup failed:', error);
        }
      }, 5000);
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
