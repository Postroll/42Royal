import { useState } from "react";
import ChatMessageComponent from "./chatMessageComponent";
import IMessage from "@/utils/IMessage";

export default function ChatComponent(){
    const [myMessage, setMyMessage] = useState<string>('');
    const [messages, setMessages] = useState<IMessage[]>([])

    const handleMessageSubmit = async (e: any) => {
        e.preventDefault();
        console.log(myMessage);
        setMyMessage('');
    }

    return (
        <div className="h-full gap-2 flex flex-col justify-end p-2">
            <div className=' flex flex-col gap-1'>
                <ChatMessageComponent username='mlauro' photo='profile.svg' message='Salut!'/>
                <ChatMessageComponent username='nskiba' photo='profile.svg' message='yo!'/>
                <ChatMessageComponent username='mlauro' photo='profile.svg' message='Bonne chance!'/>
            </div>
            <form onSubmit={handleMessageSubmit} className='w-full rounded-lg'>
                <input placeholder='Send a message...' 
                    className='w-full rounded-lg text-sm p-1' 
                    value={myMessage} onChange={(e) => setMyMessage(e.target.value)}
                    />
            </form>
        </div>
    )
}