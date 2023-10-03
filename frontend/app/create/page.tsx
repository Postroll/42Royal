'use client'
import React, { createContext, useContext } from "react";
import { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";

import InputLimited from '@/components/shared/input/inputLimited';

interface contextHolder {
    dynamicLoading: boolean,
    setDynamicLoading:(c: boolean) => void
}

export const context = createContext<contextHolder>({
    dynamicLoading: false,
    setDynamicLoading: () => {}
})

export const useGlobalContext = () => useContext(context)

const CodeEditor = dynamic(() => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),{
    ssr: false,
    loading: () => {
        const tmpContext:contextHolder = useContext(context);
    
        useEffect(() => {
            tmpContext.setDynamicLoading(true);
          return () => tmpContext.setDynamicLoading(false);
        }, [context]);
    
        return null;
    },
});

export default function Create(func: Function){
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [initial_code, setInitial_code] = useState<string>('')
    const [stdin, setStdin] = useState<string>('');
    const [expectedOuput, setExpectedOuput] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const tmp: contextHolder = {dynamicLoading: loading, setDynamicLoading: setLoading}

    const handleSubmit = async () => {
        const ret = await fetch('http://localhost:5000/problem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "game_type": 1,
            "title": title,
            "stdin": stdin,
            "description": description,
            "initial_code": initial_code,
            "expected_output": expectedOuput,
        }),
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
    }

    return (
        <context.Provider value={tmp}>
            <div className="flex h-screen w-screen pt-24 pb-8 px-8 bg-p1 gap-1">
                <form className="text-center text-black flex max-w-2/3 bg-gradient-to-br from-p2 via-[#39055c] w-2/3 xsm:w-full xsm:max-w-full rounded-lg p-8 gap-2">
                    <div className="w-1/3">
                        <div className="text-white font-bold">
                            test
                        </div>
                        <div className="flex mt-auto gap-4 justify-center">
                            <button className={`hover:bg-slate-800 text-black active:animate-shrink
                                font-semibold hover:text-white py-2 px-4 border bg-[#f5f5f5]
                                hover:border-transparent rounded-lg transition-all
                                duration-300 mt-auto`}>
                                Help
                            </button>
                            <button type="button"
                                className={`hover:bg-slate-800 text-black
                                font-semibold hover:text-white py-2 px-4 border bg-[#f5f5f5]
                                hover:border-transparent rounded-lg transition-all duration-300 mt-auto
                                active:animate-shrink`}
                                onClick={handleSubmit}>
                                    Submit
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col w-2/3">
                        <h1 id='title' className='font-bold text-xl text-[#f5f5f5] mb-5 pointer-events-none'>
                            Fill the form to create a problem
                        </h1>
                        <InputLimited placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        <InputLimited placeholder="Description" defaultSize='1/6' value={description} onChange={(e) => setDescription(e.target.value)}/>
                        <div className='overflow-auto'>
                            { <CodeEditor
                                id="codeArea"
                                className="w-tc-editor-text rounded border-1 border-black"
                                value={initial_code}
                                language="c"
                                placeholder="Enter the code that should be displayed from the start"
                                onChange={(evn) => setInitial_code(evn.target.value)}
                                padding={8}
                                minHeight={200}
                                style={{
                                    fontSize: 12,
                                    backgroundColor: "#f5f5f5",
                                    overflowWrap: 'break-word',
                                    fontFamily:
                                        "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"
                                }}
                            />
                            }
                            {
                                loading && (
                                    <textarea 
                                        className={`p-2 text-xs text-black font-mono bg-[#f5f5f5] rounded h-[200px]
                                            border-slate-900 border-1 min-h-12 resize-y overflow-hidden w-full justify-center -mb-1`}
                                        placeholder="Enter the code that should be displayed from the start"
                                    />
                                )
                            }
                        </div>
                        <InputLimited placeholder="Stdin" value={stdin} onChange={(e) => setStdin(e.target.value)}/>
                        <InputLimited placeholder="Expected output" value={expectedOuput} onChange={(e) => setExpectedOuput(e.target.value)}/>
                    </div>
                </form>
            </div>
        </context.Provider>
    )
}