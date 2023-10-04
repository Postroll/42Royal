interface Idropdown{
    classes?: string,
    btnText: string,
    options: string[],
    byDefault?: string,
    id?: string,
    onChange: Function,
}

export default function DropdownSelectLanguageComponent({classes, btnText, options, byDefault, id, onChange}: Idropdown) {
    return (
        <div className={classes}>      
            <label htmlFor={id} className={`text-center block mb-2 text-sm font-medium ${classes ? classes : 'text-gray-900'}`}>
                {btnText}
            </label>
            <select id={id} className="z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 text-gray-900" onChange={(event) => onChange(event?.target.value)}>
                {
                    options.map((option) => {
                        return (option == byDefault ?  (
                            <option className="block px-4 py-2 hover:bg-gray-100" value={option} selected>
                                {option}
                            </option>
                        ) : (
                            <option className="block px-4 py-2 hover:bg-gray-100" value={option}>
                                {option}
                            </option>
                        ))
                    })
                }
            </select>
        </div>
    )
}