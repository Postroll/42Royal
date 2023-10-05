import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-moment';
import { 
    CategoryScale,
    Chart,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    TimeScale,
} from "chart.js";

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TimeScale,
    Title,
    Tooltip,
    Legend,
    Filler,
);

interface IGameStats{
    data: any,
}
  
export default function GameStatsComponent({data}: IGameStats){

    let optionsTest = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Game stats'
          }
        },
        layout: {
            padding: 20
        },
        scales: {
            y: {
                ticks: {
                    min: 0,
                    max: 5,
                    stepSize : 1,
                }
            },
            x: {
                type: "time",
                autoSkip: false,
                time: {
                    unit: 'second',
                    displayFormats: {
                        second: 'h:mm:ss'
                    }
                },
                ticks: {
                    min: 1696462324287,
                    stepSize: 60,
                    max: 1696462764287
                },
            },
        }
    }

    const dataset = {
        "datasets": [{
            borderColor: "rgba(255,99,132,1)",
            cubicInterpolationMode: 'monotone',
            tension: 0.4,
            "data":[
                {"x":1696462324287,"y":0},
                {"x":1696462374287,"y":1},
                {"x":1696462444287,"y":2}
            ],
            "label":"Nskiba"
            },{
            borderColor: "rgba(105,99,132,1)",
            cubicInterpolationMode: 'monotone',
            tension: 0.4,
            "data":[
                {"x":1696462324287,"y":0},
                {"x":1696462339387,"y":1},
                {"x":1696462414287,"y":2},
                {"x":1696462564287,"y":3},
                {"x":1696462764287,"y":4},
                {"x":1696462864287,"y":5}
            ],
            "label":"Mlauro"
        }]
    }

    return (
        <div className="flex flex-col items-center h-full">
            {/* <button onClick={()=>console.log(data)}>CLICK</button> */}
            <div className="flex flex-col items-center w-[80%] bg-p1/50 self-center rounded-lg my-4 gap-4 pb-4 h-full">
                <div className="text-white font-bold text-4xl p-8">
                    Game ended!
                </div>
                <div className=" w-[80%]">
                    <Line
                        height={100}
                        className="rounded-lg bg-gradient-to-tr from-p1 to-p1/40"
                        data={dataset}
                        options={optionsTest}
                    />
                </div>
                <div className="bg-p1 w-[95%] h-full p-4 rounded-lg items-center flex flex-col gap-2">
                    <div className="text-white font-bold text-xl">
                        Ranking
                    </div>
                    <div className="flex flex-col whitespace-pre-wrap text-white rounded-lg bg-black/50 w-full max-w-[60%] p-2 items-center justify-between gap-2">
                        {
                            data?.players &&
                            [...data?.players].map((player) => {
                                return <div className="flex justify-around w-full">
                                    <div>
                                        Rank 1
                                    </div>
                                    <div>
                                        {player[1].username} 
                                    </div>
                                    <div>
                                        score: {player[1].score}
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}