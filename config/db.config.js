const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const dbName = process.env.NODE_ENV === 'dev' ? 'database-test' : 'database' 
const url = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${dbName}:27017?authMechanism=SCRAM-SHA-1&authSource=admin`
const dbURL = process.env.MONGO_URL_LIVE || url;
var uri = process.env.MONGO_URL_LIVE
const options = {
    retryWrites: true,
    w: 'majority'
  }

mongoose
  .connect(dbURL, options).then(() => {
    console.log("connected to mongoose")
}).catch((err) => {
  console.log(`FATAL MONGODB CONNECTION ERROR: ${err}:${err.stack}`)
});

module.exports = mongoose;