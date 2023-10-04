'use client'
import React, { createContext, useContext } from "react";
import { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";

import InputLimited from '@/components/shared/input/inputLimited';
import NavigationMenuComponent from "./components/navigationMenu";
import GeneralPanelComponent from "./components/generalPanel";
import DetailedPanelComponent from "./components/detailedPanel";

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
    const [menuCode, SetMenuCode] = useState<number>(0);
    const [menuHover, setMenuHover] = useState<number>(-1);

    const [title, setTitle] = useState<string>('');
    const [language, setLanguage] = useState<string>('c');
    const [theme, setTheme] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [mainCode, setMainCode] = useState<string>('')
    const [workingSolution, setWorkingSolution] = useState<string>('')
    const [initialCode, setInitialCode] = useState<string>('')
    const [stdin, setStdin] = useState<string>('');
    const [expectedOutput, setExpectedOutput] = useState<string>('');

    const [text, setText] = useState<string[]>([
        "General",
        "Description",
        "Expected Output",
        "Stdin",
        "Main code",
        "Working solution",
        "Initial code"
    ]);


    const [loading, setLoading] = useState<boolean>(true);
    const tmp: contextHolder = {dynamicLoading: loading, setDynamicLoading: setLoading}

    const handleSubmit = async () => {
        const ret = await fetch('http://localhost:5000/problem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "gameType": 1,
            "title": title,
            "language": language,
            "theme": theme,
            "description": description,
            "mainCode": mainCode,
            "workingSolution": workingSolution,
            "initialCode": initialCode,
            "stdin": stdin,
            "expectedOutput": expectedOutput,
        }),
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
    }

    const handleMenuNavigation = (code: number) => {
        SetMenuCode(code);
    }

    return (
        <context.Provider value={tmp}>
            <div className="flex h-screen w-screen pt-24 pb-8 px-8 bg-p1 gap-1 justify-center">
                <form className="text-center text-black flex lg:w-[80%]  xsm:w-full xsm:max-w-full rounded-lg gap-2 justify-center">
                    <NavigationMenuComponent menuHover={menuHover} setMenuHover={setMenuHover} handleMenuNavigation={handleMenuNavigation} menuCode={menuCode} handleSubmit={handleSubmit}/>
                    <div className="flex flex-col w-2/3 bg-gradient-to-tr from-[#1f1c21] to-[#49414e] rounded-lg p-4">
                    <h1 id='title' className='font-bold text-xl text-[#f5f5f5] mb-5 pointer-events-none'>
                        {text[menuCode]}
                    </h1>
                    <DetailedPanelComponent menuCode={menuCode} 
                        title={title} setTitle={setTitle} 
                        language={language} setLanguage={setLanguage} 
                        theme={theme} setTheme={setTheme} 
                        description={description} setDescription={setDescription} 
                        mainCode={mainCode} setMainCode={setMainCode} 
                        stdin={stdin} setStdin={setStdin} 
                        expectedOutput={expectedOutput} setExpectedOutput={setExpectedOutput} 
                        initialCode={initialCode} setInitialCode={setInitialCode} 
                        workingSolution={workingSolution} setWorkingSolution={setWorkingSolution}/>
                    </div>
                </form>
            </div>
        </context.Provider>
    )
}