import colyseus from "colyseus";
import { defineTypes, MapSchema, ArraySchema, Schema } from '@colyseus/schema';

import Game from "../../Schema/gameSchema.js";
import ChatMessage from "../../Schema/chatMessageSchema.js";
import Player from '../../Schema/playerSchema.js';
import Problem from "../../Schema/problemSchema.js";

import AuthLogic from "./authLogic.js";
import GameRoomService from "./gameRoomService.js";

const authLogic = new AuthLogic();
const gameRoomService = new GameRoomService();

export class gameRoom extends colyseus.Room {
    constructor(){
        super();
        this.problems = [];
    }
    // When room is initialized
    async onCreate (options) {
        console.log(options)
        this.setState(new Game(options.gameType, options.language, options.theme, parseInt(options.numberOfQuestions), options.private, parseInt(options.timeLimit)));
        this.setSimulationInterval((deltaTime) => this.update(deltaTime));
        this.maxClients = options.playerLimit;
        this.setPrivate(options.private);
        this.problems = await gameRoomService.FetchProblems(options);
        if (!this.problems || this.problems == undefined){
            this.lock();
            this.maxClients = 0;
            setTimeout(() => {
                this.disconnect();
            }, 100);
        }
        this.problems.forEach((problem) =>{
            this.state.problems.push(new Problem(problem.title, problem.description, "man"));
        })

        //relay chat message to all clients
        this.onMessage("chat", (client, data) => {
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
                this.state.timer = 2500;
            }
        });

        this.onMessage("submission", async (client, data) => {
            let player = this.state.players.get(client.sessionId);
            if (player.token || player.repushTimer > 0){
                console.log('token or timer not settled')
                return;
            }
            gameRoomService.ProcessSubmission(data, client, player, this.problems[player.score]);
        });

        this.onMessage("test", (client, data) => {
            let player = this.state.players.get(client.sessionId);
            if (player.token){
                console.log('token or timer not settled')
                return;
            }
            gameRoomService.ProcessTest(data, client, player);
        });
    }

    update (deltaTime) {
        if (this.state.timer >= 0)
            this.state.timer -= deltaTime;
        if (this.state.timer < 0 && this.state.statusCode == 2){
            this.state.statusCode = 3;
            this.state.status = "The game ended!"
            return;
        }
        else if (this.state.statusCode == 1){
            this.state.status = "Game starting in " + Math.round(this.state.timer/1000);
            if (this.state.timer < 0){
                this.state.statusCode = 2; 
                this.state.timer = this.state.timeLimit * 1000 * 60;
                this.lock();
            }
        }
        this.state.players.forEach(player => { 
            if (player.repushTimer >= 0)
                player.repushTimer -= deltaTime;
            if (player.timer >= 0)
                player.timer -= deltaTime;
            if (player.token && player.timer < 0){
                player.timer = 1000;
                gameRoomService.GetResult(player.token, player, this);
            }
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
        this.state.players.set(client.sessionId, new Player(client.sessionId, username, elo, photo, country, campus));
        this.state.chat.push(new ChatMessage(username, photo, 'Joined the game!'));
    }

    // When a client leaves the room
    async onLeave (client, consented) {
        // flag client as inactive for other users
        const code = client.ref._closeCode;
        this.state.players.get(client.sessionId).connected = false;
        try {
            // if (consented || code === 4000 || this.state.statusCode == 3){
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
    onDispose () {
        console.log("dispose");
    }
}