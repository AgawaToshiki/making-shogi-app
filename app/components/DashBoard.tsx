"use client"
import React, { useEffect, useState } from 'react';
import Header from './Header';
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
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
  const [game, setGame] = useState<{ board: { [key: number]: string }[], hasPiece: string[], shogiId: string }[]>([{ board: defaultBoard, hasPiece: [], shogiId: "" }]);
  const boardNumber = ["一","二","三","四","五","六","七","八","九"];
  const boardRowNumber = [1,2,3,4,5,6,7,8,9];
  useEffect(() => {
    const uid = auth.currentUser?.uid
    console.log(uid)
    const gamesQuery = query(collection(db, "games"), where("uid", "==", uid))
    onSnapshot(gamesQuery, (querySnapshot) => {
      const games : { board: { [key: number]: string }[], hasPiece: string[], shogiId: string }[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const gameData = {
          board: data.board,
          hasPiece: data.hasPiece,
          shogiId: data.shogiId
        }
        games.push(gameData)
        setGame(games)
      })
    })
  },[])

  const handleDeleteShogi = async(id: string) => {
    await deleteDoc(doc(db, "games", id))
  }

  console.log(game)
  return (
    <>
      <Header />
      <main className="max-w-[1920px] pt-20">
        <div className="flex flex-col items-center w-full">
          {game.map((game, gameIndex) => (
            <div key={gameIndex} className="flex items-end mb-20">
              <div>
                <div className="flex items-center">
                  {boardRowNumber.map((index) => (
                    <p key={index} className="w-[75px] px-6 pb-2 text-center">{boardRowNumber[boardRowNumber.length - index]}</p>
                  ))}
                </div>
                {game.board.map((row, rowIndex) => (
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
              </div>
              <div>
                <div className="mb-10">
                  <div>
                    <button onClick={() => handleDeleteShogi(game.shogiId)} className="border-2 border-font-color p-2 bg-red-300">削除</button>
                  </div>
                </div>
                <p>持ち駒</p>
                <div 
                  className="flex flex-wrap w-[250px] h-[250px] p-6 bg-yellow-100"
                >
                  {game.hasPiece.map((piece, index) => (
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
          ))}
        </div>
        
      </main>
    </>
  )
}

export default DashBoard