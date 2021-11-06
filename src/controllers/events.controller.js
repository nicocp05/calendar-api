const { response } = require('express');
const { Events } = require('../models/Event.model');
const { User } = require('../models/User.model');

const getEvent = async ( req, res = response ) => {

    const events = await Events.findAll({ include: User });

    res.json({
        ok: true,
        msg: 'getEvent',
        events
    });

}

const postEvent = async ( req, res = response ) => {

    const { title, start, end, notes } = req.body;

    try {

        const userUserId = req.userId;
        
        const eventCreated = await Events.create({

            title,
            notes,
            start, 
            end,
            userUserId

        });

        res.json({
            ok: true,
            msg: 'Event created',
            eventCreated
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Event not created'
        });
    }

}

const putEvent = async ( req, res = response ) => {

    const id = req.params.id;

    const userId = req.userId;

    try {

        const event = await Events.findOne({ where: { eventId: id } });

        if(!event) {
            return res.json({
                ok: false,
                msg: 'Event not found'
            });
        }

        if( event.userUserId !== userId ) {

            return res.json({
                ok: false,
                msg: 'Unauthorized user'
            }); 

        }

        const newEvent = {
            ...req.body,
            userUserId: userId
        }

        await Events.update( newEvent, {
            where: {
                eventId: id
            }
        });

        res.json({
            ok: true,
            msg: 'Event updated',
            newEvent
        });
        
    } catch (error) {
        res.json({
            ok: false,
            msg: 'Event not updated'
        });
    }

}

const deleteEvent = async ( req, res = response ) => {

    const id = req.params.id;

    const userId = req.userId;

    try {

        const event = await Events.findOne({ where: { eventId: id } });

        if(!event) {
            return res.json({
                ok: false,
                msg: 'Event not found'
            });
        }

        if( event.userUserId !== userId ) {

            return res.json({
                ok: false,
                msg: 'Unauthorized user'
            }); 

        }

        await Events.destroy({
            where: {
                eventId: id
            }
        });

        res.json({
            ok: true,
            msg: 'Event deleted'
        });
        
    } catch (error) {
        res.json({
            ok: false,
            msg: 'Event not deleted'
        });
    }

}

module.exports = {
    getEvent,
    postEvent,
    putEvent,
    deleteEvent
}