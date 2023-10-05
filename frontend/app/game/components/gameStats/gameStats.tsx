import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../page";
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
    const gameContext = useContext(GameContext);
    const [extractedDataset, setExtractedDataset] = useState<any>();
    const [options, setOptions] = useState<any>();

    useEffect(()=>{
        extractDataset();
        extractOptions();
    },[])

    let optionsTest2 = {
        responsive: true,
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
                type: 'linear',
                time: {
                    unit: 'second',
                    displayFormats: {
                        quarter: 'mm:ss'
                    }
                },
                ticks: {
                    min: 0,
                    stepSize: 30,
                    max: 900,
                    callback: function(value: number) {
                        return (Math.round(value / 60) + ':' + String(value % 60).padStart(2, '0'));
                    }
                },
            },
        }
    }

    const extractOptions = () => {
        if(!data)
            return;
        let optionsTmp = {
            responsive: true,
            layout: {
                padding: 20
            },
            scales: {
                y: {
                    ticks: {
                        min: 0,
                        max: 10,
                        stepSize : 1,
                    }
                },
                x: {
                    type: 'linear',
                    time: {
                        unit: 'second',
                        displayFormats: {
                            quarter: 'mm:ss'
                        }
                    },
                    ticks: {
                        min: 0,
                        stepSize: 30,
                        max: 30 * 60,
                        callback: function(value: number) {
                            return (Math.round(value / 60) + ':' + String(value % 60).padStart(2, '0'));
                        }
                    },
                },
            }
        }
        optionsTmp.scales.y.ticks.max = data.problems.length;
        optionsTmp.scales.x.ticks.max = data.timeLimit * 60;
        setOptions(optionsTmp);
    }

    const extractDataset = () => {
        if (!data?.players)
            return;
        let dataset = '{"datasets":[';
        data.players.forEach(player => {
            let tmp = player.playerStats.data
            dataset += `{ "tension": 0.4, "cubicInterpolationMode": "monotone","data":` + tmp.substring(0, tmp.length - 1) + '], "label": "'+player.username+'", "borderColor": "' + player.playerStats.borderColor + '"},';
        });
        dataset = dataset.substring(0, dataset.length - 1) + ']}';
        console.log(dataset);
        console.log(JSON.parse(dataset));
        setExtractedDataset(JSON.parse(dataset));
    }

    return (
        <div className="flex flex-col items-center h-full">
            <div className="flex flex-col items-center w-[80%] bg-p1/50 self-center rounded-lg my-4 gap-4 pb-4 h-full">
                <div className="text-white font-bold text-4xl p-8">
                    Game ended!
                </div>
                <div className=" w-[80%]">
                    {
                        extractedDataset &&
                    <Line
                        height={100}
                        className="rounded-lg bg-gradient-to-tr from-p1 to-p1/40"
                        data={extractedDataset}
                        options={options}
                    />
                    }
                </div>
                <div className="bg-p1 w-[80%] h-full p-4 rounded-lg items-center flex flex-col gap-2">
                    <div className="text-white font-bold text-xl">
                        Ranking
                    </div>
                    <div className="flex flex-col whitespace-pre-wrap text-white rounded-lg w-full max-w-[60%] p-2 items-center gap-2">
                        {
                            data?.players &&
                            [...data?.players].map((player, index) => {
                                return (
                                <div className="flex w-full gap-2 bg-black/40 p-2 rounded-lg justify-between">
                                    <div className="">
                                        Rank {index + 1}
                                    </div>
                                    <div className="">
                                        {player[1].username} 
                                    </div>
                                    <div>
                                        score: {player[1].score}
                                    </div>
                                </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}