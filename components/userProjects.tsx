import { client } from '@/sanity/lib/client'
import React from 'react'
import {STARTUPS_BY_AUTHOR_QUERY} from '@/sanity/lib/queries'
import ProjectCard, {ProjectCardType} from './ProjectCard'
import * as tw from '../app/tailwind'

const userProjects = async ({id} : {id:string}) => {

    const projects = await client.fetch(STARTUPS_BY_AUTHOR_QUERY,
        {id}
    )

  return (
    <>
    {projects.length > 0 ? (
        projects.map((project: ProjectCardType) => (
            <ProjectCard key={project._id} post={project} />
        ))
    ) : (
        <p className={tw.no_result}>No Projects Yet</p>
    )}
    </>
  )
}

export default userProjects