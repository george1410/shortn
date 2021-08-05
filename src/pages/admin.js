import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Button,
  Container,
  Flex,
  IconButton,
  Stack,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import CreateForm from '../components/CreateForm';
import Header from '../components/Header';
import Pagination from '../components/Pagination';
import TableRow from '../components/TableRow';
import Url from '../models/Url';

export default function Home({ urls }) {
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

        <Pagination currentPage={1} totalPages={3} />
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
