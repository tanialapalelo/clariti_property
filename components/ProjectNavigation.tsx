// ProjectPagination.tsx
"use client";

import { Box, Pagination, Text } from '@mantine/core';

interface ProjectPaginationProps {
  projects: any[]; // Adjust type as needed
}

const ProjectNavigation = ({ projects }: ProjectPaginationProps) => {
  const itemsPerPage = 5; // Adjust this to fit your pagination requirements
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  return (
    <Box>
      {/* Render your projects */}
      {projects.slice(0, itemsPerPage).map((project, index) => (
        <Box key={index}>
          <Text>{project.title}</Text>
          {/* Other project details */}
        </Box>
      ))}

      {/* Render pagination controls */}
      <Pagination total={totalPages} />
    </Box>
  );
};

export default ProjectNavigation;
