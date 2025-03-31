import Image from "next/image";
import * as tw from '../tailwind';
import '../globals.css';
import SearchForm from "../../components/SearchForm";
import ProjectCard from "@/components/ProjectCard";

export default async function Home({ searchParams }: { 
  searchParams: Promise<{ query?: string }> }) {
    
    const query = (await searchParams).query;

    const posts = [{
      _createdAt: new Date(),
      views: 55,
      author: {_id: 1, name: 'Shinji Ikari'},
      _id: 1,
      description: 'This is a description',
      image: 'https://image.aladin.co.kr/product/50/79/cover500/2102436671_1.jpg',
      category: 'Robots',
      title: 'Evangelion',
    }
  ];

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
            posts.map((post: ProjectCardType, index: number) => (
              <ProjectCard key={post?.id} post={post}/>
            
            ))
          ) : (
          
            <p className={tw.no_result}>No Projects Found</p>
          )}
          
        </ul>

      </section>
      
    </>
  );
}
