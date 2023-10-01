import LobbyUserComponent from "./lobbyUserComponent";

interface IPlayerList{
    data: any,
}

export default function GameLobbyPlayerListComponent({data}: IPlayerList){
    return (
        <div id='playerList' className="flex flex-col px-10 py-5 gap-2 rounded-bl-xl rounded-tr-lg">
            <div className="font-bold text-gray-100 text-2xl flex whitespace-pre-wrap">
                <div>Current players</div>
                <div>{` (2/10)`}</div>
            </div>
            <div className='bg-gray-700 h-[1px] w-1/2 mt-2 overflow-y-auto'/>
            {
                data?.players &&
                [...data?.players].map((player) => {
                    return <LobbyUserComponent photo='/profile.svg' username={player[1].username} elo={player[1].elo} title='Master'/>
                })
            }

            
            {/* <LobbyUserComponent photo='/profile.svg' username='mlauro' elo='1500' title='Master'/>
            <LobbyUserComponent photo='/profile.svg' username='nskiba' elo='800' title='Larbin'/> */}
        </div>
    )
}