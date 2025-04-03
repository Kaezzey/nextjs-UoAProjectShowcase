import { client } from '@/sanity/lib/client';
import { PROJECT_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import * as tw from '@/app/tailwind';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';


export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const post = await client.fetch(PROJECT_BY_ID_QUERY, { id });

  if (!post) return notFound();

  const components: PortableTextComponents = {
    block: {
      h1: ({ children }) => <h1 className="text-4xl font-bold mb-4">{children}</h1>,
      h2: ({ children }) => <h2 className="text-3xl font-semibold mb-3">{children}</h2>,
      h3: ({ children }) => <h3 className="text-2xl font-semibold mb-2">{children}</h3>,
      h4: ({ children }) => <h4 className="text-xl font-medium mb-2">{children}</h4>,
      h5: ({ children }) => <h5 className="text-lg font-medium mb-1">{children}</h5>,
      h6: ({ children }) => <h6 className="text-base font-semibold text-gray-600 mb-1 uppercase tracking-wide">{children}</h6>,
      normal: ({ children }) => <p className="text-base leading-7 text-gray-800 mb-4">{children}</p>,
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
          {children}
        </blockquote>
      ),
    },
  
    list: {
      bullet: ({ children }) => <ul className="list-disc ml-6 space-y-2">{children}</ul>,
      number: ({ children }) => <ol className="list-decimal ml-6 space-y-2">{children}</ol>,
    },
  
    listItem: {
      bullet: ({ children }) => <li className="text-gray-700">{children}</li>,
      number: ({ children }) => <li className="text-gray-700">{children}</li>,
    },
  
    types: {
      image: ({ value }) => {
        if (!value?.asset) return null; // 👈 prevent crash
  
        const sizeClass = {
          small: 'w-1/4',
          medium: 'w-1/2',
          large: 'w-3/4',
          full: 'w-full',
        }[value.size as 'small' | 'medium' | 'large' | 'full' || 'full'];
  
        return (
          <img
            src={urlFor(value.asset).width(800).url()}
            alt={value.alt || 'Image'}
            className={`rounded-lg shadow my-4 mx-auto ${sizeClass}`}
          />
        )
      },
  
      code: ({ value }) => (
        <pre className="bg-gray-900 text-white text-sm p-4 rounded overflow-x-auto my-4">
          <code>{value.code}</code>
        </pre>
      ),
    },
  
    marks: {
      strong: ({ children }) => <strong className="font-bold text-black">{children}</strong>,
      em: ({ children }) => <em className="italic text-gray-600">{children}</em>,
      link: ({ value, children }) => (
        <a
          href={value?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          {children}
        </a>
      ),
    },
  };
  

  return (
    <>
      <section className={`${tw.pink_container} !min-h-[230px]`}>
        <p className={tw.tag}>{formatDate(post?._createdAt)}</p>
        <h1 className={tw.heading}> {post.title} </h1>
        <p className={`${tw.sub_heading} !max-w-5xl`}> {post.description}</p>
      </section>

      <section className={tw.section_container}>

        <div className="w-full max-w-4xl mx-auto rounded-xl">
          <img 
            src={post.image} 
            alt="project thumbnail" 
            className="w-full h-[400px] outline-6 outline-offset-10 object-cover rounded-xl"
          />
        </div>

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
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
                {post?.content?.length > 0 ? (
                  <PortableText value={post.content} components={components} />
                ) : (
                  <p className="text-gray-500 italic">No Details Provided</p>
                )}
              </div>
            </div>

            
        </div>

        <hr className={tw.divider}/>

        {/* select startups */}

        <Suspense fallback={<Skeleton className='view_skeleton'/>}> 
          <View id={id}>
            
          </View>
        </Suspense>

      </section>

    </>
  );
};

export default page;
