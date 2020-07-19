import Server from "./classes/server";
import { router } from "./routes/router";
import bodyParser from "body-parser";
import cors from "cors";

const server = new Server();

// parse application/x-www-form-urlencoded
server.app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
server.app.use(bodyParser.json());

server.app.use(cors({ origin: true, credentials: true }));

server.app.use('/', router);

server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
})