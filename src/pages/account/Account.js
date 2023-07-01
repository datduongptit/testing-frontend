/* eslint-disable no-unused-vars */
import { Typography, Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import UserService from 'services/user.service';
import { setListUsers } from 'store/reducers/users';
import ListAccount from './ListAccount';

const Account = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const {
    users: { listUsers }
  } = useSelector((state) => state);

  useEffect(() => {
    try {
      const getListUsers = async () => {
        const response = await UserService.getAllUsers();
        dispatch(setListUsers({ data: response.data?.result }));
      };
      if (currentUser) {
        getListUsers();
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, currentUser]);

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
        {/* List users */}
        {listUsers && (
          <>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <ListAccount users={listUsers} />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default Account;
