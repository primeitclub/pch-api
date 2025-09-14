import CronJob from 'node-cron';
import { env } from './env';
class Cron {
      static start(callback: () => void) {
            const cron = CronJob.schedule(env.CRON_TIME, callback);
            cron.start();
      }
}

export default Cron;