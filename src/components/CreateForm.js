import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Tooltip,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';

const shortUrlRegex = /^[\w\-]+$/;

const CreateForm = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isValidShortUrl, setIsValidShortUrl] = useState(true);
  const [invalidShortUrlMessage, setInvalidShortUrlMessage] = useState(null);
  const toast = useToast();

  const handleShortUrlChange = async (value) => {
    setShortUrl(value);
    if (!shortUrlRegex.test(value)) {
      setIsValidShortUrl(false);
      setInvalidShortUrlMessage('This short URL contains invalid characters.');
    } else {
      try {
        await axios.get(`http://localhost:3000/api/urls/${value}`);
        setIsValidShortUrl(false);
        setInvalidShortUrlMessage('This short URL is already in use..');
      } catch (err) {
        if (err.response.status === 404) {
          setIsValidShortUrl(true);
        }
      }
    }
  };

  const resetForm = () => {
    setLongUrl('');
    setShortUrl('');
    setIsValidShortUrl(true);
    setInvalidShortUrlMessage(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({ longUrl, shortUrl });
    try {
      const apiResponse = await axios.post('/api/urls', {
        originalUrl: longUrl,
        shortUrl,
      });
      console.log(apiResponse.data);
      toast({
        title: 'Short URL Created Successfully',
        status: 'success',
      });
      resetForm();
    } catch (err) {
      toast({
        title: 'Something went wrong',
        description: (
          <>
            We were unable to create your short URL. Please <b>try again</b>.
          </>
        ),
        status: 'error',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction={['column', 'row']} align='flex-end'>
        <FormControl>
          <FormLabel>Long URL</FormLabel>
          <Input
            type='url'
            placeholder='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
        </FormControl>
        <FormControl isInvalid={!isValidShortUrl && shortUrl !== ''}>
          <FormLabel>Short URL</FormLabel>
          <InputGroup>
            <Input
              type='text'
              placeholder='video'
              value={shortUrl}
              onChange={async (e) => await handleShortUrlChange(e.target.value)}
            />
            <InputRightElement>
              {isValidShortUrl
                ? shortUrl !== '' && <CheckCircleIcon color='green' />
                : shortUrl !== '' && (
                    <Tooltip label={invalidShortUrlMessage}>
                      <WarningIcon color='red' />
                    </Tooltip>
                  )}
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          colorScheme='blue'
          paddingX={8}
          type='submit'
          isFullWidth={useBreakpointValue([true, false])}
          isDisabled={!isValidShortUrl || shortUrl === ''}
        >
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default CreateForm;
