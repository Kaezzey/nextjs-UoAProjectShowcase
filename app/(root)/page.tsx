import Image from "next/image";
import * as tw from '../tailwind';
import '../globals.css';
import SearchForm from "../../components/SearchForm";
import ProjectCard, { ProjectCardType } from "@/components/ProjectCard";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({ searchParams }: { 
  searchParams: Promise<{ query?: string }> }) {
    
    const query = (await searchParams).query;
    const params = { search: query || null };

    const {data:posts} = await sanityFetch({ query: PROJECTS_QUERY, params })

    console.log(JSON.stringify(posts, null, 2));

  return (
    <>
      <section className={tw.pink_container}>
        
        <h1 className={tw.heading}>Showcase Your Projects, <br/> Learn From Your Peers!</h1>

        <p className={`${tw.sub_heading} !max-w-3xl`}>
        Submit projects, vote on ideas, get ready for internship season! <br/>
      </p>

        <SearchForm query= {query} />

      </section>

      <section className={tw.section_container}>
        <p className={tw.text_30_semibold}>
          {query ? `Results for "${query}"` : "Latest Projects"}
        </p>

        <ul className={`${tw.card_grid} mt-7`}>
          {posts?.length > 0 ? (
            posts.map((post: ProjectCardType) => (
              <ProjectCard key={post?._id} post={post}/>
            
            ))
          ) : (
          
            <p className={tw.no_result}>No Projects Found</p>
          )}
          
        </ul>

      </section>

      <SanityLive/>
      
    </>
  );
}
