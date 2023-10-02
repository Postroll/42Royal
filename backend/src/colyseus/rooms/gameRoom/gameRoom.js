import colyseus from "colyseus";
import { defineTypes, MapSchema, ArraySchema, Schema } from '@colyseus/schema';

import Game from "../../Schema/gameSchema.js";
import ChatMessage from "../../Schema/chatMessageSchema.js";
import Player from '../../Schema/playerSchema.js';

import AuthLogic from "./authLogic.js";
import GameRoomService from "./gameRoomService.js";


const authLogic = new AuthLogic();
const gameRoomService = new GameRoomService();

export class gameRoom extends colyseus.Room {
    // When room is initialized
    onCreate (options) {
        this.setState(new Game());
        this.setSimulationInterval((deltaTime) => this.update(deltaTime));
        //relay chat message to all clients
        this.onMessage("chat", (client, data) => {
            console.log(data);
            const player = this.state.players.get(client.sessionId);
            this.state.chat.push(new ChatMessage(player.username, player.photo, data));
        });

        //update individual client readyState and in case all clients are ready change game status
        this.onMessage("readyState", (client, data) => {
            this.state.statusCode = 0;
            this.state.status = "Waiting..."
            const player = this.state.players.get(client.sessionId);
            if (player.state != data)
                this.state.readyCount +=  (data ? 1 : -1);
            player.state = data;
            if (this.state.readyCount == this.state.players.size){
                this.state.statusCode = 1;
                this.state.timer = 5500;
            }
        });
        this.onMessage("submission", (client, data) => {

        });
    }
    update (deltaTime) { 
        if (this.state.statusCode == 1){
            this.state.timer -= deltaTime;
            this.state.status = "Game starting in " + Math.round(this.state.timer/1000);
            if (this.state.timer < 0){
                this.state.statusCode = 2; 
                this.lock();
            }
        }
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
        this.state.chat.push(new ChatMessage(username, photo, 'Joined the game!'));
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
            const player = this.state.players.get(client.sessionId);
            this.state.players.delete(client.sessionId);
            this.state.chat.push(new ChatMessage(player.username, player.photo, 'Left the game!'));
            console.log('leaving room');
        }  
    }

    // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
    onDispose () { }
}