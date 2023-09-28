import colyseus from "colyseus";
import AuthLogic from "./authLogic.js";
import { Schema } from '@colyseus/schema';
import { defineTypes, MapSchema } from '@colyseus/schema';

class Player extends Schema {
    
}

defineTypes(Player , {
    x: "number"
});

export class State extends Schema {
    constructor() {
        super();
        this.players = new MapSchema();
    }
}
defineTypes(State, {
    players: { map: Player }
});

const authLogic = new AuthLogic();

export class gameRoom extends colyseus.Room {
    // When room is initialized
    onCreate (options) {
        this.setState(new State());
    }

    // Authorize client based on provided options before WebSocket handshake is complete
    async onAuth (client, options, request) {
        const ret = await authLogic.GetUser(request.rawHeaders, client, this.roomId);
        if (ret)
            return false;
        return true;
    }

    // When client successfully join the room
    onJoin (client, options, auth) {
        this.state.players.set(client.sessionId, new Player());
    }

    // When a client leaves the room
    async onLeave (client, consented) {
        // flag client as inactive for other users
        console.log('-------------')
        console.log('deteced onleave');
        console.log(consented)
        console.log(client.ref._closeCode)
        console.log('-------------')
        this.state.players.get(client.sessionId).connected = false;
        try {
            if (consented || client.ref._closeCode === 4000){
                console.log('consented leave');
                throw new Error("consented leave");
            }
            // allow disconnected client to reconnect into this room until 20 seconds
            await this.allowReconnection(client, 20);
            // client returned! let's re-activate it.
            this.state.players.get(client.sessionId).connected = true;
        } catch (e) {
            // 20 seconds expired. let's remove the client.
            this.state.players.delete(client.sessionId);
            console.log('leaving room');
        }  
    }

    // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
    onDispose () { }
}