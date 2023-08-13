/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';

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
import FileService from 'services/file.service';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300
    }
  }
};
function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
  };
}

const UploadReportModal = ({ type, fileId, listFunction }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [file, setFile] = useState();
  const theme = useTheme();
  const initialValues = {
    name: '',
    manager: '',
    customer: ''
    // userReport: ''
  };
  const [functions, setFunctions] = useState(listFunction || []);

  const addFunction = () =>
    setFunctions([...functions, { name: '', description: '', priority: 'medium', env: 'development', testcase: '' }]);
  const handleChangeFunction = (index, key, value) => {
    const updateFuntions = [...functions];
    updateFuntions[index][key] = value;
    updateFuntions[index].id = fileId;
    setFunctions(updateFuntions);
  };

  const handleUpdateFuntions = async () => {
    // const dataSubmit = [...functions]
    const res = await FileService.updateFunctions(fileId, functions);
    console.log(res);
  };

  return (
    <>
      <Button variant="contained" startIcon={type === 'create' ? <AddCircleIcon /> : <EditIcon />} onClick={handleOpen}>
        Edit
      </Button>

      <Modal
        className="modal-add-project"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <AuthWrapper>
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object().shape({
                // name: Yup.string().max(255).required('Project name is required'),
                // manager: Yup.string().max(255).required('Project manager is required'),
                // customer: Yup.string().max(255).required('Customer is required')
                // userReport: Yup.string().max(255).required('User report is required')
              })}
              onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                  //   values.usersAssigned = JSON.stringify(personName);
                  //   values.userReport = userReport;
                  //   handleCreateProject(values);
                  handleUpdateFuntions();
                  setStatus({ success: false });
                  setSubmitting(false);
                  handleClose();
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
                      <Button variant="contained" startIcon={type === 'create' ? <AddCircleIcon /> : <EditIcon />} onClick={addFunction}>
                        Add function
                      </Button>
                    </Grid>
                    {functions.map((item, index) => (
                      <>
                        <Grid item xs={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor={`manager-project-name-${index}`}>Name</InputLabel>
                            <OutlinedInput
                              id={`manager-project-name-${index}`}
                              type="text"
                              value={item.name}
                              name="manager"
                              onBlur={handleBlur}
                              onChange={(e) => handleChangeFunction(index, 'name', e.target.value)}
                              placeholder="Enter function name"
                              fullWidth
                              error={Boolean(touched.manager && errors.manager)}
                            />
                            {/* {touched.manager && errors.manager && (
                              <FormHelperText error id="standard-weight-helper-text-project-manager">
                                {errors.manager}
                              </FormHelperText>
                            )} */}
                          </Stack>
                        </Grid>
                        <Grid item xs={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor={`manager-project-testcase-${index}`}>Test case</InputLabel>
                            <OutlinedInput
                              id={`manager-project-testcase-${index}`}
                              type="number"
                              value={item.testcase}
                              name="manager"
                              onBlur={handleBlur}
                              onChange={(e) => handleChangeFunction(index, 'testcase', e.target.value)}
                              placeholder="Enter number of test case"
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
                            <InputLabel htmlFor="usersAssigned-project">Priority</InputLabel>
                            <Select
                              labelId="demo-simple-select-label-priority"
                              id="demo-simple-select-priority"
                              value={item.priority}
                              onChange={(e) => handleChangeFunction(index, 'testcase', e.target.value)}
                            >
                              {[
                                { label: 'High', value: 'hight' },
                                { label: 'Medium', value: 'medium' },
                                { label: 'Low', value: 'low' }
                              ].map((item, index) => (
                                <MenuItem key={index} value={item.value} style={getStyles(item?.label, [], theme)}>
                                  {item?.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </Stack>
                        </Grid>
                        <Grid item xs={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="usersAssigned-project">Environment</InputLabel>
                            <Select
                              labelId="demo-simple-select-label-env"
                              id="demo-simple-select-env"
                              value={item.env}
                              onChange={(e) => handleChangeFunction(index, 'env', e.target.value)}
                            >
                              {[
                                { label: 'Development', value: 'development' },
                                { label: 'Staging', value: 'staging' },
                                { label: 'Production', value: 'production' }
                              ].map((item, index) => (
                                <MenuItem key={index} value={item.value} style={getStyles(item?.label, [], theme)}>
                                  {item?.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </Stack>
                        </Grid>
                        <Grid item xs={12}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="manager-project">Description</InputLabel>
                            <OutlinedInput
                              id="manager-project"
                              type="text"
                              value={item.description}
                              name="manager"
                              onBlur={handleBlur}
                              onChange={(e) => handleChangeFunction(index, 'description', e.target.value)}
                              placeholder=""
                              fullWidth
                            />
                          </Stack>
                        </Grid>
                      </>
                    ))}

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
                          // loading={loading}
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

export default UploadReportModal;
