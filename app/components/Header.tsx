import React, { useRef, useState } from 'react'
import SignOut from './SignOut';
import DeleteAccount from './DeleteAccount';

const Header = () => {
  return (
    <>
      <div className="flex justify-start gap-[10px] my-10 max-md:flex-col-reverse">
        <DeleteAccount />
        <SignOut />
      </div>
    </>
  )
}

export default Header