import { SignIn, SignInButton, SignOutButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ThemeToggler } from './ThemeToggler'

function Header() {
 return (
    <header className='bg-light-background dark:bg-dark-background shadow-md shadow-light-secondary dark:shadow-dark-accent flex item-center justify-between'>
      <Link href="/" className='flex items-center space-x-2'>
        <div className='bg-light-primary dark:bg-dark-primary m-2 rounded-md'>
            <Image 
            src='/cloud_storage.png' 
            alt='logo' 
            className='drop-shadow-md shadow-black p-1' 
            height={50} 
            width={50} 
            />
        </div>
        <h1 className='font-bold text-xl '>File Sync</h1>
      </Link>
      <div className='flex justify-center item-center space-x-2 px-2 text-center'>
        {/* Theme toggler */}
        <SignedOut>
          <button className='bg-light-secondary p-2 m-4 rounded-md dark:bg-dark-secondary '>
            <SignInButton afterSignInUrl='/dashboard' mode="modal"/>
          </button>
        </SignedOut>

        <SignedIn>
          <Link href="/dashboard"  className='bg-light-secondary p-2 m-4 rounded-md dark:bg-dark-secondary '>
              Dashboard
          </Link>
        </SignedIn>
        <div className='items-center flex'>
        <UserButton afterSignOutUrl="/" />
        </div>


        <div className=' items-center flex'>
          <ThemeToggler/>
        </div>

      </div>
    </header>
 )
}

export default Header
