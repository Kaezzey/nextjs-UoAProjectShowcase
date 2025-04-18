import { client } from "@/sanity/lib/client";
import { TOP_5_PROJECTS_QUERY } from "@/sanity/lib/queries";
import { ProjectCardType } from "./ProjectCard";
import ProjectCard from "./ProjectCard";

const TopProjects = async () => {
  const projects: ProjectCardType[] = await client.fetch(TOP_5_PROJECTS_QUERY);

  if (!projects || projects.length === 0) {
    return <p className="text-center text-gray-500 mt-10">No top projects found.</p>;
  }

  return (
    <section className="mt-20 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Top Viewed Projects</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project._id} post={project} />
        ))}
      </ul>
    </section>
  );
};

export default TopProjects;
