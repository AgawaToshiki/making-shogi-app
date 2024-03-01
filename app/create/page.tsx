"use client"
import React, { useState } from 'react';
import ProtectRoute from '../components/ProtectRoute';
import Square from '../components/Square';
import Image from "next/image";
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import { v4 as uuidv4 } from 'uuid';
import Header from '../components/Header';
import HasPiece from '../components/HasPiece';

const Create = () => {
  const defaultBoard: { [key: number]: string }[] = [
    { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
    { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
    { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
    { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
    { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
    { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
    { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
    { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
    { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
  ]
  const [piecePath, setPiecePath] = useState<string>("");
  const [board, setBoard] = useState<{ [key: string]: string }[]>(defaultBoard);
  const [hasPiece, setHasPiece] = useState<string[]>([]);
  const boardNumber = ["一","二","三","四","五","六","七","八","九"];
  const boardRowNumber = [1,2,3,4,5,6,7,8,9];
  const pieces = [
    { name: '王', imagePath: '/images/black_king.png' },
    { name: '飛', imagePath: '/images/black_rook.png' },
    { name: '角', imagePath: '/images/black_bishop.png' },
    { name: '金', imagePath: '/images/black_gold.png' },
    { name: '銀', imagePath: '/images/black_silver.png' },
    { name: '桂', imagePath: '/images/black_knight.png' },
    { name: '香', imagePath: '/images/black_lance.png' },
    { name: '歩', imagePath: '/images/black_pawn.png' },
    { name: '龍', imagePath: '/images/black_dragon.png' },
    { name: '馬', imagePath: '/images/black_horse.png' },
    { name: '成銀', imagePath: '/images/black_prom_silver.png' },
    { name: '成桂', imagePath: '/images/black_prom_knight.png' },
    { name: '成香', imagePath: '/images/black_prom_lance.png' },
    { name: 'と', imagePath: '/images/black_prom_pawn.png' },
  ];
  const piecesReverse = [
    { name: '玉', imagePath: '/images/white_king2.png' },
    { name: '飛', imagePath: '/images/white_rook.png' },
    { name: '角', imagePath: '/images/white_bishop.png' },
    { name: '金', imagePath: '/images/white_gold.png' },
    { name: '銀', imagePath: '/images/white_silver.png' },
    { name: '桂', imagePath: '/images/white_knight.png' },
    { name: '香', imagePath: '/images/white_lance.png' },
    { name: '歩', imagePath: '/images/white_pawn.png' },
    { name: '龍', imagePath: '/images/white_dragon.png' },
    { name: '馬', imagePath: '/images/white_horse.png' },
    { name: '成銀', imagePath: '/images/white_prom_silver.png' },
    { name: '成桂', imagePath: '/images/white_prom_knight.png' },
    { name: '成香', imagePath: '/images/white_prom_lance.png' },
    { name: 'と', imagePath: '/images/white_prom_pawn.png' },
  ];

  const handleSetPiece = (item: string) => {
    setPiecePath(item);
  }

  const handleSetArea = (row: number, col: string) => {
    const newBoard = [...board];
    newBoard[row][col] = piecePath
    setBoard(newBoard);
    setPiecePath("");
  }

  const handleSetMyArea = () => {
    if(piecePath != ""){
      const newHasPiece = [...hasPiece, piecePath];
      setHasPiece(newHasPiece);
    }
    setPiecePath("");
  }

  const handleBoardReset = () => {
    setBoard(defaultBoard);
  }

  const handleMyAreaReset = () => {
    setHasPiece([]);
  }

  const handleSaveShogi = async() => {
    if(JSON.stringify(board) === JSON.stringify(defaultBoard)) return
    const shogiId = uuidv4();
    const createDate = new Date();
    await setDoc(doc(db, "games", shogiId), {
      shogiId: shogiId,
      board: board,
      hasPiece: hasPiece,
      uid: auth.currentUser?.uid,
      createdAt: createDate
    });
    setBoard(defaultBoard);
    setHasPiece([]);
  }

  return (
    <ProtectRoute>
      <Header />
      <div className="flex flex-col justify-center items-center pt-20">
        <div className="flex items-end mb-4 max-md:flex-col max-md:items-start">
          <div className="max-md:mb-2">
            <div className="flex items-center">
              {boardRowNumber.map((index) => (
                <p key={index} className="w-[75px] px-6 pb-2 text-center max-md:w-[30px] max-md:px-0 max-md:pb-1">{boardRowNumber[boardRowNumber.length - index]}</p>
              ))}
            </div>
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className="flex items-center">
                {Object.entries(row).map(([col, piece]) => (
                  <Square 
                    key={`${rowIndex}-${col}`} 
                    piecePath={piece}
                    onClick={() => handleSetArea(rowIndex, col)}
                  />
                ))}
                <p className="w-[50px] pl-2 max-md:w-[30px] max-md:pl-1">{boardNumber[rowIndex]}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start max-md:w-[100%] max-md:flex-row-reverse max-md:items-end max-md:justify-between">
            <div className="mb-10 max-md:mb-0">
              <div className="mb-10 max-md:mb-0">
                <button onClick={handleSaveShogi} className="w-[200px] h-[200px] border-2 border-font-color p-6 text-2xl bg-green-300 max-md:w-[75px] max-md:h-[75px] max-md:p-2 max-md:text-base">保存</button>
              </div>
              <div className="flex flex-col">
                <button onClick={handleBoardReset} className="border-2 border-font-color p-2 mb-2 bg-red-300 max-md:mb-0">盤面リセット</button>
                <button onClick={handleMyAreaReset} className="border-2 border-font-color p-2 bg-red-300">持ち駒リセット</button>
              </div>
            </div>
            <HasPiece hasPiece={hasPiece} handleSetMyArea={handleSetMyArea} />
          </div>
        </div>
        <div className="flex gap-8 p-2 border border-gray-500">
          <div>
            <p>攻め方・持ち駒</p>
            {pieces.map((piece, index) => (
              <button key={index} onClick={() => handleSetPiece(piece.imagePath)}>
                <Image 
                  src={piece.imagePath} 
                  width={140} 
                  height={148} 
                  alt={piece.name} 
                  className={piecePath === piece.imagePath ? "bg-red-200 w-[40px] h-auto max-md:w-[30px]": "w-[40px] h-auto max-md:w-[30px]"}
                />
              </button>
            ))}
          </div>
          <div>
            <p>玉方</p>
              {piecesReverse.map((piece, index) => (
                <button key={index} onClick={() => handleSetPiece(piece.imagePath)}>
                  <Image 
                    src={piece.imagePath} 
                    width={140} 
                    height={148} 
                    alt={piece.name} 
                    className={piecePath === piece.imagePath ? "bg-red-200 w-[40px] h-auto max-md:w-[30px]": "w-[40px] h-auto max-md:w-[30px]"}
                  />
                </button>
              ))}
          </div>
        </div>
      </div>
    </ProtectRoute>
  )
}

export default Create