'use client'

import { useState } from "react"

interface IInput{
    placeholder: string,
}

export default function InputBg({placeholder}: IInput){
  return (
    <div className="relative w-full min-w-[200px] bg-[#f5f5f5] border-slate-800 border-1 rounded">
      <textarea
        className="h-full w-full p-4 border-0 rounded"
        style={{
          fontSize: 12,
          fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
        placeholder={placeholder}
      />
    </div>
  )
}