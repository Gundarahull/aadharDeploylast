// const { Sequelize } = require("sequelize");

// const sequelize= new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
//     dialect:process.env.DB_DIALECT,
//     host:process.env.HOST
// })

// module.exports=sequelize

const mongoose = require("mongoose");
require("dotenv").config();
// const mongoURL = 'mongodb://localhost:27017/hotels';

const mongoURL = process.env.DB_MONGOURL;

// Connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connection
mongoose
  .connect(mongoURL, options)
  .then(() => {
    console.log("Connected to MongoDB HI MAN");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const db = mongoose.connection;

db.on("connected", () => {
  console.log(`Mongoose connected to MongoDB at ${mongoURL}`);
});

db.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// mongoose.disconnect()
//     .then(() => {
//         console.log('Disconnected from MongoDB');
//     })
//     .catch((error) => {
//         console.error('Error disconnecting from MongoDB:', error);
//     });

module.exports = db;
