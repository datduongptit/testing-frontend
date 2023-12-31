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

const FormExcute = ({ type, fileId, func, reportFiles, listFuntion }) => {
  const {
    users: { listUsers: users },
    auth: { user },
    projects: { currentProject: project }
  } = useSelector((state) => state);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const initialState = {
    excuter: '',
    passed: '0',
    passedCase: [],
    failed: []
  };

  const [excute, setExcute] = useState(
    listFuntion && JSON.stringify(listFuntion) !== '[]'
      ? listFuntion
      : {
          excuter: '',
          passed: '0',
          passedCase: [],
          failed: []
        }
  );
  const addFailedCase = (type) => {
    const failedCase = [...excute[type]];
    if (type === 'failed') {
      failedCase.push({ caseName: '', devAssign: '', errorCode: '', time: '', timeDone: '' });
    } else {
      failedCase.push({ caseName: '', excuter: '', timeCreated: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss') });
    }
    setExcute({ ...excute, [type]: [...failedCase] });
  };

  const handleChangeExcute = (key, value) => {
    setExcute({ ...excute, [key]: value });
  };

  const [personName, setPersonName] = React.useState('');

  const handleChangeExcuteFailed = (index, key, value, type) => {
    const failedList = [...excute[type]];
    failedList[index][key] = value;
    failedList[index].id = fileId;
    setExcute({ ...excute, [type]: failedList });
  };
  const convertIdToUsername = (id) => users.filter((user) => user.id === id)[0].username;

  const handleUpdateFuntions = async (values) => {
    await FileService.updateFunctions(fileId, excute);
    window.location.reload();
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
              initialValues={initialState}
              validationSchema={Yup.object().shape({})}
              onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                  //   handleCreateProject(values);
                  handleUpdateFuntions(values);
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
                    {/*  */}

                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        startIcon={type === 'create' ? <AddCircleIcon /> : <EditIcon />}
                        onClick={() => addFailedCase('passedCase')}
                      >
                        Add passed case
                      </Button>
                      {excute.passedCase?.map((item, index) => (
                        <Grid container spacing={3} key={index}>
                          <Grid item xs={6}>
                            <Stack spacing={1}>
                              <InputLabel htmlFor={`manager-project-casename-${index}-passed`}>Name</InputLabel>
                              <OutlinedInput
                                id={`manager-project-casename-${index}-passed`}
                                type="text"
                                value={item.caseName}
                                onBlur={handleBlur}
                                onChange={(e) => handleChangeExcuteFailed(index, 'caseName', e.target.value, 'passedCase')}
                                placeholder="Enter name of test case"
                                fullWidth
                              />
                            </Stack>
                          </Grid>
                          <Grid item xs={6}>
                            <Stack spacing={1}>
                              <InputLabel htmlFor="usersAssigned-project">Excute user</InputLabel>
                              <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                value={item.excuter}
                                onChange={(e) => handleChangeExcuteFailed(index, 'excuter', e.target.value, 'passedCase')}
                                input={<OutlinedInput id="select-multiple-chip" label="List users" />}
                                renderValue={() => (
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    <Chip key={item.excuter} label={convertIdToUsername(item.excuter)} />
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
                        </Grid>
                      ))}
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        startIcon={type === 'create' ? <AddCircleIcon /> : <EditIcon />}
                        onClick={() => addFailedCase('failed')}
                      >
                        Add failed case
                      </Button>
                    </Grid>
                    {excute.failed?.map((item, index) => (
                      <>
                        <Grid item xs={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor={`manager-project-casename-${index}`}>Name</InputLabel>
                            <OutlinedInput
                              id={`manager-project-casename-${index}`}
                              type="text"
                              value={item.caseName}
                              onBlur={handleBlur}
                              onChange={(e) => handleChangeExcuteFailed(index, 'caseName', e.target.value)}
                              placeholder="Enter name of test case"
                              fullWidth
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="usersAssigned-project">Excuter</InputLabel>
                            <Select
                              labelId="demo-multiple-chip-label"
                              id="demo-multiple-chip"
                              value={item.excuter}
                              onChange={(e) => handleChangeExcuteFailed(index, 'excuter', e.target.value, 'failed')}
                              input={<OutlinedInput id="select-multiple-chip" label="List users" />}
                              renderValue={() => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                  <Chip key={item.excuter} label={convertIdToUsername(item.excuter)} />
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
                            <InputLabel htmlFor={`manager-project-testcase-${2}`}>Dev assign</InputLabel>
                            <OutlinedInput
                              id={`manager-project-testcase-${2}`}
                              type="text"
                              value={item.devAssign}
                              onBlur={handleBlur}
                              onChange={(e) => handleChangeExcuteFailed(index, 'devAssign', e.target.value, 'failed')}
                              placeholder="Enter number of test case"
                              fullWidth
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor={`manager-project-testcase-${2}`}>Code error</InputLabel>
                            <OutlinedInput
                              id={`manager-project-testcase-${2}`}
                              type="text"
                              value={item.errorCode}
                              onBlur={handleBlur}
                              onChange={(e) => handleChangeExcuteFailed(index, 'errorCode', e.target.value)}
                              placeholder="Enter number of test case"
                              fullWidth
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor={`manager-project-testcase-${2}`}>Time</InputLabel>
                            <OutlinedInput
                              id={`manager-project-testcase-${2}`}
                              type="date"
                              value={item.time}
                              onBlur={handleBlur}
                              onChange={(e) => handleChangeExcuteFailed(index, 'time', e.target.value)}
                              placeholder="Enter number of test case"
                              fullWidth
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor={`manager-project-testcase-${2}`}>Time done</InputLabel>
                            <OutlinedInput
                              id={`manager-project-testcase-${2}`}
                              type="date"
                              value={item.timeDone}
                              onBlur={handleBlur}
                              onChange={(e) => handleChangeExcuteFailed(index, 'timeDone', e.target.value)}
                              placeholder="Enter number of test case"
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

export default FormExcute;
