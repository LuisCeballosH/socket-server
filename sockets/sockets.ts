import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { Users } from '../classes/users';
import { User } from '../classes/user';

export const users = new Users();

export const connection = (client: Socket) => {
    const user = new User(client.id);
    users.add(user);
}
export const disconnect = (client: Socket) => {
    client.on('disconnect', () => {
        // console.log('disconnect client');
        users.delete(client.id);
    });
}

export const message = (client: Socket, io: socketIO.Server) => {
    client.on('message', (payload) => {
        console.log(payload);
        io.emit('new-message', payload);
    });
}

export const login = (client: Socket, io: socketIO.Server) => {
    client.on('settings-user', (payload, callback) => {
        // console.log(payload.email);
        // io.emit('new-message', payload);
        users.update(client.id, payload.email)
        callback({
            ok: true,
            message: payload.email
        })

    });
}