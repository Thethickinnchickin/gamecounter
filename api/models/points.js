const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pointsSchema = new Schema({
    warzone: Number,
    fallguys: Number,
    ID: Number
});

module.exports = mongoose.model("Points", pointsSchema)
