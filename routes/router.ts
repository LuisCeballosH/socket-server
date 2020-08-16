import { Router, Request, Response } from "express";
import Server from "../classes/server";
import { users } from "../sockets/sockets";

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

router.get('/users', (request: Request, response: Response) => {

    server.io.clients((error: any, clients: string[]) => {

        if (error) {
            return response.json({
                ok: false,
                error
            });
        }


        return response.json({
            ok: true,
            clients
        });
    });

});

router.get('/users/detail', (request: Request, response: Response) => {

    
        return response.json({
            ok: true,
            clients: users.get()
        });

});