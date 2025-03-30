import React from 'react'
import Form from 'next/form'
import * as tw from '../app/tailwind'
import Searchformreset from './Searchformreset'
import { Search } from 'lucide-react'

const SearchForm = ({query} : {query?: string}) => {

    {return (
    <Form action={"/"} scroll={false} className={`search-form ${tw.search_form}`}>
        <input 
            name="query"
            defaultValue={query}
            placeholder="Search For Projects"
            className={tw.search_input}
        />
        <div className='flex gap-2'>
            {query && <Searchformreset />}

            <button type='submit' className={`${tw.search_btn} text-white`}>
                <Search className='size-5' />
            </button>

        </div>
    </Form>
    )
    }
}
export default SearchForm