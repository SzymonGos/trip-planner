import { config } from '@keystone-6/core';
import { CORS_ORIGIN, DATABASE_URL, DATABASE_URL_SUFFIX } from './config';
import { exec } from 'child_process';
import { lists } from './index';
import { scheduledCleanup } from './src/schemas/User/hooks/cleanupDeletedUsers';
import { resetAiChatUsage } from './src/schemas/User/hooks/resetAiChatUsage';
import { resetGoogleMapsRouteUsage } from './src/schemas/User/hooks/resetGoogleMapsRouteUsage';

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
            await resetAiChatUsage();
            await resetGoogleMapsRouteUsage();
          } catch (error) {
            console.error('Scheduled cleanup failed:', error);
          }
        },
        24 * 60 * 60 * 1000,
      );
    },
  },
  db: {
    provider: 'postgresql',
    url: DATABASE_URL + DATABASE_URL_SUFFIX,
    onConnect: async () => {
      console.log('--- Generate graphql types');

      exec('nx graphqlTypes:generate tp-graphql-types', () => {
        console.log('--- Generate graphql types is completed');
      });
    },
  },
  lists,
});
