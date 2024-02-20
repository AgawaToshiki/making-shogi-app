"use client"
import React, { useState } from 'react';
import ProtectRoute from '../components/ProtectRoute';
import Square from '../components/Square';
import Image from "next/image";

const Create = () => {
  const [piece, setPiece] = useState<string>("");
  const [board, setBoard] = useState<string[][]>
  ([
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
  ]);
  const [hasPiece, setHasPiece] = useState<string[]>([]);
  const boardNumber = ["一","二","三","四","五","六","七","八","九"]
  const handleSetPiece = (item: string) => {
    setPiece(item);
    console.log(piece);
  }
  const handleSetArea = (row: number, col: number) => {
    const newBoard = [...board];
    newBoard[row][col] = piece;
    setBoard(newBoard);
    setPiece("");
    console.log(board);
  }

  const handleSetMyArea = () => {
    const newHasPiece = [...hasPiece, piece];
    setHasPiece(newHasPiece);
    setPiece("");
  }
  return (
    <ProtectRoute>
      <div>
        <div className="flex items-end">
          <div>
            <div className="flex items-center">
              <p className="w-[75px] px-6 pb-2 text-center">9</p>
              <p className="w-[75px] px-6 pb-2 text-center">8</p>
              <p className="w-[75px] px-6 pb-2 text-center">7</p>
              <p className="w-[75px] px-6 pb-2 text-center">6</p>
              <p className="w-[75px] px-6 pb-2 text-center">5</p>
              <p className="w-[75px] px-6 pb-2 text-center">4</p>
              <p className="w-[75px] px-6 pb-2 text-center">3</p>
              <p className="w-[75px] px-6 pb-2 text-center">2</p>
              <p className="w-[75px] px-6 pb-2 text-center">1</p>
              <p className="w-[50px] pl-2"></p>
            </div>
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className="flex items-center">
                {row.map((piece, colIndex) => (
                  <Square 
                    key={`${rowIndex}-${colIndex}`} 
                    piece={piece}
                    onClick={() => handleSetArea(rowIndex, colIndex)}
                  />
                ))}
                <p className="w-[50px] pl-2">{boardNumber[rowIndex]}</p>
              </div>
            ))}
          </div>
          <div 
            className="w-[150px] h-[150px] p-6 bg-yellow-100"
            onClick={handleSetMyArea}
          >
            {hasPiece}
          </div>
        </div>
        <div>
          <p>攻め方・持ち駒</p>
          <button onClick={ () => handleSetPiece('王') }>
            <Image src="/images/black_king.png" width={30} height={30} alt="王" />
          </button>
          <button onClick={ () => handleSetPiece('飛') }>
            <Image src="/images/black_rook.png" width={30} height={30} alt="飛" />
          </button>
          <button onClick={ () => handleSetPiece('角') }>
            <Image src="/images/black_bishop.png" width={30} height={30} alt="角" />
          </button>
          <button onClick={ () => handleSetPiece('金') }>
            <Image src="/images/black_gold.png" width={30} height={30} alt="金" />
          </button>
          <button onClick={ () => handleSetPiece('銀') }>
            <Image src="/images/black_silver.png" width={30} height={30} alt="銀" />
          </button>
          <button onClick={ () => handleSetPiece('桂') }>
           <Image src="/images/black_knight.png" width={30} height={30} alt="桂" />
          </button>
          <button onClick={ () => handleSetPiece('香') }>
           <Image src="/images/black_lance.png" width={30} height={30} alt="香" />
          </button>
          <button onClick={ () => handleSetPiece('歩') }>
           <Image src="/images/black_pawn.png" width={30} height={30} alt="歩" />
          </button>
          <button onClick={ () => handleSetPiece('龍') }>
            <Image src="/images/black_dragon.png" width={30} height={30} alt="龍" />
          </button>
          <button onClick={ () => handleSetPiece('馬') }>
          <Image src="/images/black_horse.png" width={30} height={30} alt="馬" />
          </button>
          <button onClick={ () => handleSetPiece('成銀') }>
            <Image src="/images/black_prom_silver.png" width={30} height={30} alt="成銀" />
          </button>
          <button onClick={ () => handleSetPiece('成桂') }>
            <Image src="/images/black_prom_knight.png" width={30} height={30} alt="成桂" />
          </button>
          <button onClick={ () => handleSetPiece('成香') }>
            <Image src="/images/black_prom_lance.png" width={30} height={30} alt="成香" />
          </button>
          <button onClick={ () => handleSetPiece('と') }>
            <Image src="/images/black_prom_pawn.png" width={30} height={30} alt="と金" />
          </button>
        </div>
        <div>
          <p>玉方</p>
          <button onClick={ () => handleSetPiece('玉R') }>
            <Image src="/images/black_king.png" width={30} height={30} alt="王" />
          </button>
          <button onClick={ () => handleSetPiece('飛R') }>
            <Image src="/images/black_rook.png" width={30} height={30} alt="飛" />
          </button>
          <button onClick={ () => handleSetPiece('角R') }>
            <Image src="/images/black_bishop.png" width={30} height={30} alt="角" />
          </button>
          <button onClick={ () => handleSetPiece('金R') }>
            <Image src="/images/black_gold.png" width={30} height={30} alt="金" />
          </button>
          <button onClick={ () => handleSetPiece('銀R') }>
            <Image src="/images/black_silver.png" width={30} height={30} alt="銀" />
          </button>
          <button onClick={ () => handleSetPiece('桂R') }>
            <Image src="/images/black_knight.png" width={30} height={30} alt="桂" />
          </button>
          <button onClick={ () => handleSetPiece('香R') }>
            <Image src="/images/black_lance.png" width={30} height={30} alt="香" />
          </button>
          <button onClick={ () => handleSetPiece('歩R') }>
            <Image src="/images/black_pawn.png" width={30} height={30} alt="歩" />
          </button>
          <button onClick={ () => handleSetPiece('龍R') }>
            <Image src="/images/black_dragon.png" width={30} height={30} alt="龍" />
          </button>
          <button onClick={ () => handleSetPiece('馬R') }>
            <Image src="/images/black_horse.png" width={30} height={30} alt="馬" />
          </button>
          <button onClick={ () => handleSetPiece('成銀R') }>
            <Image src="/images/black_prom_silver.png" width={30} height={30} alt="成銀" />
          </button>
          <button onClick={ () => handleSetPiece('成桂R') }>
            <Image src="/images/black_prom_knight.png" width={30} height={30} alt="成桂" />
          </button>
          <button onClick={ () => handleSetPiece('成香R') }>
            <Image src="/images/black_prom_lance.png" width={30} height={30} alt="成香" />
          </button>
          <button onClick={ () => handleSetPiece('とR') }>
            <Image src="/images/black_prom_pawn.png" width={30} height={30} alt="と金" />
          </button>
        </div>
      </div>
    </ProtectRoute>
  )
}

export default Create