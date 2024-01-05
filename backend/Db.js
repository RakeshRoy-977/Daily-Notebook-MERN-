const mongoose = require("mongoose");

const connectTOdb = () => {
  try {
    mongoose.connect(process.env.URI);
    console.log("connect to DB");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectTOdb;
