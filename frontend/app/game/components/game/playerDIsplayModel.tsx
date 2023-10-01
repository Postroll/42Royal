import Image from "next/image"

interface IPlayerModel{
    username: string,
    photo: string,
    score: string,
}

export default function PlayerDisplayModel({username, photo, score}: IPlayerModel){
    return (
        <div className="text-white text-sm items-center flex flex-col h-fit rounded-lg p-2 bg-p2 pointer-events-none">
            <Image src={photo} width={20} height={20} alt='profile logo'/>
            <div className="flex gap-2">
                <div>
                    {username}
                </div>
                <div>
                    {score}
                </div>
            </div>
        </div>
    )
}