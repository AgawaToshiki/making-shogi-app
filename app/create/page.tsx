"use client"
import React, { useState } from 'react'
import ProtectRoute from '../components/ProtectRoute'
import Square from '../components/Square'

const Create = () => {
  const [isSelect, setSelect] = useState<boolean>(false);
  const [piece, setPiece] = useState<string>("");
  const handleSetPiece = (item: string) => {
    setPiece(item);
    setSelect(!isSelect);
    console.log(piece)
    console.log(isSelect)
  }
  return (
    <ProtectRoute>
      <div>
        <div className="flex bg-yellow-100">
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
        </div>
        <div className="flex bg-yellow-100">
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
        </div>
        <div className="flex bg-yellow-100">
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
        </div>
        <div className="flex bg-yellow-100">
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
        </div>
        <div className="flex bg-yellow-100">
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
        </div>
        <div className="flex bg-yellow-100">
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
        </div>
        <div className="flex bg-yellow-100">
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
        </div>
        <div className="flex bg-yellow-100">
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
        </div>
        <div className="flex bg-yellow-100">
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
        </div>
        <button onClick={ () => handleSetPiece('rook') }>
          飛車
        </button>
        <button onClick={ () => handleSetPiece('bishop') }>
          角
        </button>
        {piece}
      </div>
    </ProtectRoute>
  )
}

export default Create