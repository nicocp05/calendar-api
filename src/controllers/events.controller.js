const { response } = require('express');
const { Events } = require('../models/Event.model');
const { User } = require('../models/User.model');

const getEvent = async ( req, res = response ) => {

    const events = await Events.findAll({ include: User });

    res.json({
        ok: true,
        msg: 'Eventos obtenidos',
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
            msg: 'Evento creado',
            eventCreated
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Evento no creado'
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
                msg: 'Evento no encontrado'
            });
        }

        if( event.userUserId !== userId ) {

            return res.json({
                ok: false,
                msg: 'Usuario no autorizado'
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
            msg: 'Evento actualizado',
            newEvent
        });
        
    } catch (error) {
        res.json({
            ok: false,
            msg: 'Evento no actualizado'
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
                msg: 'Evento no encontrado'
            });
        }

        if( event.userUserId !== userId ) {

            return res.json({
                ok: false,
                msg: 'Usuario no autorizado'
            }); 

        }

        await Events.destroy({
            where: {
                eventId: id
            }
        });

        res.json({
            ok: true,
            msg: 'Evento eliminado'
        });
        
    } catch (error) {
        res.json({
            ok: false,
            msg: 'Evento no eliminado'
        });
    }

}

module.exports = {
    getEvent,
    postEvent,
    putEvent,
    deleteEvent
}