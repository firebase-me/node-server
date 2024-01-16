import schedule from 'node-schedule';

function handleTask() {
  // Define the task or function you want to run on schedule
  console.log('Scheduled task executed at:', new Date());
  // Add your logic here
}

// Schedule tasks
schedule.scheduleJob('*/30 * * * *', handleTask); // Every 30 minutes
schedule.scheduleJob('0 * * * *', handleTask);    // Every hour
schedule.scheduleJob('0 */2 * * *', handleTask);   // Every 2 hours
schedule.scheduleJob('0 */3 * * *', handleTask);   // Every 3 hours
schedule.scheduleJob('0 */6 * * *', handleTask);   // Every 6 hours
schedule.scheduleJob('0 */10 * * *', handleTask);  // Every 10 hours
schedule.scheduleJob('0 */12 * * *', handleTask);  // Every 12 hours
schedule.scheduleJob('0 */18 * * *', handleTask);  // Every 18 hours
schedule.scheduleJob('0 */24 * * *', handleTask);  // Every 24 hours
