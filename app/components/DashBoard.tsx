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
  const [board, setBoard] = useState<{ [key: string]: string }[]>(defaultBoard);
  const [hasPiece, setHasPiece] = useState<string[]>([]);
  const boardNumber = ["一","二","三","四","五","六","七","八","九"];
  const boardRowNumber = [1,2,3,4,5,6,7,8,9];
  useEffect(() => {
    const uid = auth.currentUser?.uid
    console.log(uid)
    const gamesQuery = query(collection(db, "games"), where("uid", "==", uid))
    onSnapshot(gamesQuery, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setBoard(data.board);
        setHasPiece(data.hasPiece);
        console.log(data.board)
      })
    })
  },[])

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