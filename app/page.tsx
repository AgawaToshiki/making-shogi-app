'use client'
import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import DashBoard from './components/DashBoard';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, onSnapshot, query, where } from 'firebase/firestore';



export default function Home() {
  const [isSignedIn, setSignedIn] = useState<boolean>(false)
  const [user, setUser] = useState<{ displayName: string, id: string }>({ displayName: "", id: "" })

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setSignedIn(!!user)
      if(user){
        //ユーザー情報取得
        const getUser = query(collection(db, "users"), where("userId", "==", user.uid))
        onSnapshot(getUser, (querySnapshot) => {
          querySnapshot.docs.forEach((doc) => {
            const data = doc.data()
            setUser({ displayName: data.displayName, id: data.userId })
          })
        })
      }
    });
  }, [])


  return (
    <>
      { isSignedIn ? (
        <div className="max-w-[1920px] w-full">
          <DashBoard user={user} />
        </div>
      ) : (
        <Login />
      )}
    </>
  )
}