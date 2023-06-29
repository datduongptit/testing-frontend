/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainCard from 'components/MainCard';
import { Grid, Typography, Button, Breadcrumbs, Link } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { setCurrenUserInfo } from 'store/reducers/users';
import { dispatch } from 'store/index';
import UserService from 'services/user.service';
import { useSelector } from 'react-redux';
import ProjectService from 'services/project.service';
import { setListProjects } from 'store/reducers/projects';
import ListProjects from './ListProjects';

const AccountDetail = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    users: { currentUserInfo },
    projects: { listProjects: projects }
  } = useSelector((state) => state);
  const userId = /[^/]*$/.exec(pathname)[0];

  const getAccountInfo = async () => {
    const res = await UserService.getUserInfo(userId);
    if (res) {
      dispatch(setCurrenUserInfo({ data: res.data.result }));
    }
  };

  const getListProjectByUserId = async () => {
    const res = await ProjectService.getProjectByUserId(userId);
    if (res) {
      dispatch(setListProjects({ data: res.data.result }));
    }
  };

  useEffect(() => {
    getAccountInfo();
    getListProjectByUserId();
  }, [dispatch]);

  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <div style={{ marginBottom: '1rem' }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/account">
                Account
              </Link>
              <Typography color="text.primary">Account details</Typography>
            </Breadcrumbs>
          </div>
          <Typography variant="h5">Account details</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <MainCard>
            <Typography variant="h6" gutterBottom>
              Username: {currentUserInfo?.username}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Email: {currentUserInfo?.email}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Role: {currentUserInfo?.role}
            </Typography>
          </MainCard>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="h5">Participating projects</Typography>
          <ListProjects projects={projects} />
        </Grid>
      </Grid>
    </>
  );
};

export default AccountDetail;
