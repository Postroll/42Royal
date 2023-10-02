import User from "../../../models/user.js";
import UserService from "../../../services/userService.js";
import { matchMaker } from '@colyseus/core';
import Judge0Service from "../../../services/judge0Service.js";

const userService = new UserService();
const judge0Service = new Judge0Service();

export default class GameRoomService {
    constructor () {}

    //Identify the user from express-session found in header. Check if the user is in a room
    //and leave this room. Update user data.
    //Params:
    //  rawheader: http header where we extract express-session ID
    //  client: The client instance. Created for the new room
    //  roomID: the roomID
    //return: 1 if there was an issue. 0 otherwise
    async AddRoomData(rawHeaders, client, roomID){
        let user;
        try {
            user = await userService.GetOneFromRawHeaders(rawHeaders);
        }
        catch(e){
            console.log('AddRoomData error getting user '+ e)
            return 1;
        }
         
        if (!user){
            console.log('AuthLogic.GetUser Error: user not found');
            return 1;
        }
        try{
            const sessionID = user?.webSocket?.sessionID;
            if (sessionID){
                const room = matchMaker.getRoomById(user?.webSocket?.roomID);
                if (room)
                    room.clients[0].leave(4000, 'false');
            }
        } catch(e){
            console.log('error when cleaning prev client session: '+e);
        }
        user.webSocket = {
            sessionID: client.sessionId,
            reconnectToken: client._reconnectionToken,
            roomID: roomID,
        }
        await user.updateOne(user);
        // const updatedUser = await userService.GetOneUserLogin(user.login);
        return 0;
    }

    //Identify the user from its websocket id. Delete its room data and update.
    //Params:
    //  client: The client websocketID
    //  code: code returned in the onleave function
    //return: 1 if there was an issue. 0 otherwise. Code 4000 happen when the
    // user created another room and thus his data are already overriden
    async RemoveRoomData(clientWS, code){
        if (code == 4000)
            return 0;
        let user;
        try{
            user = await userService.GetOneFromWebSocket(clientWS);
        }catch(e){
            console.log('RemoveRoomData error getting client '+e)
            return 1;
        }
        if (!user){
            console.log('AuthLogic.RemoveRoomData: user not found.');
            return 1;
        }
        user.webSocket = {
            sessionID: '',
            reconnectToken: '',
            roomID: '',
        }
        await user.updateOne(user);
        // const updatedUser = await userService.GetOneUserLogin(user.login);
        return 0;
    }

    //Fetch user info from his websocket
    //Params:
    //  clientWS: The client webSocketID
    //return: the user data stored in the database
    async GetUserDataFromWS(clientWS){
        let user;
        try{
            user = await userService.GetOneFromWebSocket(clientWS);
        }catch(e){
            console.log('GetUserDataFromWS error getting client '+e)
            return undefined;
        }
        if (!user){
            console.log('GetUserDataFromWS: user not found.');
            return undefined;
        }
        return user;
    }

    //Get the player data from the database to populate the player schema from colyseus
    //Params:
    //  clientWS: The client webSocketID
    //return: the user data needed to populate the player schema from colyseus
    async InitPlayer(clientWS){
        const user = await this.GetUserDataFromWS(clientWS);
        if (user == undefined)
            return null;
        return {username: user.username, elo: user.elo, photo: user.photo, campus: user.campus, country: user.country};
    }

    //
    //Params:
    //  data:
    //  client:
    //  player:
    //return: 
    async ProcessSubmission(data, client, player){
        player.token = await judge0Service.SubmitCode(data);
        if (!player.token)
            return;
        player.repushTimer = 10000;
        player.timer = 1000;
    }

    //
    //Params:
    //  data:
    //  client:
    //  player:
    //return: 
    async ProcessTest(data, client, player){
        player.token = await judge0Service.SubmitCode(data);
        if (!player.token)
            return;
        player.timer = 1000;
    }

    //
    //Params:
    //  token:
    //  client:
    //  instance:
    //return: 
    async GetResult(token, player, instance){
        let ret;
        ret = await judge0Service.GetResult(token);
        player.terminal = JSON.stringify(ret);
        instance.clients.getById(player.sessionId).send("result", JSON.stringify(ret));
        if (ret.status.id > 2){
            player.token = null;
        }
        return ret;
    }
}