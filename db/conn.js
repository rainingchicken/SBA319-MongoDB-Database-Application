const mongoose = require("mongoose");

const conn = () => {
  try {
    mongoose.connect(
      process.env.MONGO_URI
      // {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      // }
    );
    mongoose.connection.once("open", () => {
      console.log(`Connected to mongodb`);
    });
  } catch (error) {
    console.error(
      `Something went wrong with connect to the database ${err.message}`
    );
  }
};

module.exports = conn;
