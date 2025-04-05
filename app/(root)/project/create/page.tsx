import React from 'react'
import * as tw from '../../../tailwind';
import ProjectForm from '@/components/ProjectForm';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

const page = async () => {
    const session = await auth();

    if(!session) redirect('/')

  return (
    <>
    <section className={`${tw.pink_container} !min-h-[230px]`}>
        <h1 className={tw.heading}>Showcase Your Project!</h1>
    </section>

    <ProjectForm/>


    
    </>
  )
}

export default page