'user client'
import { useState } from 'react';

import MapComponent from './mapComponent';
import GameLobbyInfoComponent from './gameLobbyInfoComponent';
import GameLobbyPlayerListComponent from './gameLobbyPlayerListComponent';
import ChatComponent from '../../../../components/game/chatComponent';

interface currentRoom{
    roomID: string;
}

export default function GameLobbyComponent(){
    const [selected, setSelected] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleMessageSubmit = async (e: any) => {
        e.preventDefault();
        console.log(message);
        setMessage('');
    }

    return (
        <div className="h-full w-full flex gap-2 px-6 pt-5 pb-10">
            <div className="h-full w-full flex gap-2  shadow-[10px_35px_100px_-15px_rgba(1,1,1,1)] bg-gradient-to-br from-[#22003b] to-p2 rounded-lg">
                <div className='flex flex-col w-1/3'>
                    <GameLobbyInfoComponent />
                    <GameLobbyPlayerListComponent />
                </div>
                <div className="bg-transparent flex w-full flex-col">
                    <div className='flex justify-around relative max-h-[66%]'>
                        <MapComponent setSelected={setSelected}/>
                    </div>
                    <ChatComponent />
                </div>
            </div>
        </div>
    )
}