import { Typography, Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Account = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h5">Account</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <MainCard>
            <Typography variant="h6" gutterBottom>
              Username: {currentUser?.username}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Email: {currentUser?.email}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Role: {currentUser?.role}
            </Typography>
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default Account;
