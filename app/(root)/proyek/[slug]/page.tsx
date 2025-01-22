import ProjectLayout from "@/components/ProjectLayout";
import { ProjectData, ProjectImage } from "@/lib/shared.types";

async function fetchImageData(imageId: number): Promise<string> {
  const res = await fetch(`${process.env.WORDPRESS_URL}/media/${imageId}`);
  const data = await res.json();
  return data.source_url; // Return the image URL (you can extract other details if needed)
}

async function fetchProjectData(slug: string): Promise<ProjectData> {
  const res = await fetch(`${process.env.WORDPRESS_URL}/project?slug=${slug}&_embed`, {
    next: { revalidate: 3600 },
  });

  
  const data = await res.json();
  
  if (!data || data.length === 0) {
    throw new Error("Project not found");
  }
  
  const project = data[0]?.acf;
  const embeddedImages = data[0]?._embedded?.["acf:post"];

  if (project && embeddedImages) {
     // Map through the embedded images to extract titles and image URLs
     const floorPlan = await Promise.all(
      embeddedImages.map(async (imageData: ProjectImage) => {
        const imageUrl = await fetchImageData(imageData.acf.image); // Fetch image based on the `acf.image` field
        return {
          title: imageData.acf.title, // Extract title from the embedded data
          image: imageUrl,
        };
      })
    );
    return {
      mainTitle: project.main_title || "",
      heroTitle: project.hero?.title || "",
      heroDescription: project.hero?.description || "",
      floorPlan,
      specifications: {
        title: project.specifications?.title || "",
        description: project.specifications?.description || "",
        pondasi: project.specifications?.pondasi || "",
        lantai: project.specifications?.lantai || "",
        dinding: project.specifications?.dinding || "",
        dapur: project.specifications?.dapur || "",
        pintu_jendela: project.specifications?.pintu_jendela || "",
        kamar_mandi: project.specifications?.kamar_mandi || "",
        lain_lain: project.specifications?.lain_lain || "",
      },
    };
  }
  
  // If project data is missing, throw an error or return default values
  throw new Error("Invalid project data");
}


const ProyekPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  
  const projectPromise = fetchProjectData(params.slug);
  const [project] = await Promise.all([projectPromise]);

  // console.log("project page", project)
  return (
    <>
    <ProjectLayout projectData={project}/>
    </>
  );
};

export default ProyekPage;
