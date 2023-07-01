/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Grid, Typography, Breadcrumbs } from '@mui/material';
import MainCard from 'components/MainCard';
import ProjectService from 'services/project.service';
import { dispatch } from 'store/index';
import { setCurrentProject } from 'store/reducers/projects';
import { useSelector } from 'react-redux';
import ListUsersAssign from './ListUsersAssign';
import UserService from 'services/user.service';
import { setListUsers } from 'store/reducers/users';

const ProjectDetails = () => {
  const { pathname } = useLocation();
  const projectId = /[^/]*$/.exec(pathname)[0];
  const {
    projects: { currentProject: project }
  } = useSelector((state) => state);
  const getProjectById = async () => {
    const res = await ProjectService.getProjectById(projectId);
    if (res) {
      dispatch(setCurrentProject({ data: res.data.result }));
    }
  };

  const getListUsers = async () => {
    const response = await UserService.getAllUsers();
    dispatch(setListUsers({ data: response.data?.result }));
  };

  useEffect(() => {
    getProjectById();
    getListUsers();
  }, []);

  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <div style={{ marginBottom: '1rem' }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link to="/project">Project</Link>
              <Typography color="text.primary">Project details</Typography>
            </Breadcrumbs>
          </div>
          <Typography variant="h5">Project details</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <MainCard>
            <Typography variant="h6" gutterBottom>
              Project name: {project?.name}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Project manager: {project?.manager}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Customer: {project?.customer}
            </Typography>
          </MainCard>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <ListUsersAssign project={project} />
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectDetails;
