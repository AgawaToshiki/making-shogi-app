import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { setUserInfo } from "../utils/auth"

const Login = () => {
  const [isEmail, setEmail] = useState<string>("")
  const [isPassword, setPassword] = useState<string>("")

  const signUp = async() => {
    try {
      if(isPassword.length > 5) {
          await createUserWithEmailAndPassword(auth, isEmail, isPassword)
            .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
              setUserInfo(user.uid);
            }).catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              alert(errorCode + ":" + errorMessage)
          });
      } else {
        alert("パスワードは6文字以上で必須です")
      }
    }catch (error){
      console.log(error);
    }
  }

  const signIn = async() => {
    try {
      if(isPassword.length > 5) {
          await signInWithEmailAndPassword(auth, isEmail, isPassword)
            .then(() => {
              // Signed in 
            }).catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              alert(errorCode + ":" + errorMessage)
          });
      } else {
        alert("パスワードは6文字以上で必須です")
      }
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center items-center max-w-[1920px] min-h-screen">
      <div>
        <h1 className="flex justify-center mb-10 text-xl max-lg:text-lg max-md:text-base max-sm:text-sm">詰将棋メーカー</h1>
        <div className="flex flex-col justify-center gap-[10px]">
          <div className="flex w-full gap-[1px] max-sm:flex-col">
            <input 
              type="text" 
              value={ isEmail } 
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)} 
              placeholder="Email" 
              className="w-[50%] border-2 border-font-color p-2 max-sm:w-[100%]"
            />
            <input 
              type="text" 
              value={ isPassword } 
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setPassword(e.target.value)} 
              placeholder="パスワード(6文字以上)" 
              className="w-[50%] border-2 border-font-color p-2 max-sm:w-[100%]"
            />
          </div>
          <div className="flex w-full gap-[1px]">
            <button type="submit" onClick={ signIn } className="w-[50%] border-2 border-font-color p-2">ログイン</button>
            <button type="submit" onClick={ signUp } className="w-[50%] border-2 border-font-color p-2">登録</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login