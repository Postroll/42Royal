import { useEffect, useRef, useState } from "react";
import ChatMessageComponent from "./chatMessageComponent";
import IMessage from "@/utils/IMessage";

interface IChat{
    currentRoom: any,
    data: any,
}

export default function ChatComponent({currentRoom, data}: IChat){
    const [myMessage, setMyMessage] = useState<string>('');
    const initialized = useRef(false);

    const [messages, setMessages] = useState<IMessage[]>([]);
    const dataRef = useRef<IMessage[]>([]);
    dataRef.current = data;

    const handleMessageSubmit = async (e: any) => {
        e.preventDefault();
        if (myMessage != '')
            currentRoom.send("chat", myMessage);
        setMyMessage('');
    }

    useEffect(()=>{
        if (!initialized.current){
            initialized.current = true;
            currentRoom.onMessage("chat", (msg: string)=>{
                const newMessage = {photo: 'profile.svg', username: msg.substring(0, msg.indexOf('```')), message:msg.substring(msg.indexOf('```') + 3)};
                setMessages((messages) => [newMessage, ...messages]);
                console.log(msg);
            })
        };
    }, [])

    return (
        <div className="max-h-[50%] h-full bottom-0 w-full absolute gap-2 flex flex-col justify-end p-2 overflow-y-auto">
            <div className='h-full flex flex-col-reverse gap-1 overflow-y-auto rotate gradient-mask-t-40'>
                {
                    messages. map((msg) => {
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