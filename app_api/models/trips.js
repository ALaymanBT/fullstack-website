const mongoose = require('mongoose');

const tripsSchema = new mongoose.Schema({
    code: {type: String, required: true, indexed: true},
    name: {type: String, required: true, indexed: true},
    length: {type: String, required: true},
    start: {type: String, required: true},
    resort: {type: String, required: true},
    perPerson: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true}
});

module.export = {
    trips: mongoose.model('trips', tripsSchema)
};