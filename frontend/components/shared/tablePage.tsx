import IProblem from '../utils/IProblem'

interface ITablePage{
    searchFunc: Function,
    editFunc: Function,
    setEditProblem: Function,
    deleteFunc: Function,
    problems: IProblem[],
    page: number,
    setPage: Function,
    count: number,
}

export default function TablePage({searchFunc, editFunc, setEditProblem, deleteFunc, problems, page, setPage, count}: ITablePage) {
    
    const handleEdit = (problem: IProblem) => {
        editFunc(true);
        searchFunc(false);
        setEditProblem(problem);
    }

    const array = [...Array(5)];
    let first: number = (page > 3 ? page - 2 : 1);

    const populateArray = () =>{
        for(let i = 0; i < 5 ; i++){
            array[i] = first + i;
        }
    }

    populateArray();

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="p-2">
                <button 
                    className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-black bg-white border border-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                    onClick={() => {searchFunc(true)}}>
                    Advanced Search
                </button>
            </div>
            <table className="h-full w-full text-sm text-left text-gray-500 overflow-auto">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Game type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Created by
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Edit
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        problems?.map((problem) => {
                            return(
                                <tr key={problem._id} className="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {problem.title}
                                    </th>
                                    <td className="px-6 py-4">
                                        {problem.status}
                                    </td>
                                    <td className="px-6 py-4">
                                        {problem.game_type}
                                    </td>
                                    <td className="px-6 py-4">
                                        {problem.created_by}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleEdit(problem)} className="font-medium text-blue-600 hover:underline">Edit</button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => deleteFunc(problem._id)} className="font-medium text-red-600 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            )
                        })
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