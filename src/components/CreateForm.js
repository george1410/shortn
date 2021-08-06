import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Select,
  Stack,
  Tooltip,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import validateLongUrl from '../lib/validateLongUrl';
import validateShortUrl from '../lib/validateShortUrl';

const CreateForm = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isValidShortUrl, setIsValidShortUrl] = useState(true);
  const [invalidShortUrlMessage, setInvalidShortUrlMessage] = useState(null);
  const [isValidLongUrl, setIsValidLongUrl] = useState(true);
  const [invalidLongUrlMessage, setInvalidLongUrlMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [protocol, setProtocol] = useState('https://');
  const toast = useToast();

  const handleShortUrlChange = async (value) => {
    setShortUrl(value);
    const { valid, message } = validateShortUrl(value);
    if (!valid) {
      setIsValidShortUrl(false);
      setInvalidShortUrlMessage(message);
    } else {
      try {
        await axios.get(`http://localhost:3000/api/urls/${value}`);
        setIsValidShortUrl(false);
        setInvalidShortUrlMessage('This short URL is already in use.');
      } catch (err) {
        if (err.response.status === 404) {
          setIsValidShortUrl(true);
        }
      }
    }
  };

  const handleLongUrlChange = async (value) => {
    setLongUrl(value);
    const { valid, message } = validateLongUrl(`${protocol}${value}`);
    if (!valid) {
      setIsValidLongUrl(false);
      setInvalidLongUrlMessage(message);
    } else {
      setIsValidLongUrl(true);
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
      setIsLoading(true);
      const apiResponse = await axios.post('/api/urls', {
        originalUrl: longUrl,
        shortUrl,
      });
      setIsLoading(false);
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
    <form onSubmit={handleSubmit} noValidate>
      <Stack direction={['column', 'row']} align='flex-end'>
        <FormControl>
          <FormLabel>Long URL</FormLabel>
          <InputGroup>
            <InputLeftAddon paddingX={0}>
              <Select onChange={(event) => setProtocol(event.target.value)}>
                <option value='https://'>https://</option>
                <option value='http://'>http://</option>
              </Select>
            </InputLeftAddon>
            <Input
              type='url'
              placeholder='youtube.com/watch?v=dQw4w9WgXcQ'
              value={longUrl}
              onChange={(e) => handleLongUrlChange(e.target.value)}
            />
            <InputRightElement>
              {isValidLongUrl
                ? longUrl !== '' && <CheckCircleIcon color='green' />
                : longUrl !== '' && (
                    <Tooltip label={invalidLongUrlMessage}>
                      <WarningIcon color='red' />
                    </Tooltip>
                  )}
            </InputRightElement>
          </InputGroup>
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
          isDisabled={
            !isValidShortUrl ||
            shortUrl === '' ||
            !isValidLongUrl ||
            longUrl === ''
          }
          isLoading={isLoading}
        >
          shortn
        </Button>
      </Stack>
    </form>
  );
};

export default CreateForm;
