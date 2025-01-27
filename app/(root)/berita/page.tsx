import NewsLayout from "@/components/layout/NewsLayout";
import { findCategoryByName } from "@/lib/wordpress";

export const metadata = {
  title: 'Berita - Clariti',
  description: 'Halaman Berita Clariti',
}

const BeritaPage = () => {
  return <NewsLayout />;
};

export default BeritaPage;
