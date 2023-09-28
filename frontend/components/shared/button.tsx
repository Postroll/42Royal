import React from "react"

interface IButton{
    text?: string,
    defBgColor?: string,
    hovBgColor?: string,
    defColor?: string,
    hovColor?: string,
    onClick?:(e: React.ChangeEvent<HTMLTextAreaElement>) => void,
}

export default function Button({onClick, text='Click', defBgColor='#f6f6f6', hovBgColor='#f6f6f6', defColor='#f6f6f6', hovColor='#f6f6f6'}: IButton){
    return (
        <button className={`hover:bg-[${hovBgColor}] text-[${defColor}]
            font-semibold hover:text-[${hovColor}] py-2 px-4 border bg-[${defBgColor}]
            hover:border-transparent rounded-full`}>
            {text}
        </button>
    )
}