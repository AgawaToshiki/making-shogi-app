"use client"
import React, { useEffect, useState } from 'react';
import Header from './Header';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import Square from './Square';
import HasPiece from './HasPiece';


const DashBoard = () => {
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
  ];
  const boardNumber = ["一","二","三","四","五","六","七","八","九"];
  const boardRowNumber = [1,2,3,4,5,6,7,8,9];

  const [shogi, setShogi] = useState<{ board: { [key: number]: string }[], hasPiece: string[], shogiId: string }[]>([{ board: defaultBoard, hasPiece: [], shogiId: "" }]);

  useEffect(() => {
    if(auth.currentUser){
      const uid = auth.currentUser.uid;
      const getShogi = query(collection(db, "games"), where("uid", "==", uid), orderBy("createdAt", "desc"));
      onSnapshot(getShogi, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          const shogiData = doc.data();
          return {
            board: shogiData.board,
            hasPiece: shogiData.hasPiece,
            shogiId: shogiData.shogiId
          }
        })
        setShogi(data);
      })
    }
  },[])

  const handleDeleteShogi = async(id: string) => {
    const isConfirm = window.confirm("本当に詰将棋を削除しますか？");
    if(isConfirm){
      await deleteDoc(doc(db, "games", id));
    }
  }

  return (
    <>
      <Header />
      <main className={`max-w-[1920px] ${shogi[0].shogiId !== "" ? "pt-20" : ""}`}>
        <div className="flex flex-col items-center w-full">
          {shogi[0].shogiId === "" ? (
            <p className="flex items-center justify-center h-screen">詰将棋の登録がありません</p>
          ):(
            <div>
              {shogi.map((game, gameIndex) => (
                <div key={gameIndex} className="flex items-end mb-20 max-md:flex-col max-md:items-start max-md:mb-8">
                  <div className="max-md:mb-2">
                    <div className="flex items-center">
                      {boardRowNumber.map((index) => (
                        <p key={index} className="w-[75px] px-6 pb-2 text-center max-md:w-[30px] max-md:px-2 max-md:pb-1">{boardRowNumber[boardRowNumber.length - index]}</p>
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
                        <p className="w-[50px] pl-2 max-md:w-[30px] max-md:pl-1">{boardNumber[rowIndex]}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col items-start max-md:w-[100%] max-md:flex-row-reverse max-md:items-end max-md:justify-between">
                    <div className="mb-10 max-md:mb-0">
                      <div>
                        <button onClick={() => handleDeleteShogi(game.shogiId)} className="border-2 border-font-color p-2 bg-red-300">削除</button>
                      </div>
                    </div>
                    <HasPiece hasPiece={game.hasPiece}/>
                  </div>
                </div>
              ))}
            </div>
            )}
        </div>
      </main>
    </>
  )
}

export default DashBoard