import Splitter, { SplitDirection } from '@devbookhq/splitter'
import { useEffect } from 'react'

import PlayerDisplayComponent from './playerDisplayComponent'

interface IGame{
    currentRoom: any,
    data: any,
}

export default function GameComponent({currentRoom, data}: IGame){


    return (
        <div className='max-h-screen max-w-screen h-screen w-screen pt-14 bg-slate-800 absolute top-0'>
            <div className='p-2 flex flex-col h-full w-screen gap-2'>
                {/* <div className='flex bg-slate-700 rounded-md min-h-12 justify-center gap-10 items-center'> */}
                    <PlayerDisplayComponent data={data}/>
                {/* </div> */}
                <div className="grow overflow-y-auto">
                    <Splitter classes={["overflow-y-auto"]} direction={SplitDirection.Horizontal} minWidths={[300, 300, 300]} gutterClassName="bg-transparent m-px">
                        <div className='h-full bg-slate-600 whitespace-pre-wrap rounded-md overflow-y-auto break-words p-2'>
                            {text}
                            {text}
                        </div>
                        <Splitter direction={SplitDirection.Vertical} minHeights={[100,100]} gutterClassName="bg-transparent m-px">
                            <div className='h-full bg-slate-500 rounded-md flex flex-col overflow-y-auto break-words grow p-2'>Tile 3</div>
                            <div className='h-full bg-slate-400 rounded-md flex flex-col overflow-y-auto break-words grow p-2'>Tile 4</div>
                        </Splitter>
                    </Splitter>
                </div>
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