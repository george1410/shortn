import { EditIcon } from '@chakra-ui/icons';
import {
  Container,
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import axios from 'axios';
import CreateForm from '../components/CreateForm';
import DeleteWithConfirm from '../components/DeleteWithConfirm';
import Header from '../components/Header';
import Url from '../models/Url';

export default function Home({ urls }) {
  const handleDeleteButtonClick = async (shortUrl) => {
    await axios.delete(`/api/urls/${shortUrl}`);
  };

  return (
    <Container maxWidth={1024}>
      <Header />
      <CreateForm />

      <Table mt={10} size='md'>
        <Thead>
          <Tr>
            <Th>Original URL</Th>
            <Th>Short URL</Th>
            <Th>Clicks</Th>
          </Tr>
        </Thead>
        <Tbody>
          {urls.map((url) => (
            <Tr key={url.shortUrl}>
              <Td>
                <Tooltip label={url.originalUrl}>
                  <Text display='inline-block' maxWidth={500} isTruncated>
                    {url.originalUrl}
                  </Text>
                </Tooltip>
              </Td>
              <Td>{url.shortUrl}</Td>
              <Td>{url.clicks || 0}</Td>

              <Td>
                <Flex direction='row' justify='flex-end'>
                  <IconButton icon={<EditIcon />} mr={3} />
                  <DeleteWithConfirm
                    shortUrl={url.shortUrl}
                    onConfirm={() => handleDeleteButtonClick(url.shortUrl)}
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
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
