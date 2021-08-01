import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';

const CreateForm = () => {
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

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction={['column', 'row']} align='flex-end'>
        <FormControl mr={[0, 3]}>
          <FormLabel>Long URL</FormLabel>
          <Input
            type='text'
            placeholder='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
        </FormControl>
        <FormControl mr={(0, 3)}>
          <FormLabel>Short URL</FormLabel>
          <Input
            type='text'
            placeholder='video'
            value={shortUrl}
            onChange={(e) => setShortUrl(e.target.value)}
          />
        </FormControl>
        <Button
          colorScheme='blue'
          paddingX={8}
          type='submit'
          isFullWidth={useBreakpointValue([true, false])}
        >
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default CreateForm;
