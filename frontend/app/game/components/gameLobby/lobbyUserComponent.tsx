import Image from "next/image"

import profileIcon from '../../../../assets/players.svg'

interface IUserList{
    photo: string,
    username: string,
    elo: string,
    title: string,
}

export default function LobbyUserComponent({photo, username, elo, title}: IUserList){
    return (
        <div className="flex gap-4 items-center justify-start bg-p1 text-white py-1 px-4 rounded-full overflow-x-hidden">
            <Image className="h-5 w-auto" src={profileIcon} alt='profile'/>
            <div className="justify-self-start flex flex-col">
                <div className="text-gray-200 text-sm -mb-1">
                    {username}
                </div>
                <div className="text-gray-500 text-xs">
                    {title}
                </div>
            </div>
            <div className="ml-auto text-sm">{elo}</div>
        </div>
    )
}