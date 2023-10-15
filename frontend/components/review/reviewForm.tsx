'use client'
import { useEffect, useRef, useState } from "react"

import IProblem from "@/utils/IProblem"

interface IReviewForm{
    cancelReview: Function,
}

export default function ReviewForm({cancelReview}: IReviewForm){
    const [problem, setProblem] = useState<IProblem>();

    const initialized = useRef(false)
    
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            getRandomProblem();
        }
    }, [])

    useEffect(() =>{
        console.log(problem)
    }, [problem])

    const getRandomProblem = async () =>{
        await fetch(process.env.NEXT_PUBLIC_BACKEND +'/problem/review', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then((res) => res.json())
        .then((data) => setProblem(data))
        .catch(() => setProblem(undefined));
    }

    const submitReview = async (state: boolean) =>{
        if (!problem)
            return;
        const ret = await fetch(process.env.NEXT_PUBLIC_BACKEND +'/problem/review/'+problem?._id+"?state="+state, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(problem),
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        cancelReview(false);
    }

    return (
        <div className="flex flex-col items-center gap-10 p-20 w-full h-full ">
            <div className="flex text-white font-bold text-4xl">Review code!</div>
            <div className="bg-slate-700 rounded-xl overflow-y-auto w-full h-full flex flex-col p-4 gap-2">

                {
                    problem == undefined ? <div className="text-center font-bold"> No problem to review! Come back later </div>: (
                        <div>
                            <div>{problem?.title}</div>
                            <div>{problem?.description}</div>
                            <div>{problem?.initial_code}</div>
                            <div>{problem?.stdin}</div>
                            <div>{problem?.expected_output}</div>
                        </div>
                    )
                }
            </div>
            {
                problem == undefined ? (
                    <div className="flex gap-5">
                          <button type="button"
                            className={`text-gray-500 bg-green-900
                            font-semibold py-2 px-4 pointer-events-none
                            border-transparent rounded-lg`}>
                                Accept
                        </button>
                        <button type="button"
                            className={`text-gray-500 bg-red-900
                            font-semibold py-2 px-4 pointer-events-none
                            border-transparent rounded-lg`}>
                                Reject
                        </button>
                        <button type="button"
                            className={`hover:bg-gray-600 text-white bg-gray-500
                            font-semibold hover:text-white py-2 px-4 hover:border-white 
                            border-transparent rounded-lg transition-all duration-300
                            active:animate-shrink`}
                            onClick={() => cancelReview(false)}>
                                Cancel
                        </button>                   
                    </div>
                ) : (
                    <div className="flex gap-5">
                        <button type="button"
                            className={`hover:bg-green-800 text-white bg-green-600
                            font-semibold hover:text-white py-2 px-4 hover:border-white 
                            border-transparent rounded-lg transition-all duration-300
                            active:animate-shrink`}
                            onClick={() => submitReview(true)}>
                                Accept
                        </button>
                        <button type="button"
                            className={`hover:bg-red-800 text-white bg-red-600
                            font-semibold hover:text-white py-2 px-4 hover:border-white 
                            border-transparent rounded-lg transition-all duration-300
                            active:animate-shrink`}
                            onClick={() => submitReview(false)}>
                                Reject
                        </button>
                        <button type="button"
                            className={`hover:bg-gray-600 text-white bg-gray-500
                            font-semibold hover:text-white py-2 px-4 hover:border-white 
                            border-transparent rounded-lg transition-all duration-300
                            active:animate-shrink`}
                            onClick={() => cancelReview(false)}>
                                Cancel
                        </button>
                    </div>
                )
            }
        </div>
    )
}