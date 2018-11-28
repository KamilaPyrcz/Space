var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var tripModel = new Schema(
    {
        destination: { type: String },
        data: { type: String },
        type: { type: String },
        price: { type: String },
    },
    { collection: 'spaceTrips' });

module.exports = mongoose.model('Trip', tripModel);