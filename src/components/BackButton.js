import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button variant="text" startIcon={<KeyboardBackspaceIcon />} onClick={() => navigate(-1)}>
        Back
      </Button>
    </>
  );
};

export default BackButton;
