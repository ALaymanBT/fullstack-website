const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1';
const conn_uri = `mongodb://${host}/travlr`;

require('./trips');
const {seed} = require('./seed');

mongoose.connection.on('connected', () => console.log('CONNECTED!'));
mongoose.connection.on('error', () => console.log('ERROR!'));
mongoose.connection.on('disconnected', () => console.log('DISCONNECTED!'));

mongoose.set('strictQuery', false);

const shutdown = (msg, callback) => {
    mongoose.connection.close( () => {
        console.log(`Mongoose disconnected due to ${msg}`);
        callback();
    });
};

process.once('SIGUSR2', () => {
    shutdown('nodemon restart', () => process.kill(process.pid, 'SIGUSR2'));
});

process.once('SIGINT', () => {
    shutdown('app terminated', () => process.exit(0));
});

async function main() {
    await mongoose.connect(conn_uri);
    await seed();
}

main().catch(console.log);