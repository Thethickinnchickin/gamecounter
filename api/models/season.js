const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seasonSchema = new Schema({
    name: String,
    wins: Number,
    pointsId: {
        type: Schema.Types.ObjectId,
        required: true
    },
 });

 module.exports = mongoose.model("Season", seasonSchema)