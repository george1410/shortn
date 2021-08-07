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
  Skeleton,
} from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import DeleteWithConfirm from './DeleteWithConfirm';

const handleDeleteButtonClick = async (shortUrl) => {
  await axios.delete(`/api/urls/${shortUrl}`);
};

const TableRow = ({ url, loading }) => {
  const { onCopy } = useClipboard(`https://localhost:3000/${url.shortUrl}`);
  const toast = useToast();

  return (
    <Tr key={url.shortUrl}>
      <Td width='20%'>
        <Skeleton isLoaded={!loading}>{url.shortUrl}</Skeleton>
      </Td>
      <Td width='50%'>
        <Skeleton isLoaded={!loading}>
          <Tooltip label={url.originalUrl}>
            <Text display='inline-block' maxWidth={500} isTruncated>
              {url.originalUrl}
            </Text>
          </Tooltip>
        </Skeleton>
      </Td>
      <Td width='10%'>
        <Skeleton isLoaded={!loading}>{url.clicks || 0}</Skeleton>
      </Td>

      <Td width='20%'>
        <Flex direction='row' justify='flex-end'>
          <Tooltip label='Copy short URL to clipboard'>
            <IconButton
              isLoading={loading}
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
            <IconButton isLoading={loading} icon={<EditIcon />} mr={3} />
          </Tooltip>
          <DeleteWithConfirm
            shortUrl={url.shortUrl}
            onConfirm={() => handleDeleteButtonClick(url.shortUrl)}
            tooltipText='Delete short URL'
            isLoading={loading}
          />
        </Flex>
      </Td>
    </Tr>
  );
};

export default TableRow;
