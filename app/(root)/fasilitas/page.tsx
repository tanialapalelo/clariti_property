import FacilityLayout from "@/components/layout/FacilityLayout";
import { FacilityData, FacilitySection, WordPressFacilitySection } from "@/lib/shared.types";
import { fetchImageData } from "@/lib/wordpress";

export const metadata = {
  title: 'Fasilitas - Clariti',
  description: 'Halaman Fasilitas Clariti',
}

async function fetchFacilitySection(): Promise<FacilitySection[]> {
  const res = await fetch(`${process.env.WORDPRESS_URL}/facility_section?_embed`);
  if (!res.ok) {
    throw new Error(`Failed to fetch facility sections: ${res.status} ${res.statusText}`);
  }
  const data: WordPressFacilitySection[] = await res.json();

  return await Promise.all(
    data.map(async (section) => {
      const featureImage = section.acf.feature_image ? await fetchImageData(section.acf.feature_image) : null;
      const detailImage = section.acf.detail_image ? await fetchImageData(section.acf.detail_image) : null;

      return {
        id: section.id,
        title: section.acf.title,
        description: section.acf.description,
        featureImage,
        detailImage,
        bookUrl: section.acf.book_url || "",
      };
    })
  );
}

async function fetchFasilitasData(): Promise<FacilityData> {
  const res = await fetch(
    `${process.env.WORDPRESS_URL}/pages?slug=facility&_embed`,
    {
      next: { revalidate: 10 },
    }
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch facility data: ${res.status} ${res.statusText}`
    );
  }

  const data = await res.json();

  if (!data || data.length === 0) {
    throw new Error("Facility not found");
  }

  if (!data || data.length === 0) {
    throw new Error("Facility not found");
  }

  const facility = data[0]?.acf;

  if (!facility) {
    throw new Error("Facility ACF data is missing");
  }

  if (facility) {
    
    return {
      mainTitle: facility.main_title || "",
    };
  }

  // If project data is missing, throw an error or return default values
  throw new Error("Invalid project data");
}


const Fasilitas = async () => {
  
  const [facilityData, facilitySections] = await Promise.all([
    fetchFasilitasData(),
    fetchFacilitySection(),
  ]);

  return (
    <>
      <FacilityLayout facilityData={facilityData} facilitySections={facilitySections} />
    </>

  );
};

export default Fasilitas;
