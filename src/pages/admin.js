import { Container, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useState } from 'react';
import CreateForm from '../components/CreateForm';
import Header from '../components/Header';
import Pagination from '../components/Pagination';
import TableRow from '../components/TableRow';
import Url from '../models/Url';

export default function Home({ urls }) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <Header />

      <Container maxWidth={1280} mt={10}>
        <CreateForm />

        <Table mt={10} size='md'>
          <Thead>
            <Tr>
              <Th>Short URL</Th>
              <Th>Original URL</Th>
              <Th>Clicks</Th>
            </Tr>
          </Thead>
          <Tbody>
            {urls.map((url) => (
              <TableRow key={url.shortUrl} url={url} />
            ))}
          </Tbody>
        </Table>

        <Pagination
          currentPage={currentPage}
          totalPages={3}
          onPrev={() => setCurrentPage(currentPage - 1)}
          onNext={() => setCurrentPage(currentPage + 1)}
          onSelectPage={(page) => setCurrentPage(page)}
        />
      </Container>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const limit = 20,
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
