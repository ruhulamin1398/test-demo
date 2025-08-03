const cron = require('node-cron');
const User = require('../models/user');

// Run the cron job every day at midnight
cron.schedule('0 0 * * *', async () => {
    const currentDate = new Date();

    try {

        await User.updateMany(
            { expiryDate: { $lt: currentDate }, userStatus: 'active' },
            { $set: { userStatus: 'inactive' } }
        );

    } catch (error) {
        console.error("Error updating user statuses: ", error);
    }
});
