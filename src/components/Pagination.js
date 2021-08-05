import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Button, IconButton, Stack } from '@chakra-ui/react';
import React from 'react';

const Pagination = ({
  totalPages,
  currentPage,
  onPrev,
  onNext,
  onSelectPage,
}) => {
  return (
    <Stack direction={['row']} justify='center'>
      <IconButton
        isDisabled={currentPage === 1}
        icon={<ChevronLeftIcon />}
        onClick={onPrev}
      />

      {Array.from(Array(totalPages).keys()).map((pageNumber) => (
        <Button
          key={pageNumber + 1}
          colorScheme={currentPage === pageNumber + 1 ? 'blue' : 'gray'}
          onClick={() => onSelectPage(pageNumber + 1)}
        >
          {pageNumber + 1}
        </Button>
      ))}

      <IconButton
        isDisabled={currentPage === totalPages}
        icon={<ChevronRightIcon />}
        onClick={onNext}
      />
    </Stack>
  );
};

export default Pagination;
