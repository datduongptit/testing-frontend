import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ProjectService from 'services/project.service';
import { dispatch } from 'store/index';
import { Grid, Typography } from '@mui/material';
import { setListProjects } from 'store/reducers/projects';
import ListProjects from 'pages/account/ListProjects';
import { useSelector } from 'react-redux';

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

  useEffect(() => {
    getListProjectByUserId();
  }, []);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">List projects</Typography>
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
