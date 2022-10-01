const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pointsSchema = new Schema({
    warzone: [{
        type: Schema.ObjectId,
        ref: 'Season'
    }],
    fallguys: [{
        type: Schema.ObjectId,
        ref: 'Season'
    }],
    ID: Number
});

module.exports = mongoose.model("Points", pointsSchema)
