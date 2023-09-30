'use client'
import { useEffect, useRef, useState } from 'react';
import * as Colyseus from "colyseus.js";

import GameLobbyComponent from './components/gameLobby/gameLobbyComponent';
import GameComponent from './components/game/gameComponent';
import TableGame from '@/components/game/tableGame';

import connectionHandler from './components/serverLobby/connectionHandler'

import IUser from '../../utils/IUser'

export default function Game(){
    const [client, setClient] = useState<any>();
    const initializedLobby = useRef(false);
    const [rooms, setRooms] = useState<Array<any>>([]);
    const [count, setCount] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [user, setUser] = useState<IUser>();
    const [currentRoom, setCurrentRoom] = useState<any>();

    useEffect(() => {
        if (!initializedLobby.current)
            fetchUser();
        if (!initializedLobby.current && !client){
            console.log('create client');
            initializedLobby.current = true;
            setClient(new Colyseus.Client('ws://localhost:5000'));
        };
        initializedLobby.current = true;
    }, [])

    useEffect(() => {
        const myInterval = setInterval(() =>{
            if (!client)
                return;
            try{
                updateRooms();
            } catch(e){
                console.log(e);
            }
        }, 3000);
        return () => clearInterval(myInterval);
    }, [rooms])

    useEffect(()=>{
        loadList();
    },[client])

    useEffect(()=>{
        if (!user)
            return;
        const reconnectionToken = localStorage.getItem('reconnectionToken');
        const roomID: string = user?.webSocket?.roomID;
        localStorage.setItem('reconnectionToken', reconnectionToken ? reconnectionToken : '');
        // reconnect(reconnectionToken, roomID);
        connectionHandler.reconnect(reconnectionToken, roomID, client, setCurrentRoom);
    }, [user])

    const updateRooms = async() =>{
        try{
            const ret = await client.getAvailableRooms(); 
            setRooms(ret);
        } catch(e){
            console.log('Could not fetch rooms. Is the server down?')
        }
        
    }

    const loadList = async() =>{
        console.log('load list if client: '+client)
        console.log(rooms)
        if (!client)
            return;
        try{
            // setLobby(await client.joinOrCreate("lobby"));
            setRooms(await client.getAvailableRooms())
        } catch(e){
            console.log(e);
        }
    }

    const fetchUser = async () =>{
        fetch('http://localhost:5000/user/me', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((data: Object) => {
            setUser(data as IUser)
        })
        .catch((e) => console.log('error when fetching user data: '+e));
    }

    // const reconnect = async (reconnectionToken: any, roomID: string) =>{
    //     if (!client || !reconnectionToken || !roomID)
    //         return;
    //     if (!client)
    //         return;
    //     fetch('http://localhost:5000/game/reconnect', {
    //     method: 'POST',
    //     credentials: 'include',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({roomID: roomID, options: {'reconnectionToken': reconnectionToken}}),
    //     })
    //     .then((res) => res.json())
    //     .then((data) => {
    //         const status: string = data?.status;
    //         const newReservation = {room: data?.reservation?.room, sessionId: data?.reservation?.sessionId, reconnectionToken: localStorage.getItem('reconnectionToken')}
    //         if (status == 'success')
    //             consumeReservation(newReservation);
    //         else
    //             console.log('createRoom error');
    //     })
    //     .catch((e) => console.log('error when fetching user data: '+e));
    // }

    // const createRoom = () =>{
    //     console.log('create room: '+client);
    //     if (!client)
    //         return;
    //     fetch('http://localhost:5000/game/create', {
    //     method: 'POST',
    //     credentials: 'include',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({roomName: "gameRoom", options: ''}),
    //     })
    //     .then((res) => res.json())
    //     .then((data) => {
    //         console.log(data);
    //         const status: string = data?.status;
    //         const reservation: object = data?.reservation;
    //         if (status == 'success')
    //             consumeReservation(reservation);
    //         else
    //             console.log('createRoom error');
    //     })
    //     .catch((e) => console.log('error when fetching user data: '+e));
    // }

    // const consumeReservation = async (reservation: object) =>{
    //     if (!client)
    //     return;
    //     try {
    //         const room = await client.consumeSeatReservation(reservation);
    //         console.log("consumeReservation successfully");
    //         setCurrentRoom(room);
    //         console.log(room);
    //         const reconnectionToken = room.reconnectionToken.substring(room.reconnectionToken.indexOf(':') + 1, room.reconnectionToken.length);
    //         localStorage.setItem('reconnectionToken', reconnectionToken);
    //     } catch (e) {
    //         console.log("consumeReservation", e);
    //     }
    // }

    // const joinByID = (roomID: number) =>{
    //     if (!client)
    //     return;
    //     fetch('http://localhost:5000/game/joinID', {
    //     method: 'POST',
    //     credentials: 'include',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({roomID: roomID, options: ''}),
    //     })
    //     .then((res) => res.json())
    //     .then((data) => {
    //         console.log(data);
    //         const status: string = data?.status;
    //         const reservation: object = data?.reservation;
    //         if (status == 'success')
    //             consumeReservation(reservation);
    //         else
    //             console.log('createRoom error');
    //     })
    //     .catch((e) => console.log('error when fetching user data: '+e));
    // }

    // const join = () =>{
    //     if (!client)
    //         return;
    //     fetch('http://localhost:5000/game/join', {
    //     method: 'POST',
    //     credentials: 'include',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({roomName: "gameRoom", options: ''}),
    //     })
    //     .then((res) => res.json())
    //     .then((data) => {
    //         console.log(data);
    //         const status: string = data?.status;
    //         const reservation: object = data?.reservation;
    //         if (status == 'success')
    //             consumeReservation(reservation);
    //         else
    //             console.log('createRoom error');
    //     })
    //     .catch((e) => console.log('error when fetching user data: '+e));
    // }

    const joinByIDproxy = async (roomID: number) =>{
        connectionHandler.joinByID(roomID, client, setCurrentRoom)
    }

    return (
        <div className='max-h-screen max-w-screen h-screen w-screen pt-14 bg-[#190C38] flex flex-col'>
            {/* <GameLobbyComponent /> */}
            <TableGame setPage={setPage} page={page} count={count} rooms={rooms} refresh={loadList} joinByID={joinByIDproxy}/>
            <div className='flex gap-4'>
                <button className='text-white text-xl bg-slate-500' onClick={()=>connectionHandler.join(client, setCurrentRoom)}>Join</button>
                <button className='text-white text-xl bg-slate-500' onClick={() =>console.log('test')}>Join by ID</button>
                <button className='text-white text-xl bg-slate-500' onClick={()=>connectionHandler.createRoom(client, setCurrentRoom)}>Create</button>
            </div>
            {/* {
                currentRoom == undefined ? (
                    ''
                ) : (
                    <div className='text-white'>
                        room
                    </div>
                )
            } */}
        </div>
    )
}