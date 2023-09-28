'use client'
import { useEffect, useRef, useState } from "react";

import TablePage from "@/components/shared/tablePage";
import AdvancedSearch from "@/components/shared/advancedSearch";
import ProblemForm from "@/components/problemForm";

import IProblem from "../../utils/IProblem";

export default function Review(){
    const [advancedSearch, setAdvancedSearch] = useState<Boolean>(false);
    const [edit, setEdit] = useState<Boolean>(false);

    const [problems, setProblems] = useState<IProblem[]>([]);
    const [editProblem, setEditProblem] = useState<IProblem>();
    const [count, setCount] = useState<number>(0);
    const [page, setPage] = useState<number>(1);

    const initializedPage = useRef(false)

    useEffect(() => {
        if (initializedPage.current)
            getAllProblems();
        if (!initializedPage.current)
            initializedPage.current = true;
    }, [page])

    const getAllProblems = async () => {
        setProblems([]);
        await fetch('http://localhost:5000/problem?page='+page, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then((res) => res.json())
            .then((data) => populateProblems(data))
    }

    const populateProblems = async (data: any) =>{
        await data?.problems.map((pb: IProblem) => {
            const tmp: IProblem = {
                _id: pb._id,
                title: pb.title,
                status: pb.status,
                game_type: pb.game_type,
                language: pb.language,
                stdin: pb.stdin,
                expected_output: pb.expected_output,
                description: pb.description,
                initial_code: pb.initial_code,
                reviewed_by: pb.reviewed_by,
                created_by: pb.created_by,
                created_at: pb.created_at,
            }
            setCount(data.count);
            setProblems((problems) => [...problems, tmp]);
        })
    }

    const deleteProblem = async (id: string) => {
        await fetch('http://localhost:5000/problem/'+id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then((res) => res.json())
            .then((data) => console.log(data))
        await getAllProblems();
    }

    return (
        <div>
            {
                (advancedSearch || edit) && (<div onClick={() => {setAdvancedSearch(false), setEdit(false)}} className="absolute z-10 bg-black/30 backdrop-blur-sm h-screen w-screen"/>)
            }
            <div className="max-h-screen max-w-screen h-screen w-screen pt-14 bg-slate-800 flex justify-center items-center">
                {
                    advancedSearch && <AdvancedSearch/>
                }
                {
                    (edit && editProblem) && <ProblemForm problem={editProblem} formName="Modify a problem" setEdit={setEdit} updateForm={getAllProblems}/>
                }
                <div className="bg-gray-100 flex-1 m-4 rounded-md">
                    <TablePage searchFunc={setAdvancedSearch} 
                        editFunc={setEdit} 
                        setEditProblem={setEditProblem} 
                        deleteFunc={deleteProblem} 
                        problems={problems}
                        page={page}
                        setPage={setPage}
                        count={count}/>
                </div>
            </div>
        </div>
    )
}