'use client'
import { useEffect, useRef, useState, createContext } from 'react';
import dynamic from 'next/dynamic';
import * as Colyseus from "colyseus.js";

import TableGame from '@/components/game/tableGame';
import connectionHandler from './components/serverLobby/connectionHandler'

import IUser from '../../utils/IUser'
import CreateGameComponent from './components/serverLobby/createGameComponent';
import GameStatsComponent from './components/gameStats/gameStats';

const GameLobbyComponent = dynamic(() => import('./components/gameLobby/gameLobbyComponent'), {
    loading: () => <h1>Loading....</h1>
})

const GameComponent = dynamic(() => import('./components/game/gameComponent'), {
    loading: () => <h1>Loading....</h1>
})

export const PlayerContext = createContext({});

export default function Game(){
    const [client, setClient] = useState<any>();
    const [player, setPlayer] = useState<any>({});
    const [rooms, setRooms] = useState<Array<any>>([]);
    const [count, setCount] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [user, setUser] = useState<IUser>();
    const [data, setData] = useState<any>();
    const [createPanel, setCreatePanel] = useState<boolean>(false);

    const [currentRoom, setCurrentRoom] = useState<any>();
    const currentRoomRef = useRef<any>();
    currentRoomRef.current = currentRoom;
    
    const initializedLobby = useRef(false);

    useEffect(()=>{
        if (currentRoom){
            currentRoom.onStateChange((state: any) =>{
                setData({...state});
                setPlayer({...state.players.get(currentRoom.sessionId)});
            })
        }
    }, [currentRoom])

    useEffect(() => {
        if (!initializedLobby.current)
            fetchUser();
        if (!initializedLobby.current && !client){
            console.log('create client');
            initializedLobby.current = true;
            setClient(new Colyseus.Client('ws://localhost:5000'));
        };
        initializedLobby.current = true;
        return (() =>{
            console.log('component unmount');
            console.log(currentRoomRef.current);
            if (currentRoomRef.current){
                currentRoomRef.current.leave(false);
            }
        })
    }, [])

    useEffect(() => {
        const myInterval = setInterval(() =>{
            if (currentRoom){
                return;
            }
            try{
                updateRooms();
            } catch(e){
                console.log(e);
            }
        }, 3000);
        return () => clearInterval(myInterval);
    }, [])

    useEffect(()=>{
        updateRooms();
    },[client])

    useEffect(()=>{
        console.log(user);
        if (!user || currentRoom)
            return;
        const reconnectionToken = localStorage.getItem('reconnectionToken');
        const roomID: string = user?.webSocket?.roomID;
        localStorage.setItem('reconnectionToken', reconnectionToken ? reconnectionToken : '');
        connectionHandler.reconnect(reconnectionToken, roomID, client, setCurrentRoom);
    }, [user])

    const updateRooms = async() =>{
        if (!client)
            return;
        try{
            const ret = await client.getAvailableRooms(); 
            setRooms(ret);
        } catch(e){
            console.log('Could not fetch rooms. Is the server down?')
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

    const joinByIDproxy = async (roomID: number) =>{
        connectionHandler.joinByID(roomID, client, setCurrentRoom)
    }

    const createRoomProxy = (roomParameters: Object) => {
        connectionHandler.createRoom(client, setCurrentRoom, roomParameters)
        setCreatePanel(false);
    }

    return (
        <PlayerContext.Provider value={{ player }}>
        <div className='max-h-screen max-w-screen h-screen w-screen pt-14 bg-[#190C38] flex flex-col'>
            {
                !currentRoom ? (
                    <div>
                        <TableGame setPage={setPage} page={page} count={count} rooms={rooms} refresh={updateRooms} joinByID={joinByIDproxy}/>
                        <div className='flex gap-4'>
                            <button className='text-white text-xl bg-slate-500' onClick={()=>connectionHandler.join(client, setCurrentRoom)}>Join</button>
                            <button className='text-white text-xl bg-slate-500' onClick={() =>console.log('test')}>Join by ID</button>
                            <button className='text-white text-xl bg-slate-500' onClick={()=>setCreatePanel(true)}>Create</button>
                            <button className='text-white text-xl bg-slate-500' onClick={()=>connectionHandler.leave(currentRoom, setCurrentRoom)}>Leave</button>
                            <button className='text-white text-xl bg-slate-500' onClick={()=>console.log(currentRoom)}>Display room data</button>
                        </div>
                        {createPanel && <CreateGameComponent createRoom={createRoomProxy} closePanel={()=>setCreatePanel(false)}/>}
                    </div>
                ) : (
                    data?.statusCode == 0 || data?.statusCode == 1 ? (
                        <GameLobbyComponent currentRoom={currentRoom} leave={() => connectionHandler.leave(currentRoom, setCurrentRoom)} data={data}/>
                    ):(
                        data?.statusCode == 2 ? (
                        <GameComponent currentRoom={currentRoom} data={data}/>
                        ) : (
                            <GameStatsComponent data={data}/>
                        )
                    )
                )
            }
        </div>
        </PlayerContext.Provider>
    )
}