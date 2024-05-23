import React from 'react'
import Image from 'next/image'

interface hasPieceProps {
  hasPiece: string[];
  handleSetMyArea?: () => void;
}

const HasPiece = ({ hasPiece, handleSetMyArea }: hasPieceProps) => {
  return (
    <div>
    <p>持ち駒</p>
      <div 
        className="flex flex-wrap content-center w-[250px] h-[250px] p-6 bg-yellow-100 max-md:w-[150px] max-md:h-[150px] max-md:p-2"
        onClick={handleSetMyArea}
      >
        {hasPiece.map((piece, index) => (
          <Image 
            key={index} 
            src={piece} 
            width={140} 
            height={148} 
            alt="持ち駒" 
            className="w-[50px] h-auto object-contain max-md:w-[30px]"
          />
        ))}
    </div>
  </div>
  )
}

export default HasPiece