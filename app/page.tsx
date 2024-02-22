'use client'
import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import DashBoard from './components/DashBoard';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";



export default function Home() {
  const [isSignedIn, setSignedIn] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      setSignedIn(!!user)
    });
  }, [])


  return (
    <>
      { isSignedIn ? (
        <div className="max-w-[1920px] w-full">
          <DashBoard />
        </div>
      ) : (
        <Login />
      )}
    </>
  )
}