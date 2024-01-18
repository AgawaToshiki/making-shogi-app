import React from 'react';
import Image from 'next/image';
import Link from "next/link";


type Props = {
  user: {
    displayName: string;
    id: string;
  }
}

const Header = ({ user }: Props) => {
  return (
    <>
      <div className="fixed z-20 w-full py-6 px-4 flex justify-end gap-[10px] max-md:flex-col-reverse bg-red-100 shadow-md">
        <div>
          <Link href="/mypage" className="flex items-center">
            <Image src="/images/user.png" width={50} height={50} alt=""/>
            <div>
              {user.displayName === "" 
                ? (
                  <p>ゲストさん</p>
                )
                : (
                  <p>{user.displayName}さん</p>
                )
              }
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Header