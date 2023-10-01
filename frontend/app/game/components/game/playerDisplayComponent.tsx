import { Play } from "next/font/google"
import PlayerDisplayModel from "./playerDIsplayModel"

export default function PlayerDisplayComponent({data}: any){
    return (
        <div className='w-full flex bg-slate-700 rounded-md h-fit p-2 max-h-24 justify-center gap-1 items-center overflow-y-hidden overflow-x-auto'>
            {
                data?.players &&
                [...data?.players].map((player) => {
                    return <PlayerDisplayModel username={player[1].username} score={player[1].score} photo="profile.svg"/>
                })
            }
        </div>
    )
}