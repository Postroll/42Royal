import Image, { StaticImageData } from "next/image";
import { Interface } from "readline";

interface ITable{
    title: string,
    value: string,
    objects: any
}

export default function Table({title, value, objects}: ITable) {
    const content = [
        {user: "Player 1", elo: "1000"},
        {user: "Player 2", elo: "900"},
        {user: "Player 3", elo: "800"},
        {user: "Player 4", elo: "700"},
        {user: "Player 5", elo: "600"},
    ]
    return (
<div className="relative overflow-hidden shadow-md sm:rounded-lg scale-75 opacity-90">
    <table className="w-full text-sm text-left text-gray-400 pointer-events-none">
        <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    {title}
                </th>
                <th scope="col" className="px-6 py-3">
                    {value}
                </th>
            </tr>
        </thead>
        <tbody>
            {content.map((elem, index) => {
                return (
                    index % 2 === 0 ? (
                        <tr key={index} className="bg-gray-900 border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                {elem.user}
                            </th>
                            <td className="px-6 py-4">
                                {elem.elo}
                            </td>
                        </tr>
                    ) : (
                        <tr key={index} className="bg-gray-800 border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                                {elem.user}
                            </th>
                            <td className="px-6 py-4">
                                {elem.elo}
                            </td>
                        </tr>   
                    )
                )
            })}
        </tbody>
    </table>
</div>
    )
}