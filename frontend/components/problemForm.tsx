'use client'
import React from "react";
import { useEffect, useState } from 'react';
import dynamic from "next/dynamic";

import "@uiw/react-textarea-code-editor/dist.css";

import IProblem from "@/utils/IProblem";
import InputLimited from '@/components/shared/input/inputLimited';

interface IProblemForm{
    formName: string,
    problem: IProblem,
    setEdit: Function,
    updateForm: Function,
}

const CodeEditor = dynamic(() => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),{
    ssr: false
});

export default function ProblemForm({formName, problem, setEdit, updateForm}: IProblemForm){
    const [newProblem, setNewProblem] = useState<IProblem>(problem);

    const handleSubmit = async () =>{
        console.log(newProblem);
        const ret = await fetch(process.env.NEXT_PUBLIC_BACKEND +'/problem/'+newProblem._id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProblem),
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        setEdit(false);
        updateForm();
    }

    return (
        <div className="absolute z-10 flex h-5/6 w-5/6">
            <form className="text-center text-black flex flex-col max-w-2/3 bg-slate-500 w-2/3 xsm:w-full xsm:max-w-full rounded-lg p-8 gap-2">
                <h1 id='title' className='font-bold text-xl text-[#f5f5f5] mb-5 pointer-events-none'>{formName}</h1>
                <InputLimited placeholder="Title" value={newProblem.title} onChange={(e) => setNewProblem(newProblem => ({...newProblem, title: e.target.value}))}/>
                <InputLimited placeholder="Description" defaultSize='1/6' value={newProblem.description} onChange={(e) => setNewProblem(newProblem => ({...newProblem, description: e.target.value}))}/>
                <div className='overflow-auto'>
                    { <CodeEditor
                        id="codeArea"
                        className="w-tc-editor-text rounded border-1 border-black"
                        value={newProblem.initial_code}
                        language="c"
                        placeholder="Enter the code that should be displayed from the start"
                        onChange={(e) => setNewProblem(newProblem => ({...newProblem, initial_code: e.target.value}))}
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
                </div>
                <InputLimited placeholder="Stdin" value={newProblem.stdin} onChange={(e) => setNewProblem(newProblem => ({...newProblem, stdin: e.target.value}))}/>
                <InputLimited placeholder="Expected output" value={newProblem.expected_output} onChange={(e) => setNewProblem(newProblem => ({...newProblem, expected_output: e.target.value}))}/>
                <div className="flex mt-auto gap-4 justify-center">
                    <button type="button"
                        className={`hover:bg-slate-800 text-black bg-white
                        font-semibold hover:text-white py-2 px-4 hover:border-white 
                        border-transparent rounded-lg transition-all duration-300 mt-auto
                        active:animate-shrink`}
                        onClick={handleSubmit}>
                            Submit
                    </button>
                    <button type="button"
                        className={`hover:bg-red-600 text-white bg-red-700
                        font-semibold py-2 px-4 border border-transparent hover:border-white
                        rounded-lg transition-all duration-300 mt-auto active:animate-shrink`}
                        onClick={() => setEdit(false)}>
                            Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}