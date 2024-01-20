import React, { useEffect, useState } from 'react';
import { auth } from "../../firebase";
import Image from 'next/image';
import { onAuthStateChanged } from 'firebase/auth';
import { getUser } from '../utils/auth';


const UserInfo = () => {

  const [user, setUser] = useState<{ displayName: string, id: string }>({ displayName: "", id: "" })

  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      if(user){
        const userdata = await getUser(user.uid);
        setUser(userdata);
      }
    });
  }, [])
   
  return (
    <>
      <div>
        <Image src="/images/user.png" width={50} height={50} alt=""/>
        <div>
          {user.displayName === ""
            ? (
              <p>ゲストさん</p>
            )
            : (
              <p>{user.displayName}さん</p>
            )
          }
        </div>
      </div>
    </>
  )
}

export default UserInfo