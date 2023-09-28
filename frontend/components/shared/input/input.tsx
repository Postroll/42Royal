'use client'

import { useState } from "react"

interface IInput{
    placeholder: string,
    value: string,
    setValue: Function,
}

export default function Input({placeholder, value, setValue}: IInput){

  return (
  <div className="w-full">
    <div className="relative h-10 w-full min-w-[200px]">
      <input
        className={`peer h-full w-full rounded-[7px] border border-slate-900 bg-inherit
        px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0
        transition-all placeholder-shown:border placeholder-shown:border-slate-900
        placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-900
        focus:border-t-transparent empty:border-t-1 focus:outline-0 disabled:border-0 
        ${value !== "" ? 'border-t-transparent' : ''}`}
        placeholder=" "
        value = {value}
        onChange={(e)=>{setValue(e.target.value)}}
      />
      <label className="
      before:content[' '] after:content[' '] pointer-events-none absolute left-0
      -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400
      transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block
      before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l
      before:border-slate-900 before:transition-all after:pointer-events-none after:mt-[6.5px]
      after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md
      after:border-t after:border-r after:border-slate-900 after:transition-all
      peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75]
      peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent
      peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight
      peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2
      peer-focus:before:border-slate-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2
      peer-focus:after:border-slate-900 peer-disabled:text-transparent peer-disabled:before:border-transparent
      peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
        {placeholder}
      </label>
    </div>
  </div>
  )
}