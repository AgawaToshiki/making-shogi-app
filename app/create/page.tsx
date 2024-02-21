"use client"
import React, { useState } from 'react';
import ProtectRoute from '../components/ProtectRoute';
import Square from '../components/Square';
import Image from "next/image";
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import { v4 as uuidv4 } from 'uuid';

const Create = () => {
  const defaultBoard: { [key: string]: string }[] = [
    { "9一": "", "8一": "", "7一": "", "6一": "", "5一": "", "4一": "", "3一": "", "2一": "", "1一": "" },
    { "9二": "", "8二": "", "7二": "", "6二": "", "5二": "", "4二": "", "3二": "", "2二": "", "1二": "" },
    { "9三": "", "8三": "", "7三": "", "6三": "", "5三": "", "4三": "", "3三": "", "2三": "", "1三": "" },
    { "9四": "", "8四": "", "7四": "", "6四": "", "5四": "", "4四": "", "3四": "", "2四": "", "1四": "" },
    { "9五": "", "8五": "", "7五": "", "6五": "", "5五": "", "4五": "", "3五": "", "2五": "", "1五": "" },
    { "9六": "", "8六": "", "7六": "", "6六": "", "5六": "", "4六": "", "3六": "", "2六": "", "1六": "" },
    { "9七": "", "8七": "", "7七": "", "6七": "", "5七": "", "4七": "", "3七": "", "2七": "", "1七": "" },
    { "9八": "", "8八": "", "7八": "", "6八": "", "5八": "", "4八": "", "3八": "", "2八": "", "1八": "" },
    { "9九": "", "8九": "", "7九": "", "6九": "", "5九": "", "4九": "", "3九": "", "2九": "", "1九": "" },
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

  const handleSetArea = (row: number, colKey: string) => {
    const newBoard = [...board];
    newBoard[row][colKey] = piecePath
    setBoard(newBoard);
    setPiecePath("");
    console.log(board);
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
    const shogiId = uuidv4();
    await setDoc(doc(db, "games", shogiId), {
      shogiId: shogiId,
      board: board,
      hasPiece: hasPiece,
      uid: auth.currentUser?.uid
    });
    setBoard(defaultBoard);
  }

  return (
    <ProtectRoute>
      <div className="flex flex-col justify-center items-center">
        <div className="flex items-end mb-4">
          <div>
            <div className="flex items-center">
              {boardRowNumber.map((index) => (
                <p key={index} className="w-[75px] px-6 pb-2 text-center">{boardRowNumber[boardRowNumber.length - index]}</p>
              ))}
            </div>
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className="flex items-center">
                {Object.entries(row).map(([colKey, piece]) => (
                  <Square 
                    key={`${rowIndex}-${colKey}`} 
                    piecePath={piece}
                    onClick={() => handleSetArea(rowIndex, colKey)}
                  />
                ))}
                <p className="w-[50px] pl-2">{boardNumber[rowIndex]}</p>
              </div>
            ))}
          </div>
          <div>
            <div className="mb-10">
              <div>
                <button onClick={handleSaveShogi}>保存</button>
              </div>
              <div>
                <button onClick={handleBoardReset}>盤面リセット</button>
              </div>
              <div>
                <button onClick={handleMyAreaReset}>持ち駒リセット</button>
              </div>
            </div>
            <p>持ち駒</p>
            <div 
              className="flex flex-wrap w-[250px] h-[250px] p-6 bg-yellow-100"
              onClick={handleSetMyArea}
            >
              {hasPiece.map((piece, index) => (
                <Image 
                  key={index} 
                  src={piece} 
                  width={140} 
                  height={148} 
                  alt="持ち駒" 
                  style={{ width: "40px", height: "auto", objectFit: 'contain' }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="p-2 border border-gray-500">
          <div>
            <p>攻め方・持ち駒</p>
            {pieces.map((piece, index) => (
              <button key={index} onClick={() => handleSetPiece(piece.imagePath)}>
                <Image 
                  src={piece.imagePath} 
                  width={140} 
                  height={148} 
                  alt={piece.name} 
                  style={{ width: "40px", height: "auto" }}
                  className={piecePath === piece.imagePath ? "bg-red-200": ""}
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
                    style={{ width: "40px", height: "auto" }}
                    className={piecePath === piece.imagePath ? "bg-red-200": ""}
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