'use client'
import { useEffect, useRef, useState } from 'react';
import Splitter, { SplitDirection } from '@devbookhq/splitter'
import * as Colyseus from "colyseus.js";

import Lobby from '@/components/lobby'
import TableGame from '@/components/game/tableGame';

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
        reconnect(reconnectionToken, roomID);
    }, [user])

    const updateRooms = async() =>{
        setRooms(await client.getAvailableRooms())
    }

    const loadList = async() =>{
        console.log('load list if client: '+client)
        console.log(rooms)
        console.log('page '+page)
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

    const reconnect = async (reconnectionToken: any, roomID: string) =>{
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
                consumeReservation(newReservation);
            else
                console.log('createRoom error');
        })
        .catch((e) => console.log('error when fetching user data: '+e));
    }

    const createRoom = () =>{
        console.log('create room: '+client);
        if (!client)
            return;
        fetch('http://localhost:5000/game/create', {
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
                consumeReservation(reservation);
            else
                console.log('createRoom error');
        })
        .catch((e) => console.log('error when fetching user data: '+e));
    }

    const consumeReservation = async (reservation: object) =>{
        if (!client)
        return;
        try {
            const room = await client.consumeSeatReservation(reservation);
            console.log("consumeReservation successfully");
            setCurrentRoom(room);
            console.log(room);
            const reconnectionToken = room.reconnectionToken.substring(room.reconnectionToken.indexOf(':') + 1, room.reconnectionToken.length);
            localStorage.setItem('reconnectionToken', reconnectionToken);
        } catch (e) {
            console.log("consumeReservation", e);
        }
    }

    const joinByID = (roomID: number) =>{
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
                consumeReservation(reservation);
            else
                console.log('createRoom error');
        })
        .catch((e) => console.log('error when fetching user data: '+e));
    }

    const join = () =>{
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
                consumeReservation(reservation);
            else
                console.log('createRoom error');
        })
        .catch((e) => console.log('error when fetching user data: '+e));
    }

    return (
        <div className='max-h-screen max-w-screen h-screen w-screen pt-14 bg-slate-800 flex flex-col'>
            <TableGame setPage={setPage} page={page} count={count} rooms={rooms} refresh={loadList} joinByID={joinByID}/>
            <div className='flex gap-4'>
                <button className='text-white text-xl bg-slate-500' onClick={join}>Join</button>
                <button className='text-white text-xl bg-slate-500' onClick={() =>console.log('test')}>Join by ID</button>
                <button className='text-white text-xl bg-slate-500' onClick={createRoom}>Create</button>
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
            <Lobby/>
        </div>
    )
    return (
        <div className='max-h-screen max-w-screen h-screen w-screen pt-14 bg-slate-800'>
            <div className='p-2 flex flex-col h-full w-screen gap-2'>
                <div className='flex bg-slate-700 rounded-md min-h-12 justify-center gap-10 items-center'>
                    <div className='flex'>
                        P1
                    </div>
                    <div className='flex'>
                        P2
                    </div>
                </div>
                <div className="grow overflow-y-auto">
                    <Splitter classes={["overflow-y-auto"]} direction={SplitDirection.Horizontal} minWidths={[300, 300, 300]} gutterClassName="bg-transparent m-px">
                        <div className='h-full bg-slate-600 whitespace-pre-wrap rounded-md overflow-y-auto break-words p-2'>
                            {text}
                            {text}
                        </div>
                        <Splitter direction={SplitDirection.Vertical} minHeights={[100,100]} gutterClassName="bg-transparent m-px">
                            <div className='h-full bg-slate-500 rounded-md flex flex-col overflow-y-auto break-words grow p-2'>Tile 3</div>
                            <div className='h-full bg-slate-400 rounded-md flex flex-col overflow-y-auto break-words grow p-2'>Tile 4</div>
                        </Splitter>
                    </Splitter>
                </div>
            </div>
        </div>
    )
}


const text: string = `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.





Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]


Constraints:

2 <= nums.length <= 104
-109 <= nums[i] <= 109
-109 <= target <= 109\
Only one valid answer exists.


Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?`