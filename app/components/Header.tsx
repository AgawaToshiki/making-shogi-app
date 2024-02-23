import React from 'react';
import Link from "next/link";


const Header = () => {
  return (
    <>
      <div className="fixed z-20 w-full py-6 px-4 flex justify-between gap-[10px] bg-green-600 shadow-md">
        <h1>
          詰将棋メーカー
        </h1>
        <nav>
          <ul className="flex">
            <li>
              <Link href="/" scroll={false} className="p-6 max-sm:px-4 py-6 hover:bg-white transition-all ease-out duration-300">一覧</Link>
            </li>
            <li>
              <Link href="/create" scroll={false} className="p-6 max-sm:px-3 py-6 hover:bg-white transition-all ease-out duration-300">作成</Link>
            </li>
            <li>
              <Link href="/setting" scroll={false} className="p-6 max-sm:px-3 py-6 hover:bg-white transition-all ease-out duration-300">設定</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Header