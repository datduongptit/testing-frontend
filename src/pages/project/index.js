import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ProjectService from 'services/project.service';
import { dispatch } from 'store/index';
import { Grid, Typography } from '@mui/material';
import { setListProjects } from 'store/reducers/projects';
import ListProjects from 'pages/account/ListProjects';
import { useSelector } from 'react-redux';
import ProjectForm from './ProjectForm';
import { setListUsers } from 'store/reducers/users';
import UserService from 'services/user.service';

const Project = ({ userId }) => {
  const {
    projects: { listProjects: projects }
  } = useSelector((state) => state);

  const getListProjectByUserId = async () => {
    const res = await ProjectService.getProjectByUserId(userId);
    if (res) {
      dispatch(setListProjects({ data: res.data.result }));
    }
  };

  const getListUsers = async () => {
    const response = await UserService.getAllUsers();
    dispatch(setListUsers({ data: response.data?.result }));
  };

  useEffect(() => {
    getListProjectByUserId();
    getListUsers();
  }, []);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5">List projects</Typography>
          <ProjectForm />
        </div>
      </Grid>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <ListProjects projects={projects} />
      </Grid>
    </Grid>
  );
};

Project.propTypes = {
  userId: PropTypes.string
};

export default Project;
