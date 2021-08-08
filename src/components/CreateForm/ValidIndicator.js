import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import { Tooltip } from '@chakra-ui/react';
import React from 'react';

const ValidIndicator = ({ isValid, value, invalidMessage }) => {
  return isValid
    ? value !== '' && <CheckCircleIcon color='green' />
    : value !== '' && (
        <Tooltip label={invalidMessage}>
          <WarningIcon color='red' />
        </Tooltip>
      );
};

export default ValidIndicator;
