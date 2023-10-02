import { Split } from '@geoffcox/react-splitter';
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";

import PlayerDisplayComponent from './playerDisplayComponent'

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

    const handleCodeChange = (e: any) =>{
        e.preventDefault;
        setCode(e.target.value);
    }

    useEffect(() => {
        console.log('reloadddd');
    },[])

    return (
        <div className='max-h-screen max-w-screen h-screen w-screen pt-14 bg-slate-800 absolute top-0'>
            <div className='p-2 flex flex-col h-full w-screen gap-2'>
                <PlayerDisplayComponent data={data}/>
                <Split minPrimarySize='250px' minSecondarySize='250px' initialPrimarySize='40%'>
                    <div className='overflow-y-auto h-full'>{text}{text}{text}{text}{text}{text}</div>
                    <Split horizontal minPrimarySize='100px' minSecondarySize='100px'>
                        <div className='overflow-auto h-full'>
                            <CodeEditor
                                className='w-tc-editor-text rounded border-1'
                                minHeight={100}
                                value={code}
                                language="c"
                                placeholder=""
                                onChange={handleCodeChange}
                                padding={15}
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
                        <div>This is the bottom pane.</div>
                    </Split>
                </Split>
            </div>
        </div>
    )
}



const text: string = `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.





Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]


Constraints:

2 <= nums.length <= 104
-109 <= nums[i] <= 109
-109 <= target <= 109\
Only one valid answer exists.


Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?`