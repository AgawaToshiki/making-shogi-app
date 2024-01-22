import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { auth, db } from "../../firebase";
import { storage } from "../../firebase"
import { deleteObject, ref, uploadBytes } from "firebase/storage"
import { getUser, setUserInfo } from '../utils/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';



const EditInfo = () => {
  const [user, setUser] = useState<{ displayName: string, id: string, imagePath: string }>({ displayName: "", id: "", imagePath: "" })
  const [imagePath, setImagePath] = useState<string>("")
  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState<string>("")

  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      if(user){
        const userdata = await getUser(user.uid);
        setUser(userdata);
      }
    });
  }, [])

  const previewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(auth.currentUser){
      if(!e.target.files){
        setFile(null)
        setImagePath("")
        return
      }
      const file = e.target.files[0]
      setFile(file)
      const uid = auth.currentUser.uid
      const timestamp = Date.now()
      setImagePath(`images/${uid}/${timestamp}${file.name}`)
    }
  }

  const handleRegister = async() => {
    if(file){
      const storageRef = ref(storage, imagePath)
      try{
        await uploadBytes(storageRef, file)
        if(user.imagePath !== ""){
          const oldImageRef = ref(storage, user.imagePath)
          await deleteObject(oldImageRef);
        }
      }catch(error){
        console.error(error)
        alert('画像を正常に登録できませんでした')
      }
    }
    if(auth.currentUser){
      const userRef = doc(db, "users", auth.currentUser.uid)
      await updateDoc(userRef, {
        displayName: name,
        photoURL: imagePath
      })
    }
    window.location.href = "/mypage"
  }
  
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
      <input type="file" onChange={ previewImage } accept="image/*"/>
      <input type="text" value={ name } onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setName(e.target.value)} className="border" placeholder="名前"/>
      <button onClick={ handleRegister }>登録</button>
    </div>
    </>
  )
}

export default EditInfo