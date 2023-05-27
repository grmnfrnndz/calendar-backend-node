const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
        });

        console.log('CALENDARDB ONLINE')

    } catch (err) {
        console.log(`ERROR DB: ${err}`);
        throw new Error('ERROR INIT DB CALENDARDB');
    }
}


module.exports = {
    dbConnection
}