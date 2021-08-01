import { EditIcon } from '@chakra-ui/icons';
import {
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Tooltip,
  FormControl,
  FormLabel,
  Stack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import DeleteWithConfirm from '../components/DeleteWithConfirm';
import Url from '../models/Url';

export default function Home({ urls }) {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({ longUrl, shortUrl });
    const apiResponse = await axios.post('/api/urls', {
      originalUrl: longUrl,
      shortUrl,
    });

    console.log(apiResponse.data);
  };

  const handleDeleteButtonClick = async (shortUrl) => {
    await axios.delete(`/api/urls/${shortUrl}`);
  };

  return (
    <Container maxWidth={1024}>
      <Heading>shortn</Heading>
      <form onSubmit={handleSubmit}>
        <Stack direction='horizontal' align='flex-end'>
          <FormControl mr={3}>
            <FormLabel>Long URL</FormLabel>
            <Input
              type='text'
              placeholder='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
            />
          </FormControl>
          <FormControl mr={3}>
            <FormLabel>Short URL</FormLabel>
            <Input
              type='text'
              placeholder='video'
              value={shortUrl}
              onChange={(e) => setShortUrl(e.target.value)}
            />
          </FormControl>
          <Button colorScheme='blue' paddingX={8} type='submit'>
            Submit
          </Button>
        </Stack>
      </form>

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
