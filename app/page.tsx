'use client'
import React, { useEffect, useState } from 'react';
import DashBoard from './components/DashBoard';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import ProtectRoute from './components/ProtectRoute';
import Login from './components/Login';



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
          <ProtectRoute>
            <DashBoard />
          </ProtectRoute>
        </div>
      ) : (
        <Login />
      )}
    </>
  )
}