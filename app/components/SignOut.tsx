import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from "../../firebase";



const SignOut = () => {

  const signOutUser = async() => {
    const user = auth.currentUser
    if(user){
      await signOut(auth)
      .then(() => {
        window.location.href = "/"
        console.log("logout success")
      })
      .catch((error) => {
        alert('サインアウトが正常にできませんでした（' + error.message + '）')
      });
    }
  }

  
  return (
    <button onClick={ signOutUser } className="border-2 border-font-color p-6">ログアウト</button>
  )
}

export default SignOut