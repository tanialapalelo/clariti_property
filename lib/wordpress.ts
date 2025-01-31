
export async function fetchImageData(imageId: number): Promise<string> {
  const res = await fetch(`${process.env.WORDPRESS_URL}/media/${imageId}`);
  
  const data = await res.json();
  
  return data.source_url;
}
