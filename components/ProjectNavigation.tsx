import { Anchor, Grid, Title } from "@mantine/core";

interface Project {
  id: number;
  name: string;
  slug: string;
  type: string;
}

interface ProjectNavigationProps {
  projects: Project[];
}

const ProjectNavigation = ({ projects }: ProjectNavigationProps) => {
  // Group projects by type
  const groupedProjects = projects.reduce((acc, project) => {
    if (!acc[project.type]) {
      acc[project.type] = [];
    }
    acc[project.type].push(project);
    return acc;
  }, {} as Record<string, Project[]>);

  return (
    <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
      {Object.entries(groupedProjects).map(([type, projects]) => (
        <Grid.Col span={{ base: 12, md: 6 }} key={type}>
          <Title mx={"40px"} my={"sm"} size={"sm"} c={"#444444"}>{type}</Title>

            <ul>
            {projects.map((project) => (
              <li key={project.id} style={{listStyleType: "none"}}>
                <Anchor href={`/proyek/${project.slug}`} >{project.name}</Anchor>
                </li>
            ))}
            </ul>
          
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default ProjectNavigation;
