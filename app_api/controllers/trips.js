const mongoose = require('mongoose');
const trips = mongoose.model('trips');

const fetchTrips = async (req, res) => {
    if (!!req.params.tripCode) {
        try {
            res.json(await trips.findOne({ 'code': req.params.tripCode}));
        }
        catch (e) {
            res.status(404).send(`No trip found for code ${req.params.tripCode}`);
        }
        return;
    }

    res.json(await trips.find({}));
};

const addTrip = async (req, res) => {
    const newTrip = req.body;

    if (!newTrip) {
        // Respond with status code 400 BAD REQUEST if no trip was sent
        res.status(400).send('No trip found in body of request');
        return;
    }

    try {
        const savedTrip = await trips.create(newTrip);
        
        // Respond with status code 201 CREATED and newly added trip json data
        res.status(201).json(savedTrip);
    }
    catch (e) {
        // Respond with status code 400 BAD REQUEST and the exception if the trip could not be created
        res.status(400).json(e);
    }
};

const updateTrip = async (req, res) => {
    const tripCode = req.params.tripCode;
    let trip = req.body;

    trip = Object.assign(trip, {tripCode});

    try {
        const updatedTrip = await trips.findOneAndUpdate({'code' : tripCode}, trip, {new: true});

        if (updatedTrip == null) {
            res.status(404).send({message : `No trip was found for code: ${tripCode}`});
            return;
        }

        res.status(200).json(updatedTrip);
    }
    catch (e) {
        res.status(500).json(e);
    }
}

const deleteTrip = async (req, res) => {
    const tripCode = req.params.tripCode;
   
    try {
        const deletedTrip = await trips.findOneAndRemove({'code' : tripCode});

        if (deletedTrip == null) {
            res.status(404).send({message : `No trip was found for code: ${tripCode}`});
            return;
        }

        res.status(200).send({message: `Deleted trip: ${tripCode}`});
    }
    catch (e) {
        res.status(500).json(e);
    }

}

module.exports = {
    fetchTrips,
    addTrip,
    updateTrip,
    deleteTrip
};