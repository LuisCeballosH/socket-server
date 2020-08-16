import express from 'express';
import { serverPort } from '../global/environment';
import io from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';


export default class Server {

    public app: express.Application;
    public port: number;
    public io: io.Server;
    private httpServer: http.Server;
    private static _instance: Server;

    private constructor() {
        this.app = express();
        this.port = serverPort;
        this.httpServer = new http.Server(this.app);
        this.io = io(this.httpServer);
        this.hearSocket();
    }

    public static getInstance() {
        return this._instance || (this._instance = new this());
    }

    private hearSocket() {
        // console.log('hearSocket');
        this.io.on('connection', client => {
            // console.log('connection client');
            // console.log(client.id);
            socket.connection(client, this.io);
            socket.login(client, this.io);
            socket.getUsers(client, this.io);
            socket.message(client, this.io);
            socket.disconnect(client,this.io);
        });
    }

    start(callback: any) {
        this.httpServer.listen(this.port, callback);
    }
}