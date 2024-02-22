import React from 'react';
import { deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth, db } from "../../firebase";
import { deleteDoc, doc, collection, where, query, getDocs } from 'firebase/firestore';



const DeleteAccount = () => {

  const deleteAccount = async() => {
      const user = auth.currentUser

    if(user){
      const userProvidedPassword = prompt("パスワードを入力してください：");
      if(userProvidedPassword !== null) {
        const credentials = EmailAuthProvider.credential(
          user?.email ?? '',
          userProvidedPassword
        )
        try{
          await reauthenticateWithCredential(user, credentials);
          const userQuery = query(collection(db, "users"), where("userId", "==", user.uid));
          const gameQuery = query(collection(db, "games"), where("uid", "==", user.uid));
          const querySnapshot = await getDocs(userQuery);
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            await deleteDoc(userDoc.ref);
          }
          await deleteDoc((doc(db, "users", user.uid)));

          const gameQuerySnapshot = await getDocs(gameQuery);
          gameQuerySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
          })
          
          await deleteUser(user)
          window.location.href = "/"
          console.log("delete account success")
        } catch {
          alert("アカウントが削除できませんでした")
        }
      }
    }
  }

  
  return (
    <button onClick={ deleteAccount } className="border-2 border-font-color p-2 bg-red-300">アカウント削除</button>
  )
}

export default DeleteAccount