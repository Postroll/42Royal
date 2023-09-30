import profileIcon from '../../assets/players.svg'
import IMessage from '../../utils/IMessage'

export default function ChatMessageComponent({username, photo, message}: IMessage){
    return (
        <div className="bg-black/30 rounded-lg p-2 flex text-white whitespace-pre-wrap gap-2 flex-wrap">
            <img height={15} width={15} src='profile.svg'/>
            <div>
                {username}:  {message}
            </div>
        </div>
    )
}