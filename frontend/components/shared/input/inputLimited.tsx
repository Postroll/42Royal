import CodeEditor from '@uiw/react-textarea-code-editor';

interface IInput{
    placeholder: string,
    defaultSize?: string,
    value: string,
    onChange:(e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    className?: string,
}

export default function InputLimited({placeholder, defaultSize, value, onChange, className}: IInput){
    return(
        <textarea 
            className={`p-2 text-xs text-black font-mono bg-[#f5f5f5] rounded
                border-slate-900 border-1 min-h-12 h-${defaultSize} resize-y ${className}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            >
        </textarea>
    )
}