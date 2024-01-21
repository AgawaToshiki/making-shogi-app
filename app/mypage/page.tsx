'use client'
import React, { useState } from 'react';
import SignOut from '../components/SignOut';
import DeleteAccount from '../components/DeleteAccount';
import UserInfo from '../components/UserInfo';
import EditInfo from '../components/EditInfo';
import ProtectRoute from '../components/ProtectRoute';



export default function MyPage() {
  const [isEditing, setEditing] = useState<boolean>(false)
  const handleEdit = () => {
    setEditing(!isEditing)
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
                <UserInfo handleEdit={ handleEdit }/>
            )
          }
          
          <DeleteAccount />
          <SignOut />
      </ProtectRoute>
    </>
  )
}