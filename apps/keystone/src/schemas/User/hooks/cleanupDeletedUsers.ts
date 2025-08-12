import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const scheduledCleanup = async () => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    console.log('Starting cleanup of deleted users older than 30 days...');

    const usersToDelete = await prisma.user.findMany({
      where: {
        isDeleted: true,
        deletedAt: {
          lt: thirtyDaysAgo,
        },
      },
      include: {
        from_Trip_creator: {
          include: {
            tripImages: true,
          },
        },
      },
    });

    console.log(`Found ${usersToDelete.length} users to permanently delete`);

    for (const user of usersToDelete) {
      try {
        await prisma.$transaction(async (tx) => {
          for (const trip of user.from_Trip_creator) {
            if (trip.tripImages && trip.tripImages.length > 0) {
              await tx.tripImage.deleteMany({
                where: {
                  tripId: trip.id,
                },
              });
            }
          }
          await tx.trip.deleteMany({
            where: {
              creatorId: user.id,
            },
          });
          await tx.user.delete({
            where: { id: user.id },
          });
        });

        console.log(`Successfully deleted user ${user.id} and all related data`);
      } catch (userError) {
        console.error(`Failed to delete user ${user.id}:`, userError);
      }
    }

    console.log('Cleanup job completed successfully');
  } catch (error) {
    console.error('Cleanup job failed:', error);
  }
};

// This is for testing purposes only - create a route test-cleanup in the keystone server to trigger the cleanup
export const manualCleanup = async () => {
  console.log('Manual cleanup triggered');
  await scheduledCleanup();
};
