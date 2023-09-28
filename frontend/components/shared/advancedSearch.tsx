import Button from "./button"
import Dropdown from "./dropdown/dropdown"
import DropdownCheckBox from "./dropdown/dropdownCheckBox"
import Input from "./input/input"
import { useState } from "react"

export default function AdvancedSearch(){
    const [language, setLanguage] = useState<string[]>();
    
    return (
        <div className="absolute rounded-md z-10 h-5/6 w-5/6 pt-14 p-10 bg-slate-100 flex flex-col gap-5 items-center">
            <h1 className="text-3xl font-bold">Advanced Search</h1>
            <Input placeholder="Title"/>
            <Input placeholder="Created by"/>
            <Dropdown btnText="Status" options={["Any", "Under review", "Accepted", "Rejected", "Suspended"]}/>
            <DropdownCheckBox btnText="Language" options={["Any", "C", "C++", "JS", "Rust"]}/>
            <Button text="Cancel"/>
            <button className={`hover:bg-white text-white
                font-semibold hover:text-blue-900 py-2 px-4 border bg-blue-900
                hover:border-transparent rounded-full`}>
                Submit
            </button>
        </div>
    )
}