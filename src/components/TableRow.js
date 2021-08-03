import { CopyIcon, EditIcon } from '@chakra-ui/icons';
import {
  Td,
  Tooltip,
  Tr,
  Text,
  Flex,
  IconButton,
  useClipboard,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import DeleteWithConfirm from './DeleteWithConfirm';

const handleDeleteButtonClick = async (shortUrl) => {
  await axios.delete(`/api/urls/${shortUrl}`);
};

const TableRow = ({ url }) => {
  const { onCopy } = useClipboard(`https://localhost:3000/${url.shortUrl}`);
  const toast = useToast();

  return (
    <Tr key={url.shortUrl}>
      <Td>{url.shortUrl}</Td>
      <Td>
        <Tooltip label={url.originalUrl}>
          <Text display='inline-block' maxWidth={500} isTruncated>
            {url.originalUrl}
          </Text>
        </Tooltip>
      </Td>
      <Td>{url.clicks || 0}</Td>

      <Td>
        <Flex direction='row' justify='flex-end'>
          <Tooltip label='Copy short URL to clipboard'>
            <IconButton
              icon={<CopyIcon />}
              mr={3}
              onClick={() => {
                onCopy();
                toast({
                  title: `Copied https://localhost:3000/${url.shortUrl} to clipboard`,
                  status: 'info',
                  duration: 3000,
                });
              }}
            />
          </Tooltip>
          <Tooltip label='Edit short URL destination'>
            <IconButton icon={<EditIcon />} mr={3} />
          </Tooltip>
          <DeleteWithConfirm
            shortUrl={url.shortUrl}
            onConfirm={() => handleDeleteButtonClick(url.shortUrl)}
            tooltipText='Delete short URL'
          />
        </Flex>
      </Td>
    </Tr>
  );
};

export default TableRow;
