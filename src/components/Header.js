import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Container,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from '@chakra-ui/react';
import React from 'react';

const Header = () => {
  return (
    <Container maxWidth={1280} marginY={5}>
      <Flex>
        <Heading>shortn.</Heading>
        <Spacer />
        <Menu>
          <MenuButton>
            <Flex align='center'>
              <Avatar name='George McCarron' size='sm' mr={2} />
              <Text mr={2}>George McCarron</Text>
              <ChevronDownIcon />
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem>Log Out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Container>
  );
};

export default Header;
