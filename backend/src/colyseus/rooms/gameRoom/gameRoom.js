import colyseus from "colyseus";
// import { defineTypes, MapSchema, ArraySchema, Schema } from '@colyseus/schema';

import Game from "../../Schema/gameSchema.js";
import Player from '../../Schema/playerSchema.js';
import ChatMessage from '../../Schema/chatMessageSchema.js'

import AuthLogic from "./authLogic.js";
import GameRoomService from "./gameRoomService.js";


const authLogic = new AuthLogic();
const gameRoomService = new GameRoomService();

export class gameRoom extends colyseus.Room {
    // When room is initialized
    onCreate (options) {
        this.setState(new Game());

        this.onMessage("chat", (client, data) => {
            console.log(data);
            const player = this.state.players.get(client.sessionId);
            // this.state.chat.push(new ChatMessage(player.username, player.photo, data));
            this.broadcast("chat", player.username+'``` '+data)
        });
    }

    // Authorize client based on provided options before WebSocket handshake is complete
    async onAuth (client, options, request) {
        const ret = await authLogic.AddRoomData(request.rawHeaders, client, this.roomId);
        if (ret)
            return false;
        return true;
    }

    // When client successfully join the room
    async onJoin (client, options, auth) {
        const {username, elo, photo, country, campus} = await gameRoomService.InitPlayer(client.id);
        this.state.players.set(client.sessionId, new Player(username, elo, photo, country, campus));
    }

    // When a client leaves the room
    async onLeave (client, consented) {
        // flag client as inactive for other users
        const code = client.ref._closeCode;
        this.state.players.get(client.sessionId).connected = false;
        try {
            if (consented || code === 4000){
                console.log('consented leave');
                throw new Error("consented leave");
            }
            // allow disconnected client to reconnect into this room until 20 seconds
            await this.allowReconnection(client, 20);
            // client returned! let's re-activate it.
            this.state.players.get(client.sessionId).connected = true;
        } catch (e) {
            // 20 seconds expired. let's remove the client.
            await authLogic.RemoveRoomData(client.sessionId, code);
            this.state.players.delete(client.sessionId);
            console.log('leaving room');
        }  
    }

    // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
    onDispose () { }
}