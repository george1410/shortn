import { Flex, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import NoResults from './NoResults';
import Pagination from './Pagination';
import TableRow from './TableRow';

const PAGE_SIZE = 5;

const ItemsTable = ({ initialUrls, initialTotalPages }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [urls, setUrls] = useState(initialUrls);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const handleChangePage = async (newPage) => {
    setIsLoadingPage(true);
    setCurrentPage(newPage);
    const { data } = await axios.get('/api/urls', {
      params: {
        limit: PAGE_SIZE,
        offset: (newPage - 1) * PAGE_SIZE,
      },
    });
    const { urls, totalPages } = data;
    setUrls(urls);
    setTotalPages(totalPages);
    setIsLoadingPage(false);
  };

  if (urls.length > 0) {
    return (
      <>
        <Table marginY={10} size='md'>
          <Thead>
            <Tr>
              <Th>Short URL</Th>
              <Th>Original URL</Th>
              <Th>Clicks</Th>
            </Tr>
          </Thead>
          <Tbody>
            {urls.map((url) => (
              <TableRow loading={isLoadingPage} key={url.shortUrl} url={url} />
            ))}
          </Tbody>
        </Table>

        <Flex justify='center'>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChangePage={handleChangePage}
          />
        </Flex>
      </>
    );
  }

  return <NoResults />;
};

export default ItemsTable;
