import React from 'react';
import Image from 'next/image';
import Link from "next/link";


type Props = {
  user: {
    id: string;
  }
}

const Header = ({ user }: Props) => {
  return (
    <>
      <div className="fixed z-20 w-full py-6 px-4 flex justify-end gap-[10px] max-md:flex-col-reverse bg-red-100 shadow-md">
      </div>
    </>
  )
}

export default Header