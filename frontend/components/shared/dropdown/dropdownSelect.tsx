interface Idropdown{
    classes?: string,
    btnText: string,
    options: string[],
}

export default function DropdownSelect({classes, btnText, options}: Idropdown) {
    return (
        <div className={classes}>      
            <label htmlFor={"value"} className="text-center block mb-2 text-sm font-medium text-gray-900">{btnText}</label>
            <select id="value" className="z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44" >
                <option selected></option>
                {
                    options.map((option) => {
                        return (
                            <option className="block px-4 py-2 hover:bg-gray-100" value={option}>{option}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}