/* eslint-disable no-unused-vars */
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import { dispatch } from 'store/index';
import { clearMessage } from 'store/reducers/message';

const AlertMessage = () => {
  const {
    message: { active, message, vertical, horizontal, type }
  } = useSelector((state) => state);
  const handleClearMessage = () => {
    dispatch(clearMessage(''));
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={active}
        autoHideDuration={6000}
        onClose={handleClearMessage}
        key={vertical + horizontal}
        // message={message}
      >
        <Alert onClose={handleClearMessage} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AlertMessage;
