import InputLimited from "@/components/shared/input/inputLimited"
import DropdownSelectLanguageComponent from "./dropdownSelectLanguage"

interface IPanel{
    title: string,
    setTitle: Function,
    language: string,
    setLanguage: Function,
    theme: string,
    setTheme: Function,
}

export default function GeneralPanelComponent({title, setTitle, theme, setTheme, language, setLanguage}: IPanel){
    return (
        <div className="flex flex-col gap-4">
            <InputLimited placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <InputLimited placeholder="Theme" value={theme} onChange={(e) => setTheme(e.target.value)}/>
            <DropdownSelectLanguageComponent classes="text-white" btnText="Language" options={["c", "js", "any"]} onChange={setLanguage} byDefault={language}/>
        </div>
    )
}