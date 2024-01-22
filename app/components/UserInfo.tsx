import React, { useEffect, useState } from 'react';
import { auth } from "../../firebase";
import Image from 'next/image';
import { onAuthStateChanged } from 'firebase/auth';
import { getUser } from '../utils/auth';

type Props = {
  handleEdit: () => void;
};


const UserInfo = ({ handleEdit }: Props) => {

  const [user, setUser] = useState<{ displayName: string, id: string, imagePath: string }>({ displayName: "", id: "", imagePath: "" })

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
      <div className="flex items-center">
      {user.imagePath == "" 
        ? 
        (
          <Image src="/images/user.png" width={50} height={50} alt=""/>
        ) 
        : 
        (
          <Image src={user.imagePath} width={50} height={50} alt=""/>
        )
      }
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
        <button onClick={ handleEdit }>編集</button>
      </div>
    </>
  )
}

export default UserInfo