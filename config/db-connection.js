const mongoDbClientConnect = require('mongodb').MongoClient

const connectMongo = mongoDbClientConnect.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
  { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if (err) {
      console.log("Database Not Connected!", err);
      return;
    }
    dbObject = db.db("CronJReactNode")
    console.log("Database Connected!");
  })
function GetCollectionObj(collName) {
  return dbObject.collection(collName)
}

module.exports = { mongoDbClientConnect, GetCollectionObj }
