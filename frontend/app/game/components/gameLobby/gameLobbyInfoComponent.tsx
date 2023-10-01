import { useState } from "react";

interface ILobbyInfo{
    leave: Function,
}

export default function GameLobbyInfoComponent({leave}: ILobbyInfo){
    const [displayTooltip, setDisplayTooltip] = useState<boolean>(false);

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
    return (
        <div id='serverInfo' className=" h-1/2 flex flex-col items-center p-5 gap-1 relative">
            <button onClick={() => leave()} className='absolute top-0 left-0 text-white p-2 text-sm hover:underline underline-offset-1'>
                Back to server list
            </button>
            <div className="relative text-white font-bold bg-p4 pt-2 px-6 py-3 rounded-xl mt-1/12 flex whitespace-pre-wrap items-center hover:bg-p4/80 active:animate-shrink" onClick={copyToClipboard}>
                <div>Room </div>
                <div id='roomID' className='pr-4'>{'XV_6eyT1'}</div>
                <img src='/copy.svg' className='h-[20px]'></img>
                <div id='copyTooltip' className={`absolute -top-10 bg-black/50 p-1 rounded-lg ${displayTooltip ? '' : 'hidden'}`}>RoomID copied!</div>
            </div>
            <div className="text-white font-bold">Game mode</div>
            <div className="text-white font-bold">option 1</div>
            <div className="text-white font-bold">option 2</div>
            <div className="text-white font-bold">option 3</div>
        </div>
    )
}