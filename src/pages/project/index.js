/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { dispatch } from 'store/index';
import { Grid, Typography } from '@mui/material';
import ListProjects from 'pages/account/ListProjects';
import ProjectForm from './ProjectForm';
import { setListUsers } from 'store/reducers/users';
import UserService from 'services/user.service';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Project = ({ type }) => {
  const getListUsers = async () => {
    try {
      const response = await UserService.getAllUsers();
      dispatch(setListUsers({ data: response.data?.result }));
    } catch (error) {
      console.log('error');
    }
  };

  const { user } = useSelector((state) => state.auth);
  const role = user?.role;

  useEffect(() => {
    if (role === 'admin') {
      getListUsers();
    }
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5">List projects</Typography>
          <ProjectForm type="create" />
        </div>
      </Grid>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <ListProjects type={type} />
      </Grid>
    </Grid>
  );
};

Project.propTypes = {
  userId: PropTypes.string
};

export default Project;
