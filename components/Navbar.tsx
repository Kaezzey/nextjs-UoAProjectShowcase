import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth, signOut, signIn} from '@/auth'
import { BadgePlus, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'


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
                            <span className='max-sm:hidden'>Create</span>
                            <BadgePlus className='relative bottom-[1px] flex items-center justify-center size-6 sm:hidden'/>
                        </Link>

                        <form action={async () => { 
                            'use server';

                            await signOut({redirectTo: '/'})}}>

                            <button type='submit'>
                                <span className='max-sm:hidden'>Log Out</span>
                                <LogOut className='relative top-[2px] flex items-center justify-center size-6 sm:hidden text-red-600'/>
                            </button> 

                        </form>

                        <Link href={`/user/${session?.id}`}>
                            <Avatar className='size-10'>
                                <AvatarImage src={session?.user?.image} alt={session?.user?.name || ''} />
                                <AvatarFallback>AV</AvatarFallback>
                            </Avatar>
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