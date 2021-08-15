import { WarningIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

const NoResults = () => {
  return (
    <Flex align='center' my={100} direction='column'>
      <WarningIcon w={10} h={10} color='gray.400' />
      <Text color='gray.500' mt={3} fontSize='xl'>
        No Records to Display
      </Text>
      <Text>Shorten a URL using the form above</Text>
    </Flex>
  );
};

export default NoResults;
