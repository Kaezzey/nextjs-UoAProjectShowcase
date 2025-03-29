"use client"

import Link from 'next/link'
import * as tw from '../tailwind'

const Searchformreset = () => {
  const reset = () => {
    const form = document.querySelector('.search-form') as 
HTMLFormElement;
    if (form) form.reset();
}

  return (
    <button type='reset' onClick={reset}>
        <Link href= "/" className={`${tw.search_btn} text-white`}>
         X
        </Link>
    </button>
  )
}

export default Searchformreset