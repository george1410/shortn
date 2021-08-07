import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Button, IconButton, Stack, Text } from '@chakra-ui/react';
import {
  add,
  always,
  cond,
  equals,
  filter,
  gt,
  inc,
  lt,
  T,
  times,
  __,
} from 'ramda';
import React from 'react';

const Pagination = ({ totalPages, currentPage, onChangePage }) => {
  const getPagesToDisplay = (totalPages, currentPage) => {
    if (totalPages < 10) {
      return times(inc, totalPages);
    } else {
      const middle = filter(
        (page) => page > 0 && page < totalPages,
        times(add(currentPage - 2), 5)
      );

      const start = cond([
        [equals(1), always([])],
        [gt(__, 2), always([1, null])],
        [T, always([1])],
      ])(middle[0]);

      const end = cond([
        [equals(totalPages), always([])],
        [lt(__, totalPages - 1), always([null, totalPages])],
        [T, always([totalPages])],
      ])(middle[middle.length - 1]);

      return [...start, ...middle, ...end];
    }
  };

  return (
    <Stack direction={'row'} align='flex-end'>
      <IconButton
        isDisabled={currentPage === 1}
        icon={<ChevronLeftIcon />}
        onClick={() => {
          onChangePage(currentPage - 1);
        }}
      />

      {getPagesToDisplay(totalPages, currentPage).map((pageNumber) =>
        pageNumber ? (
          <Button
            key={pageNumber}
            colorScheme={currentPage === pageNumber ? 'blue' : 'gray'}
            onClick={() => {
              onChangePage(pageNumber);
            }}
          >
            {pageNumber}
          </Button>
        ) : (
          <Text>...</Text>
        )
      )}

      <IconButton
        isDisabled={currentPage === totalPages}
        icon={<ChevronRightIcon />}
        onClick={() => {
          onChangePage(currentPage + 1);
        }}
      />
    </Stack>
  );
};

export default Pagination;
