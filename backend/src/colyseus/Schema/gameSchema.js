import { defineTypes, MapSchema, ArraySchema, Schema } from '@colyseus/schema';
import Player from './playerSchema.js';
import ChatMessage from './chatMessageSchema.js'

export default class Game extends Schema {
    constructor() {
        super();
        this.players = new MapSchema();
        this.chat = new ArraySchema();
    }
}
defineTypes(Game, {
    players: { map: Player },
    chat: [ ChatMessage ],
});