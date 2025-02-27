import 'dotenv/config';

export const CORS_ORIGIN = ['http://localhost:4000'];
export const DATABASE_URL = process.env.DATABASE_URL || '';
export const SHADOW_DATABASE_URL = process.env.SHADOW_DATABASE_URL || '';
