const mongoose = require("mongoose");
const keys = require("../config/keys");
const test = require("../config/test");

exports.connectMongo = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mernuser:" +
        encodeURIComponent(keys.MONGO_ATLAS_PW) +
        "@assignmentcluster-x3laa.mongodb.net/test?retryWrites=true",
      { useNewUrlParser: true, useFindAndModify: false }
    );
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    //Exit the process
    process.exit(1);
  }
};

exports.connectMongoTest = async () => {
  try {
    await mongoose.connect(test.db, {
      useNewUrlParser: true,
      useFindAndModify: false
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    //Exit the process
    process.exit(1);
  }
};
