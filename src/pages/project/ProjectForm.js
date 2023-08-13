/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
// material-ui
import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Modal, Box, Select, Chip, MenuItem } from '@mui/material';

// third party
import FileUploadIcon from '@mui/icons-material/FileUpload';
import LoadingButton from '@mui/lab/LoadingButton';
import EditIcon from '@mui/icons-material/Edit';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { clearMessage } from 'store/reducers/message';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AuthWrapper from 'pages/authentication/AuthWrapper';
import ProjectService from 'services/project.service';
import { updateCurrentProject, updateProject } from 'store/reducers/projects';
import { dispatch } from 'store/index';
import UploadProjectFile from './UploadProjectFile';
import FileService from 'services/file.service';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
  };
}

const ProjectForm = ({ type }) => {
  const {
    users: { listUsers: users },
    auth: { user },
    projects: { currentProject: project }
  } = useSelector((state) => state);
  const userAssignEdit = project?.usersAssigned?.map((user) => user?.id);
  const userReportEdit = project?.userReport;
  const userReviewEdit = project?.userReview;
  const theme = useTheme();
  const role = user?.role;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const [loading, setLoading] = useState(false);

  const [personName, setPersonName] = React.useState(userAssignEdit || []);
  const handleChangeUsers = (event) => {
    const {
      target: { value }
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  const [userReport, setUserReport] = useState(userReportEdit || '');
  const [userReview, setUserReview] = useState(userReviewEdit || '');
  const convertIdToUsername = (id) => users.filter((user) => user.id === id)[0].username;

  const editFormProject = {
    name: project?.name,
    manager: project?.manager,
    customer: project?.customer,
    startedAt: moment(project?.startedAt).format('YYYY-MM-DD'),
    endAt: moment(project?.endAt).format('YYYY-MM-DD')
  };

  const [status, setStatus] = useState(project?.status || 'PLANNING');

  const initialValues =
    type === 'create'
      ? {
          name: '',
          manager: '',
          customer: '',
          startedAt: '',
          endAt: ''
          // userReport: ''
        }
      : editFormProject;

  console.log(initialValues);

  const projectFiles = project?.files?.filter((file) => file.fileType === 'PROJECT_PLAN' || file.fileType === 'PROJECT_REQUIRE');

  const [files, setFiles] = useState({ PROJECT_PLAN: null, PROJECT_REQUIRE: null });
  const handleChangeFiles = (type, file) => {
    setFiles({ ...files, [type]: file });
  };

  const resetForm = () => {
    if (type === 'create') {
      setFiles({ PROJECT_PLAN: null, PROJECT_REQUIRE: null });
      setPersonName([]);
      setUserReport('');
      setUserReview('');
    }
  };

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  const handleCreateProject = async (data) => {
    try {
      setLoading(true);
      const dataUpdate = { ...data };
      if (type !== 'create') dataUpdate.projectId = project.projectId;
      const res = type === 'create' ? await ProjectService.createProject(data) : await ProjectService.updateProjectDetail(dataUpdate);
      if (res) {
        const dataResponse = res.data.result;
        dataResponse.usersAssigned = JSON.parse(dataResponse.usersAssigned);
        if (type === 'create') {
          dispatch(updateProject({ data: dataResponse }));
        } else {
          dispatch(updateCurrentProject({ data: dataResponse }));
        }
        await handleUploadFiles(dataResponse);
        setLoading(false);
        resetForm();
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadFiles = async (projectId) => {
    const filePlan = projectFiles?.find((item) => item.fileType === 'PROJECT_PLAN');
    const fileRequire = projectFiles?.find((item) => item.fileType === 'PROJECT_REQUIRE');
    if (files.PROJECT_PLAN) {
      if (filePlan) {
        await FileService.updateFile(files.PROJECT_PLAN, filePlan.id, projectId, 'PROJECT_PLAN');
      } else {
        await FileService.uploadFile(files.PROJECT_PLAN, projectId, 'PROJECT_PLAN');
      }
    }
    if (files.PROJECT_REQUIRE) {
      if (fileRequire) {
        await FileService.updateFile(files.PROJECT_REQUIRE, fileRequire.id, projectId, 'PROJECT_REQUIRE');
      } else {
        await FileService.uploadFile(files.PROJECT_REQUIRE, projectId, 'PROJECT_REQUIRE');
      }
    }
  };

  return (
    <>
      {role === 'admin' && (
        <Button variant="contained" startIcon={type === 'create' ? <AddCircleIcon /> : <EditIcon />} onClick={handleOpen}>
          {type === 'create' ? 'Add project' : 'Edit project'}
        </Button>
      )}

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box>
          <AuthWrapper>
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object().shape({
                name: Yup.string().max(255).required('Project name is required'),
                manager: Yup.string().max(255).required('Project manager is required'),
                customer: Yup.string().max(255).required('Customer is required')
                // startedAt: Yup.date().min(Yup.ref('originalStartDate'), ({ min }) => `Date needs to be before ${formatDate(min)}!!`),
                // endAt: Yup.date().min(Yup.ref('originalEndDate'), ({ min }) => `Date needs to be before ${formatDate(min)}!!`)
                // userReport: Yup.string().max(255).required('User report is required')
              })}
              onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                  console.log(values);
                  values.usersAssigned = JSON.stringify(personName);
                  values.userReport = userReport;
                  values.userReview = userReview;
                  handleCreateProject(values);
                  setStatus({ success: false });
                  setSubmitting(false);
                } catch (err) {
                  setStatus({ success: false });
                  setErrors({ submit: err.message });
                  setSubmitting(false);
                }
              }}
              // onSubmit={handleLogin}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="name-project">Project name</InputLabel>
                        <OutlinedInput
                          id="name-project"
                          type="text"
                          value={values.name}
                          name="name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter project name"
                          fullWidth
                          error={Boolean(touched.name && errors.name)}
                        />
                        {touched.name && errors.name && (
                          <FormHelperText error id="standard-weight-helper-text-project-name">
                            {errors.name}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    {/* Project manager */}
                    <Grid item xs={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="manager-project">Project manager</InputLabel>
                        <OutlinedInput
                          id="manager-project"
                          type="text"
                          value={values.manager}
                          name="manager"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter project manager"
                          fullWidth
                          error={Boolean(touched.manager && errors.manager)}
                        />
                        {touched.manager && errors.manager && (
                          <FormHelperText error id="standard-weight-helper-text-project-manager">
                            {errors.manager}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="customer-project">Customer</InputLabel>
                        <OutlinedInput
                          id="customer-project"
                          type="text"
                          value={values.customer}
                          name="customer"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter project customer"
                          fullWidth
                          error={Boolean(touched.customer && errors.customer)}
                        />
                        {touched.customer && errors.customer && (
                          <FormHelperText error id="standard-weight-helper-text-project-customer">
                            {errors.customer}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>

                    <Grid item xs={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="status-project">Status</InputLabel>
                        <Select
                          labelId="status-project"
                          id="status-project-select"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          {['PLANNING', 'OPEN', 'CLOSE'].map((item, index) => (
                            <MenuItem key={index} value={item} style={getStyles(item, status, theme)}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.usersAssigned && errors.usersAssigned && (
                          <FormHelperText error id="standard-weight-helper-text-project-usersAssigned">
                            {errors.usersAssigned}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>

                    <Grid item xs={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="usersAssigned-project">Assign user</InputLabel>
                        <Select
                          labelId="demo-multiple-chip-label"
                          id="demo-multiple-chip"
                          multiple
                          value={personName}
                          onChange={handleChangeUsers}
                          input={<OutlinedInput id="select-multiple-chip" label="List users" />}
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) => (
                                <Chip key={value} label={convertIdToUsername(value)} />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        >
                          {users.map((user, index) => (
                            <MenuItem key={index} value={user?.id} style={getStyles(user?.username, personName, theme)}>
                              {user?.username}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.usersAssigned && errors.usersAssigned && (
                          <FormHelperText error id="standard-weight-helper-text-project-usersAssigned">
                            {errors.usersAssigned}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>

                    <Grid item xs={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="usersAssigned-project">User report</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={userReport}
                          onChange={(e) => setUserReport(e.target.value)}
                        >
                          {users.map((user, index) => (
                            <MenuItem key={index} value={user?.id} style={getStyles(user?.username, personName, theme)}>
                              {user?.username}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.usersAssigned && errors.usersAssigned && (
                          <FormHelperText error id="standard-weight-helper-text-project-usersAssigned">
                            {errors.usersAssigned}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>

                    <Grid item xs={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="usersAssigned-project">User review</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={userReview}
                          onChange={(e) => setUserReview(e.target.value)}
                        >
                          {users.map((user, index) => (
                            <MenuItem key={index} value={user?.id} style={getStyles(user?.username, personName, theme)}>
                              {user?.username}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.usersAssigned && errors.usersAssigned && (
                          <FormHelperText error id="standard-weight-helper-text-project-usersAssigned">
                            {errors.usersAssigned}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor={`startedAt`}>Time start</InputLabel>
                        <OutlinedInput
                          id={`startedAt`}
                          type="date"
                          value={values.startedAt}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter number of test case"
                          fullWidth
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor={`endAt`}>Time done</InputLabel>
                        <OutlinedInput
                          id={`endAt`}
                          type="date"
                          value={values.endAt}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter number of test case"
                          fullWidth
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <UploadProjectFile
                        files={files}
                        handleChangeFiles={handleChangeFiles}
                        type="PROJECT_PLAN"
                        projectFiles={projectFiles}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <UploadProjectFile
                        files={files}
                        handleChangeFiles={handleChangeFiles}
                        type="PROJECT_REQUIRE"
                        projectFiles={projectFiles}
                      />
                    </Grid>

                    {/* end */}
                    {errors.submit && (
                      <Grid item xs={12}>
                        <FormHelperText error>{errors.submit}</FormHelperText>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <AnimateButton>
                        <LoadingButton
                          disableElevation
                          disabled={isSubmitting}
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                          color="primary"
                          loading={loading}
                        >
                          {type === 'create' ? 'Create' : 'Update'}
                        </LoadingButton>
                      </AnimateButton>
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="outlined" fullWidth size="large" type="submit" onClick={handleClose}>
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </AuthWrapper>
        </Box>
      </Modal>
    </>
  );
};

export default ProjectForm;
