import React from 'react';
import { auth } from "../../firebase";
import Image from 'next/image';


const UserInfo = () => {
  const user = {
    id: auth.currentUser?.uid,
    displayName: auth.currentUser?.displayName
  }
  
  return (
    <>
      <div>
        <Image src="/images/user.png" width={50} height={50} alt=""/>
        <p>{user.displayName}</p>
      </div>
    </>
  )
}

export default UserInfo