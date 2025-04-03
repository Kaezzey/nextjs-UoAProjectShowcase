import React from 'react'
import * as tw from '@/app/tailwind';
import Ping from '@/components/Ping';

const View = ({ id }: {id: string}) => {
  return (
    <div className={tw.view_container}>
        <div className='absolute -top-2 -right-2'>
            <Ping/>

        </div>

        <p className={tw.view_text}>
            <span className='font-black'>100 views</span>
        </p>

    </div>
  )
}

export default View