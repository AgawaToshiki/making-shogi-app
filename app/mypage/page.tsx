'use client'
import React, { useState } from 'react';
import SignOut from '../components/SignOut';
import DeleteAccount from '../components/DeleteAccount';
import UserInfo from '../components/UserInfo';
import EditInfo from '../components/EditInfo';
import ProtectRoute from '../components/ProtectRoute';



export default function MyPage() {
  const [isEditing, setEditing] = useState<boolean>(false)
  const handleChangeView = () => {
    setEditing(!isEditing)
    console.log(isEditing)
  }


  return (
    <>
      <ProtectRoute>
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
      </ProtectRoute>
    </>
  )
}