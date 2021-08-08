import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Select,
  Tooltip,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import validateLongUrl from '../../lib/validateLongUrl';

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
          {isValid
            ? value !== '' && <CheckCircleIcon color='green' />
            : value !== '' && (
                <Tooltip label={invalidMessage}>
                  <WarningIcon color='red' />
                </Tooltip>
              )}
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

export default LongURLInput;
