import React from 'react';
import Image from "next/image";

interface SquareProps {
  piecePath: string;
  onClick?: () => void;
}
const Square = ({ piecePath, onClick }: SquareProps) => {
  return (
    <div 
      className="w-[75px] h-[75px] p-4 border border-collapse box-border text-center bg-yellow-100"
      onClick={onClick}
    >
      {piecePath ? (
        <Image 
          src={piecePath} 
          width={140} 
          height={148} 
          alt="" 
          style={{ width: "75px", height: "auto" }}
        />
      ):(
        <div></div>
      )}
    </div>
  )
}

export default Square