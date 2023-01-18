require("dotenv").config();

async function dbConnect() {
    const mongoose = require("mongoose");
    mongoose.set("strictQuery", false);
    const mongoString = process.env.MONGODB_URI;
    mongoose.connect(mongoString);
    const database = mongoose.connection;
    
    database.on("error", (error) => {
      console.log(error);
    });
    
    database.once("connected", () => {
      console.log("Database Connected");
    });
}

module.exports = dbConnect;