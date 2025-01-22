import ProjectLayout from "@/components/ProjectLayout";
import { mockProjectData } from "@/constants";
// import { ProjectData } from "@/lib/shared.types";

// async function fetchImageData(imageId: number): Promise<string> {
//   const res = await fetch(`${process.env.WORDPRESS_URL}/media/${imageId}`);
//   const data = await res.json();
//   return data.source_url; // Return the image URL (you can extract other details if needed)
// }

// async function fetchProjectData(slug: string): Promise<ProjectData> {
//   const res = await fetch(`${process.env.WORDPRESS_URL}/project?slug=${slug}&_embed`, {
//     next: { revalidate: 3600 },
//   });

  
//   const data = await res.json();
//   const project = data[0].acf;
//   const embeddedImages = data[0]._embedded?.["acf:post"]; // Access the embedded images

//   if (project && embeddedImages) {
//      // Map through the embedded images to extract titles and image URLs
//      const floorPlan = await Promise.all(
//       embeddedImages.map(async (imageData: any) => {
//         const imageUrl = await fetchImageData(imageData.acf.image); // Fetch image based on the `acf.image` field
//         return {
//           title: imageData.acf.title, // Extract title from the embedded data
//           image: imageUrl,
//         };
//       })
//     );
//     return {
//       mainTitle: project.main_title,
//       heroTitle: project.hero.title,
//       heroDescription: project.hero.description,
//       floorPlan,
//       specifications: project.specifications
//     };
//   }
// }


const ProyekPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  console.log(params);
  // const projectPromise = fetchProjectData(params.slug);
  // const [project] = await Promise.all([projectPromise]);

  // console.log("project page", project)
  return (
    <>
    <ProjectLayout projectData={mockProjectData}/>
    </>
  );
};

export default ProyekPage;
