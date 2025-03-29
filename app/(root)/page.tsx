import Image from "next/image";
import * as tw from '../tailwind';
import '../globals.css';
import SearchForm from "../components/SearchForm";

export default async function Home({ searchParams }: { 
  searchParams: Promise<{ query?: string }> }) {
    
    const query = (await searchParams).query;


  return (
    <>
      <section className={tw.pink_container}>
        <h1 className={tw.heading}>Showcase Your Projects, <br/> Learn From Your Peers!</h1>

        <p className={`${tw.sub_heading} !max-w-3xl`}>
        Submit projects, vote on ideas, get ready for internship season! <br/>
      </p>

        <SearchForm query= {query} />

      </section>
      
    </>
  );
}
