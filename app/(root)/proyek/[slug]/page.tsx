
import ProjectLayout from "@/components/layout/ProjectLayout";
import { ProjectData, ProjectImage } from "@/lib/shared.types";
import { fetchImageData } from "@/lib/wordpress";
import { Center } from "@mantine/core";

async function fetchProjectData(slug: string): Promise<ProjectData> {
  const res = await fetch(
    `${process.env.WORDPRESS_URL}/project?slug=${slug}&_embed`,
    {
      next: { revalidate: 10 },
    }
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch project data: ${res.status} ${res.statusText}`
    );
  }

  const data = await res.json();

  if (!data || data.length === 0) {
    throw new Error("Project not found");
  }

  if (!data || data.length === 0) {
    throw new Error("Project not found");
  }

  const project = data[0]?.acf;
  const embeddedImages = data[0]?._embedded?.["acf:post"] || []; 

  if (!project) {
    throw new Error("Project ACF data is missing");
  }
  if (!embeddedImages) {
    throw new Error("Embedded images are missing");
  }

  if (project && embeddedImages) {
    // Map through the embedded images to extract titles and image URLs
    const floorPlan = embeddedImages.length
      ? await Promise.all(
          embeddedImages.map(async (imageData: ProjectImage) => {
            const imageUrl = await fetchImageData(imageData.acf.image);
            return {
              title: imageData.acf.title || "Untitled",
              image: imageUrl,
            };
          })
        )
      : [];
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

const ProyekPage = async ({ params }: { params: { slug: string } }) => {
  try {
    const projectPromise = fetchProjectData(params.slug);
    const [project] = await Promise.all([projectPromise]);

    return (
      <>
        <ProjectLayout projectData={project} />
      </>
    );
  } catch (error) {
    console.error("Error fetching project data:", error);
    return <Center>Failed to load project data.</Center>;
  }
};

export default ProyekPage;
