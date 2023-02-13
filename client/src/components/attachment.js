import React from 'react'

export default function Attachment({item}) {

    const getSizeInMB = size=>{
        return (size/1024).toFixed(2)
    }
  return (
    <a href={item.url} target="_blank" className="flex w-52 border border-gray-200 rounded-lg items-center">
        <div className="bg-[#d61f69] h-14 flex justify-center items-center rounded-l-lg w-16 ">
            <p className="text-white text-center text-sm">{item.type}</p>
        </div>
        <div className="flex-col px-2">
            <p className="text-sm text-gray-700">{item.fileName}</p>
            <p className="text-xs text-gray-600">{getSizeInMB(item.size)} MB</p>
        </div>
    </a>
  )
}
