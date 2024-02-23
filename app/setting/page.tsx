"use client"
import React from 'react';
import ProtectRoute from '../components/ProtectRoute';
import DeleteAccount from '../components/DeleteAccount';
import SignOut from '../components/SignOut';
import Header from '../components/Header';

const Setting = () => {
  return (
    <ProtectRoute>
			<Header />
			<div className="flex items-center justify-center gap-8 h-screen pt-20">
				<DeleteAccount />
				<SignOut />
			</div>
    </ProtectRoute>
  )
}

export default Setting