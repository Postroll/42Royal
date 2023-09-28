'use client'
import { useState } from "react"

import ReviewOverview from "@/components/review/reviewOverview";
import ReviewForm from "@/components/review/reviewForm";

export default function Review() {
    const [review, setReview] = useState<boolean>(false);

    return (
        <div className="max-h-screen max-w-screen h-screen w-screen pt-14 bg-slate-800 flex justify-center">
            {!review ? 
                <ReviewOverview setReview={setReview}/> 
                :
                <ReviewForm cancelReview={setReview}/>
            }
        </div>
    )
}