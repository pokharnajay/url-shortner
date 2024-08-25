const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// mongodb connection
mongoose.connect("mongodb://localhost:27017/urldb");

// Define the url schema
const urlSchema = new Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    visitHistory: [{
        timestamp: { type: Number }
    }]
});

// Exporting the url schema
module.exports = mongoose.model('url', urlSchema);
