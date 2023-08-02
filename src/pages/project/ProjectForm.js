/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';

// material-ui
import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Modal, Box, Select, Chip, MenuItem } from '@mui/material';

// third party
import FileUploadIcon from '@mui/icons-material/FileUpload';
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
  const theme = useTheme();
  const role = user?.role;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
  const convertIdToUsername = (id) => users.filter((user) => user.id === id)[0].username;

  const editFormProject = {
    name: project?.name,
    manager: project?.manager,
    customer: project?.customer
  };

  const initialValues =
    type === 'create'
      ? {
          name: '',
          manager: '',
          customer: ''
          // userReport: ''
        }
      : editFormProject;

  const [files, setFiles] = useState({ plan: null, require: null });
  const handleChangeFiles = (type, file) => {
    setFiles({ ...files, [type]: file });
  };

  const handleCreateProject = async (data) => {
    try {
      const dataUpdate = { ...data, projectId: project.projectId };
      const res = type === 'create' ? await ProjectService.createProject(data) : await ProjectService.updateProjectDetail(dataUpdate);
      if (res) {
        const dataResponse = res.data.result;
        dataResponse.usersAssigned = JSON.parse(dataResponse.usersAssigned);
        if (type === 'create') {
          dispatch(updateProject({ data: dataResponse }));
        } else {
          dispatch(updateCurrentProject({ data: dataResponse }));
        }
        handleClose();
      }
    } catch (error) {
      console.log(error);
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
                // userReport: Yup.string().max(255).required('User report is required')
              })}
              onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                  values.usersAssigned = JSON.stringify(personName);
                  values.userReport = userReport;
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

                    <Grid item xs={12}>
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

                    <Grid item xs={12}>
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
                    {/* <Grid item xs={6}>
                      <UploadProjectFile files={files} handleChangeFiles={handleChangeFiles} type="plan" />
                    </Grid>
                    <Grid item xs={6}>
                      <UploadProjectFile files={files} handleChangeFiles={handleChangeFiles} type="require" />
                    </Grid> */}

                    {/* end */}
                    {errors.submit && (
                      <Grid item xs={12}>
                        <FormHelperText error>{errors.submit}</FormHelperText>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <AnimateButton>
                        <Button
                          disableElevation
                          disabled={isSubmitting}
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Create
                        </Button>
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