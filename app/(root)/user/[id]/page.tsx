import React, { Suspense } from 'react'
import { auth } from '@/auth'
import { client } from '@/sanity/lib/client'
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import * as tw from '../../../tailwind'
import Image from "next/image";
import UserProjects from '@/components/userProjects'
import { ProjectCardSkeleton } from '@/components/ProjectCard'

export const experimental_ppr = true;

const page = async ({params} : {params: Promise<{id:string}>}) => {
    const id = (await params).id
    const session = await auth();

    const user = await client.fetch(AUTHOR_BY_ID_QUERY, 
        { id }
    );

    if(!user) return notFound();

  return (
    <>
    <section className={tw.profile_container}>
        <div className={tw.profile_card}>
            <div className={tw.profile_title}>
                <h3 className='font-bold text-xl uppercase text-center line-clamp-1'>
                    {user.name}
                </h3>

            </div>

            <Image
            src={user.image}
            alt={user.name}
            width={220}
            height={220}
            className={tw.profile_image}
            />

            <p className='font-bold text-xl text-white mt-7 text-center'>
                @{user?.username}
            </p>
            <p className='font-bold text-l text-white mt-1 text-center text-14-normal'>
                {user?.bio}
            </p>

        </div>

        <div className='flex-1 flex flex-col gap-5 lg:-mt-5'>
            <p className='font-bold text-2xl'>
                {session?.id === id ? "Your" : "All"} Projects
            </p>

            <ul className={tw.card_grid_sm}>
                <Suspense fallback={<ProjectCardSkeleton />}>
                <UserProjects id={id}/>
                </Suspense>
                

            </ul>

        </div>


    </section>

    </>
  )
}

export default page