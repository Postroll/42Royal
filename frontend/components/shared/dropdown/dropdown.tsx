import { useState } from "react"

interface IDropdown{
    btnText: string,
    options: string[],
}

export default function Dropdown({btnText, options}: IDropdown){
    const [value, setValue] = useState('');
    const [hidden, setHidden] = useState(true);
    
    const handleClick = (option: string) => {
        setValue(option);
        setHidden(!hidden);
    }

    return (
        <div>
            <button id="dropdownDefaultButton" 
            className= "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" 
            type="button"
            onClick={() => setHidden(!hidden)}>
                    {value !== '' ? value : btnText}
                <svg className="w-2.5 h-2.5 ml-2.5" 
                aria-hidden="true" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 10 6">
                    <path stroke="currentColor" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            <div id="dropdown" className={`z-20 absolute ${hidden ? 'hidden' : ''} bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}>
                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                    {
                        options?.map((option) => {
                            return (
                                <li>
                                    <h6 className="block px-4 py-2 hover:bg-gray-100" onClick={() => handleClick(option)}>{option}</h6>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js"></script>
        </div>
    )
}