import { matchMaker } from '@colyseus/core';

//handle matchmaking request made by clients
export default class GameService{
    constructor(){}

    //Create a new room and return client seat reservation.
    //Parameters:
    //  roomName: the identifier you defined on gameServer.define().
    //  options: options for onCreate.
    async CreateRoom(roomName, option){
        // console.log(option);
        try{
            const reservation = await matchMaker.create(roomName, option);
            if (!reservation)
                return {status: 'failure', reservation: null}
            return {status: 'success', reservation: reservation}
        } catch(e){
            console.log('CreateRoom error: '+e);
            return {status: 'failure', reservation: null}
        }
    }

    //Join a room and return seat reservation. An exception is thrown if there are no rooms available for roomName.
    //Parameters:
    //  roomName: the identifier you defined on gameServer.define().
    //  options: options for the client seat reservation (for onJoin/onAuth).
    async JoinRoom(roomName, option){
        try{
            const reservation = await matchMaker.join(roomName, option);
            if (!reservation)
                return {status: 'failure', reservation: null}
            return {status: 'success', reservation: reservation}
        } catch(e){
            console.log('JoinRoom error: '+e);
            return {status: 'failure', reservation: null}
        }
    }

    //Join a room by id and return client seat reservation. An exception is thrown if a room is not found for roomId.
    //Parameters:
    //  roomId: the id of a specific room instance.
    //  options: options for the client seat reservation (for onJoin/onAuth).
    async JoinRoomByID(roomId, option){
        console.log('JoinRoomByID')
        try{
            const reservation = await matchMaker.joinById(roomId, option);
            if (!reservation)
                return {status: 'failure', reservation: null}
            return {status: 'success', reservation: reservation}
        } catch(e){
            console.log('JoinRoomByID error: '+e);
            return {status: 'failure', reservation: null}
        }
    }

    //Reconnect to the previous room. MatchMaker make the call on the room which may throw an error if the reconnectionToken is wrong.
    //The client send his reconnectionToken. On success a seat reservation is returned.
    //Parameters:
    //  roomId: the id of a specific room instance
    //  option: contains the reconnectionTOken stored by the client.
    async Reconnect(roomId, option){
        console.log('Reconnect')
        try{
            const reservation = await matchMaker.reconnect(roomId, option);
            console.log(reservation);
            if (!reservation)
                return {status: 'failure', reservation: null}
            return {status: 'success', reservation: reservation}
        } catch(e){
            console.log('Reconnect errorr: '+e);
            return {status: 'failure', reservation: null}
        }
    }
}