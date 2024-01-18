'use client'
import React, { useEffect, useState } from 'react';
import SignOut from '../components/SignOut';
import DeleteAccount from '../components/DeleteAccount';
import UserInfo from '../components/UserInfo';
import EditInfo from '../components/EditInfo';
import { auth } from "../../firebase";



export default function MyPage() {
  // const [user, setUser] = useState<{ displayName: string, id: string }>({ displayName: "", id: "" })
  const [isEditing, setEditing] = useState<boolean>(false)
  const handleChangeView = () => {
    setEditing(!isEditing)
    console.log(isEditing)
  }
  useEffect(() => {
    if(!auth.currentUser){
      window.location.href = "/";
    }
  }, [])



  return (
    <>
      <div>mypage</div>
      {isEditing 
        ? (
          <EditInfo />
        ) 
        : (
          <UserInfo />
        )
      }
      <button onClick={ handleChangeView }>編集</button>
      <DeleteAccount />
      <SignOut />
    </>
  )
}