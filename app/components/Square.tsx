import React from 'react';
import Image from "next/image";

interface SquareProps {
  piecePath: string;
  onClick?: () => void;
}
const Square = ({ piecePath, onClick }: SquareProps) => {
  return (
    <div 
      className="w-[75px] h-[75px] p-4 border border-gray-400 border-collapse box-border text-center bg-yellow-100 max-md:w-[30px] max-md:h-[30px] max-md:p-0"
      onClick={onClick}
    >
      {piecePath ? (
        <Image 
          src={piecePath} 
          width={140} 
          height={148} 
          alt="" 
          className="w-[75px] h-auto max-md:w-[30px]"
        />
      ):(
        <div></div>
      )}
    </div>
  )
}

export default Square