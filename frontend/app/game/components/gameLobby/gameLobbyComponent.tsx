'user client'
import { useEffect, useState } from 'react';

import MapComponent from './mapComponent';
import GameLobbyInfoComponent from './gameLobbyInfoComponent';
import GameLobbyPlayerListComponent from './gameLobbyPlayerListComponent';
import ChatComponent from '../../../../components/game/chatComponent';

interface ICurrentRoom{
    currentRoom: any,
    leave: Function,
    data: any,
}

export default function GameLobbyComponent({currentRoom, leave, data}: ICurrentRoom){
    const [selected, setSelected] = useState<string>('');
    const [test, setTest] = useState<any>(null);

    useEffect(()=>{
        setTest(data);
    }, [data])

    return (
        <div className="h-full w-full flex gap-2 px-6 pt-5 pb-10">
            <div className="h-full w-full flex gap-2  shadow-[10px_35px_100px_-15px_rgba(1,1,1,1)] bg-gradient-to-br from-[#22003b] to-p2 rounded-lg">
                <div className='flex flex-col w-1/3 max-w-1/3'>
                    <GameLobbyInfoComponent leave={leave} currentRoom={currentRoom} data={data}/>  
                    <GameLobbyPlayerListComponent data={data} currentRoom={currentRoom}/>
                </div>
                <div className="bg-transparent flex w-full flex-col relative">
                    <div className='flex justify-around relative max-h-[66%]'>
                        <MapComponent setSelected={setSelected}/>
                    </div>
                    <ChatComponent currentRoom={currentRoom} data={data}/>
                </div>
            </div>
        </div>
    )
}