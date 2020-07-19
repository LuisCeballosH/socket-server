import { Router, Request, Response } from "express";

export const router = Router();

router.get('/message', (request: Request, response: Response) => {

    return response.json({
        ok: true,
        message: 'Excelente - GET'
    })
});

router.post('/message', (request: Request, response: Response) => {

    let data = request.body;
    return response.json({
        ok: true,
        message: 'Excelente - POST',
        data
    })
});

router.post('/message/:id', (request: Request, response: Response) => {

    let data = request.body;
    let id = request.params.id;

    return response.json({
        ok: true,
        message: 'Excelente - POST',
        data,
        id
    })
});