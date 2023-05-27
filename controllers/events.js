const {Request, Response} = require('express');
const Event = require('../models/Event');

const getEvents = async (request = Request, response = Response) => {

    const events = await Event.find().populate('user', 'name');

    response.status(200).json({
        ok: true,
        events
    });
}

const createEvent = async (request = Request, response = Response) => {

    const event = new Event(request.body);

    try {
        event.user = request.uid;

        await event.save()

        response.status(200).json({
        ok: true,
        event
    });

    } catch (err) {
        console.log(err);
        response.status(500).json({
            ok: false,
            msg: 'Contact to administrator!!!'
        });
    }
}

const updateEvent = async (request = Request, response = Response) => {

    // const {id} = request.params;
    const eventId = request.params.id;
    const uid = request.uid;

    try {

        const event = await Event.findById(eventId);

        if (!event) {
            return response.status(404).json({
               ok: false,
               msg: 'event not found!!!'
            });
        }

        if (event.user.toString() !== uid) {
            return response.status(401).json({
               ok: false,
               msg: 'do not have permission to update event!!!'
            });
        }

        const newEvent = {
            ...request.body,
            user: uid
        }

        const eventUpdate = await Event.findByIdAndUpdate(eventId, newEvent, {new: true});

        response.status(200).json({
            ok: true,
            msg: 'updateEvent',
            event: eventUpdate
        });

    } catch (err) {
        console.log(err);
        response.status(500).json({
            ok: false,
            msg: 'Contact to administrator!!!'
        });
    }
}
const deleteEvent = async (request = Request, response = Response) => {

    // const {id} = request.params;
    const eventId = request.params.id;
    const uid = request.uid;

try {

        const event = await Event.findById(eventId);

        if (!event) {
            return response.status(404).json({
               ok: false,
               msg: 'event not found!!!'
            });
        }

        if (event.user.toString() !== uid) {
            return response.status(401).json({
               ok: false,
               msg: 'do not have permission to delete event!!!'
            });
        }

        await Event.findByIdAndDelete(eventId);

        response.status(200).json({
            ok: true,
            msg: 'event delete',
            eventId
        });

    } catch (err) {
        console.log(err);
        response.status(500).json({
            ok: false,
            msg: 'Contact to administrator!!!'
        });
    }
}



module.exports = {
    createEvent,
    deleteEvent,
    getEvents,
    updateEvent,
}