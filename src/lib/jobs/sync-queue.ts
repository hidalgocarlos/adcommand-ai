import { Queue } from 'bullmq';
import { redis } from '../redis';

export const syncQueue = new Queue('meta-sync', {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
    removeOnComplete: true,
  },
});

export async function scheduleSync(connectionId: string) {
  await syncQueue.add('sync-connection', { connectionId }, {
    jobId: `sync-${connectionId}`,
  });
}
