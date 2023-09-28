interface ITablePage{
    page: number,
    setPage: Function,
    count: number,
    rooms: any[],
    refresh: Function,
    joinByID: Function,
}

export default function TableGame({page, setPage, count, rooms, refresh, joinByID}: ITablePage) {
    const array = [...Array(5)];
    let first: number = (page > 3 ? page - 2 : 1);

    const populateArray = () =>{
        for(let i = 0; i < 5 ; i++){
            array[i] = first + i;
        }
    }
    populateArray();

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10 h-full">
            <button className="bg-white rounded-t-lg p-1 hover:bg-slate-300" onClick={()=>refresh()}>Refresh list</button>
            <table className="h-30 w-full text-sm text-left text-gray-500 overflow-auto">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            player
                        </th>
                        <th scope="col" className="px-6 py-3">
                            max player
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Created by
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Join room
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.isArray(rooms) ?
                        rooms?.map((room) => {
                            return(
                                <tr key={room.roomId} className="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {room.roomId}
                                    </th>
                                    <td className="px-6 py-4">
                                        {room.clients}
                                    </td>
                                    <td className="px-6 py-4">
                                        {room.maxClients ? room.maxClients : 'No limit'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {room.reconnectionToken}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => joinByID(room.roomId)} className="font-medium text-blue-600 hover:underline">Join</button>
                                    </td>
                                </tr>
                            )
                        })
                        :
                        ''
                    }
                </tbody>
            </table>
            <nav className="p-2 flex items-center justify-between pt-4" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500">
                    {`Showing `}
                    <span className="font-semibold text-gray-900">
                        {`${(page - 1) * 10 + 1}-${page * 10 < count ? page * 10 : count}`}
                    </span>
                    {` of `} 
                    <span className="font-semibold text-gray-900">
                        {count}
                    </span>
                </span>
                <ul className="inline-flex -space-x-px text-sm h-8">
                    <li>
                        <button className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                        onClick={() => ( page > 1 ? setPage(page - 1) : '')}>
                            Previous
                        </button>
                    </li>
                    {
                        array.map((i) => {
                            return (
                                <li key={i} >
                                    {
                                        ((i - 1) *  10) < count ? 
                                        (
                                            <button className={`flex items-center justify-center px-3 h-8 
                                            ${ i == page ? 
                                                'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                                                : 'leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'}`}
                                                onClick={() => setPage(i)}>
                                                {i}
                                            </button>
                                        ) : (
                                            <button className='flex items-center justify-center px-3 h-8 leading-tightborder border border-gray-300 bg-gray-100 text-gray-700'>
                                                {i}
                                            </button>
                                        )
                                    }

                                </li>       
                            )
                        })
                    }
                    <li>
                        <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                            onClick={() => (((page) *  10) < count ? setPage(page + 1) : '')}>
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>

    )
}