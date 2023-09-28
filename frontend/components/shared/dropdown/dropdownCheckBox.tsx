interface IDropdownCheck{
    btnText: string,
    options: string[],
}

export default function DropdownCheckBox({btnText, options}: IDropdownCheck) {
    return(
        <div>
            <button id="dropdownBgHoverButton" data-dropdown-toggle="dropdownBgHover" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">
                {btnText}
                <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            <div id="dropdownBgHover" className="z-10 hidden w-48 bg-white rounded-lg shadow">
                <ul className="p-3 space-y-1 text-sm text-gray-700 overflow-y-auto max-h-44" aria-labelledby="dropdownBgHoverButton">
                    {
                        options?.map((option) => {
                            return(
                                <li>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input id={option} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"/>
                                        <label htmlFor={option} className="w-full ml-2 text-sm font-medium text-gray-900 rounded">{option}</label>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}