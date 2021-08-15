import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Select,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import validateLongUrl from '../../lib/validateLongUrl';
import ValidIndicator from './ValidIndicator';

const LongURLInput = ({ value, isValid, onChange }) => {
  const [invalidMessage, setInvalidMessage] = useState(null);
  const [protocol, setProtocol] = useState('https://');

  const handleChange = async (value) => {
    const { valid, message } = validateLongUrl(`${protocol}${value}`);
    if (!valid) {
      setInvalidMessage(message);
      onChange({ value, valid: false });
    } else {
      onChange({ value, valid: true });
    }
  };

  return (
    <FormControl>
      <FormLabel>Long URL</FormLabel>
      <InputGroup>
        <InputLeftAddon paddingX={0}>
          <Select
            value={protocol}
            onChange={(event) => setProtocol(event.target.value)}
          >
            <option value='https://'>https://</option>
            <option value='http://'>http://</option>
          </Select>
        </InputLeftAddon>
        <Input
          type='url'
          placeholder='youtube.com/watch?v=dQw4w9WgXcQ'
          value={value}
          onChange={(e) => handleChange(e.target.value)}
        />
        <InputRightElement>
          <ValidIndicator
            value={value}
            isValid={isValid}
            invalidMessage={invalidMessage}
          />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

export default LongURLInput;
