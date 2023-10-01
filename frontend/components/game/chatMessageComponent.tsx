import profileIcon from '../../assets/players.svg'
import IMessage from '../../utils/IMessage'

export default function ChatMessageComponent({username, photo, message}: IMessage){
    return (
        <div className="bg-black/30 rounded-lg p-1 pl-2 flex text-white whitespace-pre-wrap gap-2 flex-wrap">
            <img height={12} width={12} src='profile.svg'/>
            <div className='text-sm'>
                {username}:  {message}
            </div>
        </div>
    )
}