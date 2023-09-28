import User from "../models/user.js";
import UserService from "../services/userService.js";
import { matchMaker } from '@colyseus/core';

const userService = new UserService();

export default class AuthLogic {
    constructor () {}

    //Identify the user from express-session found in header. Check if the user is in a room
    //and leave this room. Update user data.
    //Params:
    //  rawheader: http header where we extract express-session ID
    //  client: The client instance. Created for the new room
    //  roomID: the roomID
    //return: 1 if there was an issue. 0 otherwise
    async GetUser(rawHeaders, client, roomID){
        const user = await userService.GetOneFromRawHeaders(rawHeaders);
        
        if (!user){
            console.log('AuthLogic.GetUser Error: user not found');
            return 1;
        }
        console.log('-----------------------')
        console.log('old user')
        console.log(user.webSocket);
        console.log('-----------------------')
        try{
            const sessionID = user?.webSocket?.sessionID;
            if (sessionID){
                const test = matchMaker.getRoomById(user?.webSocket?.roomID);
                test.clients[0].leave(4000, 'false');
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
        const updatedUser = await userService.GetOneUserLogin(user.login);
        return 0;
    }
}