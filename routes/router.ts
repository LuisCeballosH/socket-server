import { Router, Request, Response } from "express";
import Server from "../classes/server";

export const router = Router();


const server = Server.getInstance();

router.get('/message', (request: Request, response: Response) => {

    return response.json({
        ok: true,
        message: 'Excelente - GET'
    })
});

router.post('/message', (request: Request, response: Response) => {

    let data = request.body;
    

    const payload = {
        user: data.from,
        message: data.message
    }

    server.io.emit('new-message', payload);
    return response.json({
        ok: true,
        message: 'Excelente - POST',
        data
    })
});

router.post('/message/:id', (request: Request, response: Response) => {

    let data = request.body;
    let id = request.params.id;

    const payload = {
        user: data.from,
        message: data.message
    }

    server.io.in(id).emit('private-message', payload);

    return response.json({
        ok: true,
        message: 'Excelente - POST',
        data,
        id
    })
});