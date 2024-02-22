import { db } from '../../firebase';
import { setDoc, doc } from 'firebase/firestore';

export const setUserInfo = async(id: string) => {
    setDoc(doc(db, "users", id), {
        userId: id,
    })
}