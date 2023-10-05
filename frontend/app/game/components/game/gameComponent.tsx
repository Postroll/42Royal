import { Split } from '@geoffcox/react-splitter';
import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";

import PlayerDisplayComponent from './playerDisplayComponent'

import { GameContext } from '../../page';

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);

interface IGame{
    currentRoom: any,
    data: any,
}

export default function GameComponent({currentRoom, data}: IGame){
    const [code, setCode] = useState<string>('');
    const [result, setResult] = useState<string>('');
    let { player } = useContext<any>(GameContext);

    const handleCodeChange = (e: any) =>{
        e.preventDefault;
        setCode(e.target.value);
    }

    useEffect(() => {
        currentRoom.onMessage("result", (msg: string) => {
            setResult(msg);
        })
    },[])

    const handleSubmit = () =>{
        if (code)
            currentRoom.send("submission", code);
    }

    const handleTest = () =>{
        if (code)
            currentRoom.send("test", code);
    }

    // console.log(data);

    return (
        <div className='max-h-screen max-w-screen h-screen w-screen pt-14 bg-slate-800 absolute top-0'>
            <div className='p-2 flex flex-col h-full w-screen gap-2'>
                <PlayerDisplayComponent data={data}/>
                <Split minPrimarySize='250px' minSecondarySize='250px' initialPrimarySize='40%'>
                    <div className='overflow-y-auto h-full whitespace-pre-wrap text-white p-2 bg-slate-900 rounded-lg flex flex-col gap-4'>
                        <div className='flex justify-between gap-2'>
                            <div>
                                {data?.problems[player?.score]?.title}
                            </div>
                            <div>
                                {player?.score + 1}/{data?.problems?.length}
                            </div>
                        </div>
                        <div className='border h-[1px]'></div>
                        <div>
                            {data?.problems[player?.score]?.description}
                        </div>
                    </div>
                    <Split horizontal minPrimarySize='100px' minSecondarySize='100px'>
                        <div className='overflow-auto h-full'>
                            <CodeEditor
                                className='w-tc-editor-text w-tc-editor-var rounded border-1 dark:bg-black'
                                minHeight={100}
                                value={code}
                                language="c"
                                placeholder="Code area"
                                onChange={handleCodeChange}
                                padding={15}
                                data-color-mode="dark"
                                style={{
                                    overflow: "visible",
                                    height: "max-content",
                                    minHeight: "100%",
                                    fontSize: 12,
                                    backgroundColor: "#f5f5f5",
                                    fontFamily:
                                        "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"
                                }}
                            />
                        </div>
                        <div className='flex flex-col justify-between bg-black h-full p-2 rounded-lg'>
                            <div className='text-white flex h-full'>
                                {result}
                            </div>
                            <div className='flex gap-2'>
                                <button className='text-white font-bold border-white border-2 hover:text-slate-800 hover:bg-white active:animate-shrink rounded-lg p-2'
                                onClick={handleTest}>
                                    Test
                                </button>
                                <button className='text-slate-800 bg-white font-bold border-white border-2 hover:bg-gray-100 hover:border-gray-100 hover:animate-shrink rounded-lg p-2'
                                 onClick={handleSubmit}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </Split>
                </Split>
            </div>
        </div>
    )
}