import LobbyUserComponent from "./lobbyUserComponent";

interface IPlayerList{
    data: any,
    currentRoom: any,
}

export default function GameLobbyPlayerListComponent({data, currentRoom}: IPlayerList){
    return (
        <div id='playerList' className="flex flex-col px-10 py-5 gap-2 rounded-bl-xl rounded-tr-lg">
            <div className="font-bold text-gray-100 text-xl flex text-clip flex-wrap gap-2">
                <div className="whitespace-nowrap max-w-2/3">Current players</div>
                <div className="whitespace-nowrap max-w-1/3">{` (${data.players.size}/${currentRoom.maxClients == undefined ? 'infinite' : currentRoom.maxClients})`}</div>
            </div>
            <div className='bg-gray-700 h-[1px] w-1/2 mt-2 overflow-y-auto'/>
            {
                data?.players &&
                [...data?.players].map((player) => {
                    return <LobbyUserComponent photo='/profile.svg' username={player[1].username} elo={player[1].elo} title='Master' state={player[1].state}/>
                })
            }
        </div>
    )
}