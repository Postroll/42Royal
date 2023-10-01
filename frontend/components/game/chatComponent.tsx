import { useRef, useState } from "react";
import ChatMessageComponent from "./chatMessageComponent";
import IMessage from "@/utils/IMessage";

interface IChat{
    currentRoom: any,
    data: any,
}

export default function ChatComponent({currentRoom, data}: IChat){
    const [myMessage, setMyMessage] = useState<string>('');

    const dataRef = useRef<IMessage[]>([]);
    dataRef.current = data;

    const handleMessageSubmit = async (e: any) => {
        e.preventDefault();
        if (myMessage != '')
            currentRoom.send("chat", myMessage);
        setMyMessage('');
    }

    return (
        <div className="max-h-[50%] h-full bottom-0 w-full absolute gap-2 flex flex-col justify-end p-2 overflow-y-auto">
            <div className='h-full flex flex-col-reverse gap-1 overflow-y-auto gradient-mask-t-40'>
                {
                    data.chat.slice().reverse().map((msg: IMessage) => {
                        return <ChatMessageComponent username={msg.username} photo='profile.svg' message={msg.message}/>
                    })
                }
            </div>
            <form onSubmit={handleMessageSubmit} className='w-full rounded-lg relative'>
                <input placeholder='Send a message...' 
                    className='w-full rounded-lg text-sm p-1' 
                    value={myMessage} onChange={(e) => setMyMessage(e.target.value)}
                    />
                <img src="send.svg" className="absolute bottom-0.5 right-1" onClick={handleMessageSubmit} width={25}/>
            </form>
        </div>
    )
}