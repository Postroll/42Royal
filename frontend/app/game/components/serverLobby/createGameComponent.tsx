import Dropdown from "@/components/shared/dropdown/dropdown";
import DropdownSelect from "@/components/shared/dropdown/dropdownSelect";
import Image from "next/image";
import { useState } from "react";

interface ICreatePanel{
    closePanel: Function,
    createRoom: Function,
}

export default function CreateGameComponent({closePanel, createRoom}: ICreatePanel){
    const [timeLimit, setTimeLimit] = useState<string>('15');

    const handleClick = () =>{
        const gameTypeElem = document.getElementById("gameType");
        const playerLimitElem = document.getElementById("playerLimit");
        const languageElem = document.getElementById("language");
        const themeElem = document.getElementById("theme");
        const numberOfQuestionsElem = document.getElementById("numberOfQuestions");
        const privateElem =  document.getElementById("private");
        const roomParameters = {
            'gameType': gameTypeElem?.options[gameTypeElem.selectedIndex].text,
            'playerLimit': playerLimitElem?.options[playerLimitElem.selectedIndex].text,
            'language': languageElem?.options[languageElem.selectedIndex].text,
            'theme': themeElem?.options[themeElem.selectedIndex].text,
            'numberOfQuestions': numberOfQuestionsElem?.options[numberOfQuestionsElem.selectedIndex].text,
            'timeLimit': timeLimit,
            'private': privateElem?.checked,
        }
        createRoom(roomParameters)
    }

    const handleSlider = (e) => {
        setTimeLimit(e.target.value);
    }

    return (
        <div className="absolute z-10 top-0 h-screen w-screen bg-white/10 backdrop-blur">
            <div className="absolute top-1/4 left-1/4 h-1/2 w-1/2 bg-slate-100 rounded-lg flex flex-col p-2 items-center">
                <Image className="absolute top-0 right-0 cursor-pointer" onClick={()=>closePanel()} src="close.svg" height={20} width={20} alt='close'/>
                <div className="text-center text-lg font-bold">Create a room</div>
                <div className="flex gap-4 items-center py-6 flex-wrap overflow-y-auto justify-center">
                    <DropdownSelect id="gameType" btnText="Game type" options={["First to finish", "type 2"]} byDefault="First to finish"/>
                    <DropdownSelect id="playerLimit" btnText="Player limit" options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]} byDefault="10"/>
                    <DropdownSelect id="language" btnText="Language" options={["c", "c++"]} byDefault="c"/>
                    <DropdownSelect id="theme" btnText="Theme" options={["libft"]} byDefault="libft"/>
                    <DropdownSelect id="numberOfQuestions" btnText="Number of questions" options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]} byDefault="5"/>
                    <div className="flex flex-col">
                        <div className="text-center block mb-2 text-sm font-medium text-gray-900">Private?</div>
                        <input id='private' className="bg-white divide-y divide-gray-100 rounded-lg justify-self-center" type='checkbox'/>
                    </div>
                    <div>
                        <label
                            htmlFor="customRange3"
                            className="w-64 text-center block mb-2 text-sm font-medium text-gray-900">
                            {'Time limit: '+timeLimit+' minutes'}
                        </label>
                        <input
                            type="range"
                            className="transparent h-[4px] w-full cursor-pointer
                        appearance-none border-transparent bg-neutral-200"
                            min="1"
                            max="30"
                            step="1"
                            id="customRange3"
                            onChange={handleSlider}
                        />
                    </div>
                </div>
                <button className="bg-green-700 hover:bg-green-800 text-white front-bold active:animate-shrink rounded-lg p-2 w-fit mt-auto"
                    onClick={handleClick}>
                    Create
                </button>
            </div>
        </div>
    )
}