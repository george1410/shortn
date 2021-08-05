import { DeleteIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';

const ConfirmDialog = ({ shortUrl, onConfirm, onClose, isOpen, cancelRef }) => (
  <AlertDialog
    isOpen={isOpen}
    leastDestructiveRef={cancelRef}
    onClose={onClose}
  >
    <AlertDialogOverlay>
      <AlertDialogContent>
        <AlertDialogHeader>Delete Short URL</AlertDialogHeader>
        <AlertDialogBody>
          Are you sure you want to delete the {<b>{shortUrl}</b>} short URL?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme='red'
            onClick={() => {
              onConfirm();
              onClose();
            }}
            ml={3}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>
);

const DeleteWithConfirm = ({ onConfirm, shortUrl, tooltipText, isLoading }) => {
  const [confirming, setConfirming] = useState(false);
  const cancelRef = useRef();

  return (
    <Box>
      <Tooltip label={tooltipText}>
        <IconButton
          isLoading={isLoading}
          colorScheme='red'
          onClick={() => setConfirming(true)}
          icon={<DeleteIcon />}
        />
      </Tooltip>
      <ConfirmDialog
        isOpen={confirming}
        onConfirm={onConfirm}
        onClose={() => setConfirming(false)}
        shortUrl={shortUrl}
        cancelRef={cancelRef}
      />
    </Box>
  );
};

export default DeleteWithConfirm;
