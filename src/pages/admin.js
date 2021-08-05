import { Container, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import CreateForm from '../components/CreateForm';
import Header from '../components/Header';
import Pagination from '../components/Pagination';
import TableRow from '../components/TableRow';
import Url from '../models/Url';

const PAGE_SIZE = 3;

export default function Home({ urls: initialUrls }) {
  const [currentPage, setCurrentPage] = useState(1);
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
    console.log(data);
    setUrls(data);
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

        <Pagination
          currentPage={currentPage}
          totalPages={3}
          onPrev={async () => await handleChangePage(currentPage - 1)}
          onNext={async () => handleChangePage(currentPage + 1)}
          onSelectPage={async (page) => await handleChangePage(page)}
        />
      </Container>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const limit = PAGE_SIZE,
    offset = 0;

  const urls = await Url.findAll({
    order: [['clicks', 'DESC']],
    limit,
    offset,
  });

  return {
    props: {
      urls: urls.map((url) => url.toJSON()),
    },
  };
};
