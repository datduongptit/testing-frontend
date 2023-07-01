/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Modal, Grid, Stack, Box } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AuthWrapper from 'pages/authentication/AuthWrapper';
import FirebaseRegister from 'pages/authentication/auth-forms/AuthRegister';

const AddNewAccount = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div>
        <Button variant="contained" startIcon={<AddCircleIcon />} onClick={handleOpen}>
          Add account
        </Button>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box>
            <AuthWrapper>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                    <Typography variant="h3">Sign up</Typography>
                    <Button variant="text" onClick={handleClose}>
                      Exit
                    </Button>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <FirebaseRegister handleClose={handleClose} />
                </Grid>
              </Grid>
            </AuthWrapper>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default AddNewAccount;
