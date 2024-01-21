import React, { useState } from 'react';
import Image from 'next/image';
import { auth } from "../../firebase";
import { storage } from "../../firebase"
import { ref, uploadBytes } from "firebase/storage"
import { setUserInfo } from '../utils/auth';



const EditInfo = () => {
  const [imagePath, setImagePath] = useState<string>("")
  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState<string>("")

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
      }catch(error){
        console.error(error)
        alert('画像を正常に登録できませんでした')
      }
    }
    if(auth.currentUser){
      await setUserInfo(auth.currentUser.uid, name, imagePath)
    }
    window.location.href = "/mypage"
  }
  
  return (
    <>
    <div className="flex items-center">
      <input type="file" onChange={ previewImage } accept="image/*"/>
      <input type="text" value={ name } onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setName(e.target.value)} className="border" placeholder="名前"/>
      <button onClick={ handleRegister }>登録</button>
    </div>
    </>
  )
}

export default EditInfo