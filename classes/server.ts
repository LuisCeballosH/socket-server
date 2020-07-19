import express from 'express';
import { serverPort } from '../global/environment';

export default class Server {

    public app: express.Application;
    public port: number;

    constructor() {
        this.app = express();
        this.port = serverPort;
    }

    start(callback: any) {
        this.app.listen(this.port, callback);
    }
}