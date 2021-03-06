import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import validateShortUrl from '../../lib/validateShortUrl';
import ValidIndicator from './ValidIndicator';

const ShortURLInput = ({ value, isValid, onChange }) => {
  const [invalidMessage, setInvalidMessage] = useState(null);
  const [isValidationLoading, setIsValidationLoading] = useState(false);

  const handleChange = async (value) => {
    const { valid, message } = validateShortUrl(value);
    onChange({ value });
    if (!valid) {
      setInvalidMessage(message);
      onChange({ valid });
    } else {
      setIsValidationLoading(true);
      try {
        await axios.get(`http://localhost:3000/api/urls/${value}`);
        setInvalidMessage('This short URL is already in use.');
        onChange({ valid: false });
      } catch (err) {
        if (err.response.status === 404) {
          onChange({ valid: true });
        }
      } finally {
        setIsValidationLoading(false);
      }
    }
  };

  return (
    <FormControl isInvalid={!isValid && value !== ''}>
      <FormLabel>Short URL</FormLabel>
      <InputGroup>
        <Input
          type='text'
          placeholder='video'
          value={value}
          onChange={async (e) => await handleChange(e.target.value)}
        />
        <InputRightElement>
          {isValidationLoading ? (
            <Spinner size='sm' />
          ) : (
            <ValidIndicator
              value={value}
              isValid={isValid}
              invalidMessage={invalidMessage}
            />
          )}
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

export default ShortURLInput;
