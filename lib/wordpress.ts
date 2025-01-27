
export async function fetchImageData(imageId: number): Promise<string> {
  const res = await fetch(`${process.env.WORDPRESS_URL}/media/${imageId}`);
  console.log(`get image tania: ${process.env.WORDPRESS_URL}/media/${imageId}`);
  const data = await res.json();
  console.log("data.source_url", data.source_url)
  return data.source_url;
}

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${process.env.WORDPRESS_URL}/categories`, {
      cache: "no-store", // Avoid caching during development
    });
    if (!response.ok) throw new Error("Failed to fetch categories.");
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const fetchPostsByCategoryId = async (categoryId: number) => {
  try {
    const response = await fetch(`${process.env.WORDPRESS_URL}/posts?categories=${categoryId}&_embed`,
      { cache: "no-store" }
    );
    if (!response.ok) throw new Error("Failed to fetch posts.");
    return await response.json();
  } catch (error) {
    console.error(`Error fetching posts for category ID ${categoryId}:`, error);
    return [];
  }
};

export const findCategoryByName = async (categoryName: string) => {
  const categories = await fetchCategories();
  return categories.find(
    (cat: any) => cat.name.toLowerCase() === categoryName.toLowerCase()
  );
};
