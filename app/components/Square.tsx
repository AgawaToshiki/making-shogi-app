import React from 'react'

interface SquareProps {
  piece: string;
  onClick: () => void;
}
const Square = ({ piece, onClick }: SquareProps) => {
  return (
    <div 
      className="w-[75px] h-[75px] p-6 border border-collapse box-border text-center bg-yellow-100"
      onClick={onClick}
    >
      {piece}
    </div>
  )
}

export default Square