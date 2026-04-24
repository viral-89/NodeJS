const mongoose = require("mongoose");
// const debug = require("debug");
// const config = require("config")

function connectToDB() {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("✅ MongoDB Connected");
        })
        .catch((err) => {
            console.log(err)
        })
} // with console

// function connectToDB() {
//     mongoose.connect(`${config.get('MongoDB_URL')}/ E-commerce`)
//         .then(() => {
//             debug("MongoDB Connected")
//         })
//         .catch((err) => {
//             debug(err)
//         })
// } // with debuger

module.exports = connectToDB;