import React from 'react';
import Link from "next/link";


const Header = () => {
  return (
    <>
      <div className="fixed z-20 w-full py-6 px-4 flex justify-between gap-[10px] max-md:flex-col-reverse bg-red-100 shadow-md">
        <h1>
          詰将棋メーカー
        </h1>
        <nav>
          <ul className="flex gap-8">
            <li>
              <Link href="/">詰将棋一覧</Link>
            </li>
            <li>
              <Link href="/create">詰将棋作成</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Header