import ProjectLayout from "@/components/ProjectLayout";
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

export const mockProjectData = {
  mainTitle: "Luxury Apartments",
  heroTitle: "Your Dream Home Awaits",
  heroDescription:
    "Discover the epitome of modern living with our luxury apartments, featuring state-of-the-art amenities and prime locations.",
  floorPlan: [
    {
      title: "2 Bedroom Apartment",
      image: "https://via.placeholder.com/600x400?text=2+Bedroom+Floor+Plan",
    },
    {
      title: "3 Bedroom Apartment",
      image: "https://via.placeholder.com/600x400?text=3+Bedroom+Floor+Plan",
    },
  ],
  specifications: {
    title: "Specifications",
    description: "Here are the detailed specifications of the apartment:",
    pondasi: "<p>Concrete reinforced foundations</p>",
    lantai: `Ceramic tiles in living and bedroom areas\nVinyl in kitchen and bathrooms`,
    dinding: `Painted plaster walls\nMoisture-resistant in bathrooms`,
    dapur: `<p>Modern modular kitchen with granite countertops</p>`,
    pintu_jendela: `<p>Wooden doors and UPVC windows</p>`,
    kamar_mandi: `<p>Premium fittings and tiles</p>`,
    lain_lain: `Solar water heater system\nLED lighting fixtures\nCCTV security system`,
  },
};


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
