import { User } from "./user";

export class Users {
    private users: User[] = [];

    constructor() {

    }

    add(user: User) {
        this.users.push(user);
        console.log(this.users);
        return user;
    }

    update(id: string, name: string) {
        const user = this.users.find(u => u.id === id);
        if (user) {
            user.name = name;
        }
        console.log(this.users);
    }

    get() {
        return this.users;
    }

    getId(id: string) {
        return this.users.find(u => u.id === id);
    }

    getRoom(room: string) {
        return this.users.filter(u => u.room === room);
    }

    delete(id: string) {
        const user = this.getId(id);
        this.users = this.users.filter(u => u.id !== id);
        console.log(this.users)
        return user;
    }
}