import { db } from '../../firebase';
import { setDoc, doc, getDoc } from 'firebase/firestore';

export const setUserInfo = async(id: string, displayName: string) => {
    setDoc(doc(db, "users", id), {
        displayName: displayName,
        userId: id
      })
}

export const getUser = async(id: string): Promise<{ id: string, displayName: string}> => {
  const getUserRef = doc(db, "users", id);
  const docSnap = await getDoc(getUserRef);
  if(docSnap.exists()) {
    const userData: { id: string, displayName: string } = {
      id: docSnap.data().userId,
      displayName: docSnap.data().displayName
    }
    return userData
  }else {
    return { id: "", displayName: "" }
  }
}