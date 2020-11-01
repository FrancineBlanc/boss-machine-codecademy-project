const express = require('express');
const { getAllFromDatabase, addToDatabase, createMeeting, deleteAllFromDatabase } = require('./db');

const meetingsRouter = express.Router();

meetingsRouter.get('/', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings');
    if (meetings) {
        res.status(200).send(meetings);
    } else {
        res.status(404).send();
    }
});

meetingsRouter.post('/', (req, res, next) => {
    const meetingData = createMeeting();
    const newMeeting = addToDatabase('meetings', meetingData);
    if (newMeeting) {
        res.status(201).send(newMeeting);
    } else {
        res.status(404).send();
    }   
});

meetingsRouter.delete('/', (req, res, next) => {
    const deleteMeetings = deleteAllFromDatabase('meetings');
    if (deleteMeetings) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

module.exports = meetingsRouter;