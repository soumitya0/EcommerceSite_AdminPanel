const mongoose = require("mongoose");

const config = require("config");

const dbURL = config.get("URL");

const connectDB = async () => {
  try {
    console.log(dbURL);

    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("mongodb connected");
  } catch (error) {
    console.log("error db connection");
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
