"use client"
import React, { useEffect, useRef, useState } from 'react';
// import Link from 'next/link'
// import { v4 as uuidv4 } from 'uuid';
// import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
// import { auth, db } from "../../firebase";
import Header from './Header';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import Square from './Square';
import Image from "next/image";

type Props = {
  user: {
    id: string;
  }
}

const DashBoard = ({ user }: Props) => {
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
  const [game, setGame] = useState<{ board: { [key: number]: string }[], hasPiece: string[] }[]>([{ board: defaultBoard, hasPiece: [] }]);
  const [board, setBoard] = useState<{ [key: number]: string }[]>(defaultBoard);
  const [hasPiece, setHasPiece] = useState<string[]>([]);
  const boardNumber = ["一","二","三","四","五","六","七","八","九"];
  const boardRowNumber = [1,2,3,4,5,6,7,8,9];
  useEffect(() => {
    const uid = auth.currentUser?.uid
    console.log(uid)
    const gamesQuery = query(collection(db, "games"), where("uid", "==", uid))
    onSnapshot(gamesQuery, (querySnapshot) => {
      const games : { board: { [key: number]: string }[], hasPiece: string[] }[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setBoard(data.board);
        setHasPiece(data.hasPiece);
        const gameData = {
          board: data.board,
          hasPiece: data.hasPiece
        }
        games.push(gameData)
        setGame(games)
      })
    })
  },[])
  console.log(game)
  return (
    <>
      <Header user={ user } />
      <main className="max-w-[1920px] pt-40">
        <h2 className="text-xl">詰将棋一覧</h2>
        <div>
          <div className="flex items-center">
            {boardRowNumber.map((index) => (
              <p key={index} className="w-[75px] px-6 pb-2 text-center">{boardRowNumber[boardRowNumber.length - index]}</p>
            ))}
          </div>
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="flex items-center">
              {Object.values(row).map((piece, colIndex) => (
                <Square 
                  key={`${rowIndex}-${colIndex}`} 
                  piecePath={piece}
                />
              ))}
              <p className="w-[50px] pl-2">{boardNumber[rowIndex]}</p>
            </div>
          ))}
          <div 
            className="flex flex-wrap w-[250px] h-[250px] p-6 bg-yellow-100"
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
      </main>
    </>
  )
}

export default DashBoard