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

const FormReview = ({ type, fileId, func, reportFiles, listFuntion }) => {
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
    caseName: '',
    priority: 'low',
    type: 'function',
    createDate: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    timeDone: ''
  };

  const [review, setReview] = useState(listFuntion && JSON.stringify(listFuntion) !== '[]' ? listFuntion : []);
  const addFailedCase = () => {
    const failedCase = [...review];
    failedCase.push({
      caseName: '',
      priority: 'low',
      type: 'function',
      createDate: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      timeDone: ''
    });
    setReview([...failedCase]);
  };

  const handleChangeReviewCase = (index, key, value) => {
    const reviewList = [...review];
    reviewList[index][key] = value;
    reviewList[index].id = fileId;
    setReview([...reviewList]);
  };

  const handleUpdateFuntions = async () => {
    await FileService.updateFunctions(fileId, review);
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
                    {/*  */}
                    <Grid item xs={12}>
                      <Button variant="contained" startIcon={type === 'create' ? <AddCircleIcon /> : <EditIcon />} onClick={addFailedCase}>
                        Add review case
                      </Button>
                    </Grid>
                    {review?.map((item, index) => (
                      <>
                        <Grid item xs={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor={`manager-project-casename-${index}`}>Name</InputLabel>
                            <OutlinedInput
                              id={`manager-project-casename-${index}`}
                              type="text"
                              value={item.caseName}
                              onBlur={handleBlur}
                              onChange={(e) => handleChangeReviewCase(index, 'caseName', e.target.value)}
                              placeholder="Enter name of review case"
                              fullWidth
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="usersAssigned-project">Priority</InputLabel>
                            <Select
                              labelId="demo-simple-select-label-priority"
                              id="demo-simple-select-priority"
                              value={item.priority}
                              onChange={(e) => handleChangeReviewCase(index, 'priority', e.target.value)}
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
                            <InputLabel htmlFor="usersAssigned-project">Type</InputLabel>
                            <Select
                              labelId="demo-simple-select-label-priority"
                              id="demo-simple-select-priority"
                              value={item.type}
                              onChange={(e) => handleChangeReviewCase(index, 'type', e.target.value)}
                            >
                              {[
                                { label: 'Function', value: 'function' },
                                { label: 'UI', value: 'ui' }
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
                            <InputLabel htmlFor={`manager-project-testcase-${2}`}>Time done</InputLabel>
                            <OutlinedInput
                              id={`manager-project-testcase-${2}`}
                              type="date"
                              value={item.timeDone}
                              onBlur={handleBlur}
                              onChange={(e) => handleChangeReviewCase(index, 'timeDone', e.target.value)}
                              // placeholder="Enter number of test case"
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

export default FormReview;
