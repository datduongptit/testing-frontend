/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import moment from 'moment';
import { useLocation, Link } from 'react-router-dom';
import { Grid, Typography, Breadcrumbs, Chip } from '@mui/material';
import MainCard from 'components/MainCard';
import ProjectService from 'services/project.service';
import { dispatch } from 'store/index';
import { setCurrentProject } from 'store/reducers/projects';
import { useSelector } from 'react-redux';
import ListUsersAssign from './ListUsersAssign';
import { setListUsers } from 'store/reducers/users';
import UserService from 'services/user.service';
import PlanRemind from 'pages/report/PlanRemind';
import ListReport from 'pages/report/ListReport';
import matchUser from 'utils/matchUser';
import ProjectForm from './ProjectForm';
import ListFuntion from 'pages/report/ListFunction';

const ProjectDetails = () => {
  const { pathname } = useLocation();
  const projectId = /[^/]*$/.exec(pathname)[0];
  const type = pathname.split('/')[1];
  const {
    projects: { currentProject: project },
    users: { listUsers }
  } = useSelector((state) => state);

  const getListUsers = async () => {
    try {
      const response = await UserService.getAllUsers();
      dispatch(setListUsers({ data: response.data?.result }));
    } catch (error) {
      console.log('error');
    }
  };

  const getLinkFile = (type) => {
    const fileUpload = project?.files?.find((item) => item.fileType === type);
    return fileUpload ? fileUpload.baseUrl + fileUpload.url : '';
  };

  const getFileName = (type) => {
    const fileUpload = project?.files?.find((item) => item.fileType === type);
    return fileUpload ? fileUpload.fileName : '';
  };

  const getProjectById = async () => {
    try {
      const res = await ProjectService.getProjectById(projectId);
      if (res) {
        const projectResult = res.data.result;
        let usersAssigned = projectResult?.usersAssigned;
        usersAssigned = typeof usersAssigned === 'string' ? JSON.parse(usersAssigned) : usersAssigned;
        projectResult.usersAssigned = usersAssigned;
        dispatch(setCurrentProject({ data: projectResult }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const projectStatusConfig = [
    { type: 'PLANNING', text: 'Planning', color: 'primary' },
    { type: 'OPEN', text: 'Open', color: 'success' },
    { type: 'CLOSE', text: 'Close', color: 'warning' }
  ];

  const getProjectConfig = (type) => projectStatusConfig.find((item) => item.type === type);

  useEffect(() => {
    getListUsers();
    getProjectById();
  }, []);

  return (
    project && (
      <>
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
          <Grid item xs={12} sx={{ mb: -2.25 }}>
            <div style={{ marginBottom: '1rem' }}>
              <Breadcrumbs aria-label="breadcrumb">
                <Link to={type === 'project' ? '/project' : '/report'}>{type === 'project' ? 'Project' : 'Report'}</Link>
                <Typography color="text.primary">{type === 'project' ? 'Project' : 'Report'} details</Typography>
              </Breadcrumbs>
            </div>
            {type === 'project' && (
              <Typography variant="h5">
                Project status:{' '}
                <Chip label={getProjectConfig(project?.status)?.type} color={getProjectConfig(project?.status)?.color || 'info'} />
              </Typography>
            )}
          </Grid>
          {type === 'project' && (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <MainCard className="project-card-detail">
                <div className="project-edit">
                  <ProjectForm type="edit" />
                </div>
                <Typography variant="h6" gutterBottom>
                  Project name: {project?.name}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Project manager: {project?.manager}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Customer: {project?.customer}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  User report: {matchUser(listUsers, project.userReport)}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Project plan: <a href={getLinkFile('PROJECT_PLAN')}>{getFileName('PROJECT_PLAN')}</a>
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Project remind: <a href={getLinkFile('PROJECT_REQUIRE')}>{getFileName('PROJECT_REQUIRE')}</a>
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Start date: {project?.startedAt ? moment(project?.startedAt).format('DD-MM-YYYY') : ''}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Done date: {project?.endAt ? moment(project?.endAt).format('DD-MM-YYYY') : ''}
                </Typography>
              </MainCard>
            </Grid>
          )}

          {type === 'project' ? (
            <>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <ListUsersAssign project={project} />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <ListReport project={project} />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <PlanRemind project={project} type="REPORT" index={6} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <ListFuntion files={project?.files} />
              </Grid>
            </>
          )}
        </Grid>
      </>
    )
  );
};

export default ProjectDetails;
