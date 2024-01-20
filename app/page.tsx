'use client'
import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import DashBoard from './components/DashBoard';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from 'firebase/firestore';
import { getUser } from './utils/auth';



export default function Home() {
  const [isSignedIn, setSignedIn] = useState<boolean>(false)
  const [user, setUser] = useState<{ displayName: string, id: string }>({ displayName: "", id: "" })

  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      setSignedIn(!!user)
      if(user){
        const userdata = await getUser(user.uid);
        setUser(userdata);
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