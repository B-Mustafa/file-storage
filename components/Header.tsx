import { SignIn, SignInButton, SignOutButton, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ThemeToggler } from './ThemeToggler'

function Header() {
  return (
    <header className='flex item-center justify-between'>
      <Link href="/" className='flex items-center space-x-2'>
        <div className='bg-[#2149ff]'>
            <Image 
            src='/cloud_storage.png' 
            alt='logo' 
            className='invert' 
            height={50} 
            width={50} 
            />
        </div>
        <h1 className='font-bold text-xl '>Cloud Storage</h1>
      </Link>
      <div className='flex justify-center item-center space-x-2 px-2'>
        {/* Theme toggler */}
        <ThemeToggler/>

        <UserButton afterSignOutUrl="/" />

        <SignedOut>
            <SignInButton afterSignInUrl='/dashboard' mode="modal" />
        </SignedOut>
      </div>
    </header>
  )
}

export default Header
