import React from 'react'
import * as tw from '@/app/tailwind';
import Ping from '@/components/Ping';
import { client } from '@/sanity/lib/client';
import { PROJECT_VIEWS_QUERY } from '@/sanity/lib/queries';
import { writeClient } from '@/sanity/lib/writeClient';
import { after } from 'next/server';

const View = async ({ id }: {id: string}) => {

  after(async () => (
    await writeClient.patch(id).set({views: totalViews + 1}).commit()
  ));

  const {views: totalViews} = await client.withConfig({useCdn:
     false}).fetch(PROJECT_VIEWS_QUERY, {id});

  

  return (
    <div className={tw.view_container}>
        <div className='absolute -top-2 -right-2'>
            <Ping/>

        </div>

        <p className={tw.view_text}>
            <span className='font-black'>
              {totalViews} {totalViews === 1 ? 'View' : 'Views'}
            </span>
        </p>

    </div>
  )
}

export default View