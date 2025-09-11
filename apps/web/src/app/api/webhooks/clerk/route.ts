import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { CLERK_WEBHOOK_SECRET } from '@/lib/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const wh = new Webhook(CLERK_WEBHOOK_SECRET);

  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === 'user.created') {
    try {
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

      // log the user data
      console.log('Creating user with data:', {
        clerkId: evt.data.id,
        email: evt.data.email_addresses?.[0]?.email_address,
        username: evt.data.username,
      });

      await prisma.user.create({
        data: {
          clerkId: evt.data.id,
          email: evt.data.email_addresses[0].email_address,
          username: evt.data.username,
          aiChatUsageResetDate: thirtyDaysFromNow,
          googleMapsRouteResetDate: thirtyDaysFromNow,
        },
      });

      // log the user data
      console.log('User created successfully:', evt.data.id);
    } catch (error) {
      // log the user data
      console.error('Error creating user:', error);
      console.error('User data:', evt.data);
      throw error; // Re-throw to make webhook fail and retry
    }
  }

  return new Response('', { status: 200 });
}
