import { getDownloadURL, ref } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { setDoc, doc, getDoc } from 'firebase/firestore';

export const setUserInfo = async(id: string, displayName: string, photoURL: string) => {
    setDoc(doc(db, "users", id), {
        displayName: displayName,
        userId: id,
        photoURL: photoURL
    })
}

export const getUser = async(id: string): Promise<{ id: string, displayName: string, imagePath: string }> => {
  const getUserRef = doc(db, "users", id);
  const docSnap = await getDoc(getUserRef);
  if(docSnap.exists()) {
    const userData: { id: string, displayName: string, imagePath: string } = {
      id: docSnap.data().userId,
      displayName: docSnap.data().displayName,
      imagePath: docSnap.data().photoURL
    }
    if(userData.imagePath !== "") {
      const storageRef = ref(storage, userData.imagePath)
      userData.imagePath = await getDownloadURL(storageRef)
    }
    return userData
  }else {
    return { id: "", displayName: "", imagePath: "" }
  }
}