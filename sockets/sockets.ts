import { Socket } from 'socket.io';
import socketIO from 'socket.io';


export const disconnect = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('disconnect client');
    });
}

export const message = (client: Socket, io: socketIO.Server) => {
    client.on('message', (payload) => {
        console.log(payload);
        io.emit('new-message', payload)
    });
}