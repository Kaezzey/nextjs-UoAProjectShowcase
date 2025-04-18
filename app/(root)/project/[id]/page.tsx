import { client } from '@/sanity/lib/client';
import { PROJECT_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import * as tw from '@/app/tailwind';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import markdownit from 'markdown-it';
import TopProjects from '@/components/TopProjects';

const md = new markdownit({
  html: true,      // allow HTML
  linkify: true,   // auto-detect links
  breaks: true     // THIS enables line breaks on single \n
})

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const post = await client.fetch(PROJECT_BY_ID_QUERY, { id });

  if (!post) return notFound();

  const parsedContent = md.render(post?.tagline || '')
  

  return (
    <>
      <section className={`${tw.pink_container} !min-h-[230px]`}>
        <p className={tw.tag}>{formatDate(post?._createdAt)}</p>
        <h1 className={tw.heading}> {post.title} </h1>
        <p className={`${tw.sub_heading} !max-w-5xl`}> {post.description}</p>
      </section>

      <section className={tw.section_container}>

        <div className="w-full max-w-5xl mx-auto rounded-xl">
          <img 
            src={urlFor(post.image).url()} 
            alt="project thumbnail" 
            className="w-full h-[450px] outline-6 outline-offset-10 object-cover rounded-xl"
          />
        </div>

        <div className="space-y-5 mt-10 max-w-5xl mx-auto">
          <div className="flex-between gap-5">
            <div className="flex items-center justify-between w-full">
              <Link href={`/user/${post.author?._id}`} className="inline-flex gap-2 items-center mb-3">
                <Image
                  src={post.author.image}
                  alt="avatar"
                  width={80}
                  height={80}
                  className="rounded-full drop-shadow-lg w-20 h-20"
                />
                <div>
                  <p className="text-[20px] font-medium">{post.author.name}</p>
                  <p className="text-[16px] font-medium text-gray-400">@{post.author.username}</p>
                </div>
              </Link>
              <p className={tw.category_tag}>{post.category}</p>
            </div>
          </div>

            

            <div className="bg-purple-50 px-8 py-10 rounded-xl shadow-md border border-purple-200">
              <h3 className="text-5xl font-extrabold text-left underline decoration-purple-500 underline-offset-4 mb-8">
                -Project Details-
              </h3>
              <div className="space-y-6">
                {parsedContent ? (
                  <article className="prose prose-lg max-w-[80ch] w-full break-words
             prose-img:rounded-lg prose-img:mx-auto prose-img:my-6 prose-img:w-2xl"
                    dangerouslySetInnerHTML={ {__html: parsedContent} }
                  />
                ): (
                  <p className={tw.no_result}>No Details Provided</p>
                )}
              </div>
            </div>

            
        </div>

        <hr className={tw.divider}/>

        <Suspense fallback={<Skeleton className='view_skeleton'/>}>
          <TopProjects />
        </Suspense>

        <Suspense fallback={<Skeleton className='view_skeleton'/>}> 
          <View id={id}>
            
          </View>
        </Suspense>

      </section>

    </>
  );
};

export default page;
