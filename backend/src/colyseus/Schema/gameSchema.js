import { defineTypes, MapSchema, ArraySchema, Schema } from '@colyseus/schema';
import Player from './playerSchema.js';
import ChatMessage from './chatMessageSchema.js'

export default class Game extends Schema {
    constructor() {
        super();
        this.players = new MapSchema();
        this.chat = new ArraySchema();
        this.readyCount = 0;
        this.statusCode = 0;
        this.status = "Waiting...";
        this.timer = 0;
    }
}
defineTypes(Game, {
    players: { map: Player },
    chat: [ ChatMessage ],
    readyCount: "number",
    statusCode: "number",
    status: "string",
    timer: "number",
});