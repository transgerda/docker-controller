import { CronJob } from 'cron';  // Importing the CronJob class
import env from 'dotenv';
env.config();

const startCronSchedule = () => {
    const job = new CronJob('0 2 * * *', async () => {
        try {
            let res1 = await fetch('http://localhost:3333/stop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.API_KEY
                },
                body: JSON.stringify({
                    'nameOrId': 'minecraft-rlcraft-server'
                })
            });

            let res2 = await fetch('http://localhost:3333/stop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.API_KEY
                },
                body: JSON.stringify({
                    'nameOrId': 'minecraft-server'
                })
            });
        } catch (error) {
            console.error('Error fetching:', error);
        }
    });

    job.start();  // Start the scheduled job
};

export default startCronSchedule;

