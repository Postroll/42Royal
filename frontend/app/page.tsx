'use client'

import Image from "next/image"
import { useState } from "react"
import Link from "next/link"

/*components*/
import Footer from "@/components/navigation/footer"
import Card from "@/components/shared/card"
import Table from "@/components/shared/table"

/*images and logo*/
import bg from "../assets/bg.png"
import bg2 from "../assets/bg3.png"
import players_logo from "../assets/players.svg"
import game_logo from "../assets/game.svg"
import code_logo from "../assets/code.svg"

export default function Home() {
  const [hover, setHover] = useState(false);

  return (
    <div className="relative">
      <section id="about" className="text-white h-[100vh] flex z-10 bg-gradient-to-b from-[#00040e] from-85% to-[#4b1561] ">
        <Image className="absolute -top-56 left-0 object-cover h-screen w-screen" src={bg2} alt="bg" priority={true}/>
        <div className="flex flex-col w-full justify-around">
          <div className="flex justify-around">
            <div className=""></div>
            <div className="z-0 flex flex-col items-end pr-28">
              <h1 className="text-white font-unna font-bold text-9xl text-right pointer-events-none z-0">
                42 Royal
              </h1>
              <p className=" pt-6 text-white w-5/12 text-md text-right pointer-events-none z-0">
                Welcome to the competitive coding game made for 42 students!
                Challenge your friends, improved your rank, bring honor to your campus!
              </p>
              <div className="mt-8">
                <Link href='/game' onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)} className="z-0 whitespace-pre-wrap w-fit text-lg place-self-end bg-white text-black rounded-lg py-2 px-2 mt-4 font-bold justify-self-center hover:animate-shrink hover:text-white hover:bg-transparent border-white border-2">
                  {`${hover ? '< Play >' : ' <Play> '}`}
                </Link>
              </div>
            </div>
          </div>

          {/* <div onPointerEnter={()=>setHover(true)} onPointerLeave={()=>setHover(false)} className={`flex justify-between my-40 mt-10 -mx-40 transform duration-500 hover:-mx-0 ${hover ? 'animate-none' : 'animate-peek'}`}>
            <Table title="Top player" value="wins" objects={''}/>
          </div> */}
          <div className="flex flex-wrap z-0 gap-5 justify-center -mt-10  xl:-mt-0 lg:mt-0 xl:gap-20 xl:animation-all duration-400">
            <Card logo={game_logo} text='game played' stat="666" dur={3}/>
            <Card logo={players_logo} text='player registered' stat="66666" dur={3}/>
            <Card logo={code_logo} text='code submited' stat="6666" dur={3}/>
          </div>
        </div>
      </section>
      <section id="about" className="text-white h-screen bg-[#4b1561]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      </section>
      <Footer/>
    </div>
  )
}