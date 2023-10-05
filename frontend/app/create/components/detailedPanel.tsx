import InputLimited from "@/components/shared/input/inputLimited";
import GeneralPanelComponent from "./generalPanel";
import { createContext, useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";

interface IDetailPanel{
    menuCode: number,
    title: string,
    setTitle: Function,
    language: string,
    setLanguage: Function,
    theme: string,
    setTheme: Function,
    description: string,
    setDescription: Function,
    mainCode: string,
    setMainCode: Function,
    stdin: string,
    setStdin: Function,
    expectedOutput: string,
    setExpectedOutput: Function,
    initialCode: string,
    setInitialCode: Function,
    workingSolution: string,
    setWorkingSolution: Function,
}

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


export default function DetailedPanelComponent({menuCode, title, setTitle, language, setLanguage, theme, setTheme, description, setDescription, mainCode, setMainCode, stdin, setStdin, expectedOutput, setExpectedOutput, initialCode, setInitialCode, workingSolution, setWorkingSolution}: IDetailPanel){
    
    const [loading, setLoading] = useState<boolean>(true);
    const tmp: contextHolder = {dynamicLoading: loading, setDynamicLoading: setLoading}
    
    return (
        <context.Provider value={tmp}>
        <>
            {
                menuCode == 0 && (
                    <GeneralPanelComponent title={title} setTitle={setTitle} language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme}/>
                )
            }
            {
                menuCode == 1 && <InputLimited className="h-full" placeholder="Description" defaultSize='1/6' value={description} onChange={(e) => setDescription(e.target.value)}/>
            }
            {
                menuCode == 2 && <InputLimited className="h-full" placeholder="Expected output" value={expectedOutput} onChange={(e) => setExpectedOutput(e.target.value)}/>
            }
            {
                menuCode == 3 && <InputLimited className="h-full" placeholder="Stdin" value={stdin} onChange={(e) => setStdin(e.target.value)}/>
            }
            {
                menuCode == 4 &&
                    <div className='overflow-auto'>
                        {
                            <CodeEditor
                                className='w-tc-editor-text w-tc-editor-var rounded border-1 dark:bg-black'
                                minHeight={1000}
                                value={mainCode}
                                language="c"
                                placeholder="Enter the code that should be compiled with the solution"
                                onChange={(evn) => setMainCode(evn.target.value)}
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
                        }
                        {
                            loading && (
                                <textarea 
                                    className={`p-2 text-xs text-black font-mono bg-[#f5f5f5] rounded h-full
                                        border-slate-900 border-1 min-h-12 resize-y overflow-hidden w-full justify-center -mb-1`}
                                    placeholder="Enter the code that should be compiled with the solution"
                                />
                            )
                        }
                    </div>
            }
            {
                menuCode == 5 && 
                    <div className='overflow-auto'>
                        {
                            <CodeEditor
                                className='w-tc-editor-text w-tc-editor-var rounded border-1 dark:bg-black'
                                minHeight={1000}
                                value={workingSolution}
                                language="c"
                                placeholder="Enter a working solution to your problem"
                                onChange={(evn) => setWorkingSolution(evn.target.value)}
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
                        }
                        {
                            loading && (
                                <textarea 
                                    className={`p-2 text-xs text-black font-mono bg-[#f5f5f5] rounded h-full
                                        border-slate-900 border-1 min-h-12 resize-y overflow-hidden w-full justify-center -mb-1`}
                                    placeholder="Enter a working solution to your problem"
                                />
                            )
                        }
                    </div>
            }
            {
                menuCode == 6 && 
                    <div className='overflow-auto'>
                        {
                            <CodeEditor
                                className='w-tc-editor-text w-tc-editor-var rounded border-1 dark:bg-black'
                                minHeight={1000}
                                value={initialCode}
                                language="c"
                                placeholder="Enter the code that should be given initially"
                                onChange={(evn) => setInitialCode(evn.target.value)}
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
                        }
                        {
                            loading && (
                                <textarea 
                                    className={`p-2 text-xs text-black font-mono bg-[#f5f5f5] rounded h-full
                                        border-slate-900 border-1 min-h-12 resize-y overflow-hidden w-full justify-center -mb-1`}
                                    placeholder="Enter the code that should be given initially"
                                />
                            )
                        }
                    </div>
            }
        </>
        </context.Provider>
    )
}