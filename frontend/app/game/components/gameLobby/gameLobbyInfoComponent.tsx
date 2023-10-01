import { useEffect, useState } from "react";

interface ILobbyInfo{
    leave: Function,
    currentRoom: any,
    data: any,
}

export default function GameLobbyInfoComponent({leave, currentRoom, data}: ILobbyInfo){
    const [displayTooltip, setDisplayTooltip] = useState<boolean>(false);
    const [ready, setReady] = useState<boolean>(false);

    const copyToClipboard = async () => {
        var copyText = document.getElementById("roomID")?.innerHTML;
      
        if (!copyText)
            return;
        try {
            await navigator.clipboard.writeText(copyText);
            setDisplayTooltip(true);
            setTimeout(() => {
                setDisplayTooltip(false);
            }, 2000);
        } catch (err) {
        }
    }

    useEffect(() => {
        currentRoom.send("readyState", ready);
    }, [ready])

    const handleReady = () => {
        setReady(!ready)
    }

    return (
        <div id='serverInfo' className=" h-1/2 flex flex-col items-center p-5 gap-1 relative">
            <button onClick={() => leave()} className='absolute top-0 left-0 text-white p-2 text-sm hover:bg-slate-800 hover:text-gray-400 bg-slate-900 rounded-tl-lg rounded-br-lg'>
                Quit lobby
            </button>
            <div className="relative text-white font-bold bg-p4 pt-2 px-6 py-3 rounded-xl mt-1/12 flex items-center hover:bg-p4/80 active:animate-shrink" onClick={copyToClipboard}>
                <div className="pr-1">Room </div>
                <div id='roomID' className='pr-4'>{currentRoom.roomId}</div>
                <img src='/copy.svg' className='h-[20px]'></img>
                <div id='copyTooltip' className={`absolute -top-10 bg-black/50 p-1 rounded-lg ${displayTooltip ? '' : 'hidden'}`}>RoomID copied!</div>
            </div>
            <div className="text-white font-bold">Game mode</div>
            <div className="text-white font-bold">option 1</div>
            <div className="text-white font-bold">option 2</div>
            <div className="text-white font-bold">option 3</div>
            <button className={`text-white font-bold rounded-xl p-2 px-6 active:animate-shrink ${ready ? 'bg-green-700 hover:bg-green-800' : 'bg-slate-700 hover:bg-slate-800'}`}
                onClick={handleReady}>
                {ready ? 'Ready!' : 'Ready?'}{` (${data?.readyCount}/${data?.players?.size})`}
            </button>
            <div className='text-white'>{data?.status}</div>
        </div>
    )
}