import { defineTypes, Schema } from '@colyseus/schema';

export default class ChatMessage extends Schema {
    constructor(username, photo, message){
        super();
        this.username = username;
        this.photo = photo;
        this.message = message;
    }
}

defineTypes(ChatMessage , {
    username: "string",
    photo: "string",
    message: "string",
});