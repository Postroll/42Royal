
export default function PlayerDisplayComponent({data}: any){
    console.log(data)
    return (
        <div className='flex bg-slate-700 rounded-md min-h-12 justify-center gap-10 items-center overflow-y-hidden overflow-x-auto'>
        {
                data?.players &&
                [...data?.players].map((player) => {
                    return (
                        <div className="text-white text-xl">
                            {player[1].username}
                        </div>
                    )
                })
            }
        </div>
    )
}