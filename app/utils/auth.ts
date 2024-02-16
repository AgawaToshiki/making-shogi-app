import { db } from '../../firebase';
import { setDoc, doc, getDoc } from 'firebase/firestore';

export const setUserInfo = async(id: string) => {
    setDoc(doc(db, "users", id), {
        userId: id,
    })
}

export const getUser = async(id: string): Promise<{ id: string }> => {
  const getUserRef = doc(db, "users", id);
  const docSnap = await getDoc(getUserRef);
  if(docSnap.exists()) {
    const userData: { id: string } = {
      id: docSnap.data().userId,
    }
    return userData
  }else {
    return { id: "" }
  }
}