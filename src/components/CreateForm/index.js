import { Button, Stack, useBreakpointValue, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import LongURLInput from './LongURLInput';
import ShortURLInput from './ShortURLInput';

const CreateForm = () => {
  const [longUrl, setLongUrl] = useState('');
  const [isValidLongUrl, setIsValidLongUrl] = useState(true);

  const [shortUrl, setShortUrl] = useState('');
  const [isValidShortUrl, setIsValidShortUrl] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const resetForm = () => {
    setLongUrl('');
    setShortUrl('');
    setIsValidShortUrl(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await axios.post('/api/urls', {
        originalUrl: longUrl,
        shortUrl,
      });
      setIsLoading(false);
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
        <LongURLInput
          value={longUrl}
          isValid={isValidLongUrl}
          onChange={({ value, valid }) => {
            setLongUrl(value);
            setIsValidLongUrl(valid);
          }}
        />
        <ShortURLInput
          value={shortUrl}
          isValid={isValidShortUrl}
          onChange={({ value, valid }) => {
            if (value !== undefined) {
              setShortUrl(value);
            }
            if (valid !== undefined) {
              setIsValidShortUrl(valid);
            }
          }}
        />

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
