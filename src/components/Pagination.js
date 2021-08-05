import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Button, IconButton, Stack } from '@chakra-ui/react';
import React from 'react';

const Pagination = ({ totalPages, currentPage }) => {
  console.log(Array(totalPages));
  return (
    <Stack direction={['row']} justify='center'>
      <IconButton icon={<ChevronLeftIcon />} />
      {Array.from(Array(totalPages).keys()).map((pageNumber) => (
        <Button
          key={pageNumber + 1}
          colorScheme={currentPage === pageNumber + 1 ? 'blue' : 'gray'}
        >
          {pageNumber + 1}
        </Button>
      ))}
      <IconButton icon={<ChevronRightIcon />} />
    </Stack>
  );
};

export default Pagination;
