import { Container, Flex, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import CreateForm from '../components/CreateForm';
import Header from '../components/Header';
import Pagination from '../components/Pagination';
import TableRow from '../components/TableRow';
import Url from '../models/Url';

const PAGE_SIZE = 5;

export default function Home({
  urls: initialUrls,
  totalPages: initialTotalPages,
}) {
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

  return (
    <>
      <Header />

      <Container maxWidth={1280} mt={10}>
        <CreateForm />

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
      </Container>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const limit = PAGE_SIZE,
    offset = 0;

  const { rows: urls, count } = await Url.findAndCountAll({
    order: [['clicks', 'DESC']],
    limit,
    offset,
  });

  return {
    props: {
      urls: urls.map((url) => url.toJSON()),
      totalPages: Math.ceil(count / PAGE_SIZE),
    },
  };
};
