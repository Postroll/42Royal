import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

interface ICard{
    logo: StaticImageData,
    text: string,
    stat: string,
    dur: number,
}

export default function Card({logo, text, stat, dur}: ICard) {
    const [count, setCount] = useState("0");

    useEffect(() => {
        let start = 0;
        const end = parseInt(stat.substring(0, 3))
        if (start === end)
            return;
        let totalMilSecDur = dur;
        let incrementTime = (totalMilSecDur / end) * 100;

        let timer = setInterval(() => {
            start += 1;
            setCount(String(start) + stat.substring(3))
            if (start === end)
                clearInterval(timer);
        }, incrementTime)

    }, [stat, dur])

    return (
        <div className=" xsm:w-8/12 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 mb-4">
            <div className="shadow-slate-950 rounded-lg overflow-hidden shadow-lg z-10 bg-slate-800 flex items-center w-full gap-10 py-4 px-8 hover:bg-slate-900 hover:animate-[wiggle_1s_ease-in-out_infinite] transition-all duration-300">
                <div className="rounded-full bg-slate-700 p-4">
                    <Image 
                        src={logo}
                        alt='stat' 
                        width={40} 
                        height={40}
                        className="text-black"
                    />
                </div>
                <div>
                    <div className="text-2xl font-bold pointer-events-none">{count}</div>
                    <div className="h-8 text-xs text-gray-400 font-bold pointer-events-none">{text}</div>
                </div>
            </div>
        </div>
    )
}