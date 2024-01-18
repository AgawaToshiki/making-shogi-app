import React, { useRef, useState } from 'react'
// import Link from 'next/link'
// import { v4 as uuidv4 } from 'uuid';
// import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
// import { auth, db } from "../../firebase";
import Header from './Header';

type Props = {
  user: {
    displayName: string;
    id: string;
  }
}

const DashBoard = ({ user }: Props) => {

  return (
    <>
      <Header user={user} />
      <main className="max-w-[1920px] pt-40">
        <h2 className="text-xl">詰将棋一覧</h2>
      </main>
    </>
  )
}

export default DashBoard