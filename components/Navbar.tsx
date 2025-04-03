import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth, signOut, signIn} from '@/auth'


const Navbar = async () => {

    const session = await auth()

  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
        <nav className='flex items-center justify-between'>
            <Link href="/">
                <h1 className='font-bold text-2xl text-purple-700'>UOA ENGINEERING</h1>
            </Link>

            <div className='flex items-center gap-5 text-black text-xl'>
                {session && session ?.user ? (
                    <>
                        <Link href='/project/create'>
                            <span>Create</span>
                        </Link>

                        <form action={async () => { 
                            'use server';

                            await signOut({redirectTo: '/'})}}>

                            <button type='submit'>
                                Sign Out
                            </button> 

                        </form>

                        <Link href={`/user/${session?.id}`}>
                            <span> {session?.user?.name}</span>
                        </Link> 
                    </>
                ):(
                    <form action={async () => { 
                        'use server';

                        await signIn('github')}}>

                        <button type='submit'>
                            Login
                        </button>

                    </form>
                )}
            </div>
        </nav>
    </header>
  )
}

export default Navbar