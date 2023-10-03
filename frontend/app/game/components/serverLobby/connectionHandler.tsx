const reconnect = async (reconnectionToken: any, roomID: string, client: any, setCurrentRoom: Function) =>{
    console.log('reconnect called: '+ reconnectionToken);
    if (!client || !reconnectionToken || !roomID)
        return;
    if (!client)
        return;
    fetch('http://localhost:5000/game/reconnect', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({roomID: roomID, options: {'reconnectionToken': reconnectionToken}}),
    })
    .then((res) => res.json())
    .then((data) => {
        const status: string = data?.status;
        const newReservation = {room: data?.reservation?.room, sessionId: data?.reservation?.sessionId, reconnectionToken: localStorage.getItem('reconnectionToken')}
        if (status == 'success')
            consumeReservation(newReservation, client, setCurrentRoom);
    else
        console.log('createRoom error');
    })
    .catch((e) => console.log('error when fetching user data: '+e));
}

const createRoom = (client: any, setCurrentRoom: Function, option: Object) =>{
    console.log('create room: '+client);
    if (!client)
        return;
    fetch('http://localhost:5000/game/create', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({roomName: "gameRoom", options: option}),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        const status: string = data?.status;
        const reservation: object = data?.reservation;
        if (status == 'success')
            consumeReservation(reservation, client, setCurrentRoom);
    else
        console.log('createRoom error');
    })
    .catch((e) => console.log('error when fetching user data: '+e));
}

const consumeReservation = async (reservation: object, client: any, setCurrentRoom: Function) =>{
    if (!client)
        return;
    try {
        const room = await client.consumeSeatReservation(reservation);
        console.log("consumeReservation successfully");
        setCurrentRoom(room);
        const reconnectionToken = room.reconnectionToken.substring(room.reconnectionToken.indexOf(':') + 1, room.reconnectionToken.length);
        localStorage.setItem('reconnectionToken', reconnectionToken);
        console.log('reconnection token stored: '+ reconnectionToken);
    } catch (e) {
        console.log("consumeReservation", e);
    }
}

const joinByID = (roomID: number, client: any, setCurrentRoom: Function) =>{
    if (!client)
    return;
    fetch('http://localhost:5000/game/joinID', {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({roomID: roomID, options: ''}),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        const status: string = data?.status;
        const reservation: object = data?.reservation;
        if (status == 'success')
            consumeReservation(reservation, client, setCurrentRoom);
        else
            console.log('createRoom error');
    })
    .catch((e) => console.log('error when fetching user data: '+e));
}

const join = (client: any, setCurrentRoom: Function) =>{
    if (!client)
        return;
    fetch('http://localhost:5000/game/join', {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({roomName: "gameRoom", options: ''}),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        const status: string = data?.status;
        const reservation: object = data?.reservation;
        if (status == 'success')
            consumeReservation(reservation, client, setCurrentRoom);
        else
            console.log('createRoom error');
    })
    .catch((e) => console.log('error when fetching user data: '+e));
}

const leave = (currentRoom: any, setCurrentRoom: Function) => {
    try{
        currentRoom.leave();
    }catch(e){
        console.log('connectionHandler leave: error when trying to leave room '+e)
    }
    setCurrentRoom(undefined);
}

export default {reconnect, createRoom, consumeReservation, join, joinByID, leave};

