import { fetchProjects } from '@/lib/wordpress';
import { HeaderLayout } from './layout/HeaderLayout';

const Header = async () => {
  const projects = await fetchProjects();
  return <HeaderLayout projects={projects} />;
};

export default Header;
