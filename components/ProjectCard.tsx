import { formatDate } from '@/lib/utils'
import * as tw from '../app/tailwind'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import {Button, buttonVariants} from '../components/ui/button'
import { Author, Project } from '@/sanity/types'

export type ProjectCardType = Omit<Project, "author"> & {author?: Author};

const ProjectCard = ({post} : {post:ProjectCardType}) => {

  return (
    <li className={`${tw.startup_card} group`}>
        <div className={tw.card_container}>
            <div className={tw.flex_between}>
                <p className={tw.startup_card_date}>
                    {formatDate(post._createdAt)}
                </p>
                <div className='flex gap-1.5'>
                    <EyeIcon className='size-6 text-[#7415b3]' /> 
                    <span className='text-[#7415b3]'> {post.views}</span>
                </div>

            </div>

                <div className={`${tw.flex_between} mt-5 gap-5`}>
                    <div className='flex-1'>
                        <Link href={`/user/${post.author?._id}`} className='inline-flex'>
                            <p className='font-semibold line-clamp-1'>{post.author?.name}</p>
                        </Link>

                        <Link href={`/project/${post._id}`}>
                            <h3 className={`${tw.text_26_semibold} ${(post.title ?? '').split(' ').length > 5 ? 'line-clamp-2' : 'line-clamp-2 min-h-[77px] flex'}`}>
                                {post.title}
                            </h3>
                        </Link>
                    </div>

                    <Link href={`/user/${post.author?._id}`}>
                        <img src='https://placehold.co/48x48' alt={post.author?.name} width={48} height={48} className='rounded-full' />
                    </Link>

                </div>

                <Link href={`/project/${post._id}`}>
                    <p className={tw.startup_card_desc}>
                        {post.description}
                    </p>
                    <img src={post.image} alt="type" className={tw.startup_card_img}/>
                </Link>

                <div className='flex justify-between items-center gap-3 mt-5'>
                    <Link href={`/?query=${post.category?.toLowerCase()}`}>
                        <p className='text-[16px] font-medium'>{post.category}</p>
                    </Link>
                    
                    <Button className={tw.startup_card_btn} asChild>
                        <Link href={`/project/${post._id}`}>
                            Details
                        </Link>

                    </Button>

                </div>
        </div>

    </li>
  )
}

export default ProjectCard