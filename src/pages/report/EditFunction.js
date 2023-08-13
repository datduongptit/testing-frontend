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

const UpdateFunction = ({ type, fileId, func, reportFiles }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const initialState = {
    casePassed: 0,
    caseFailed: 0,
    caseUntested: 0,
    bugRemaining: 0,
    bugReject: 0,
    totalBug: 0,
    ...func
  };

  const filteredFiles = reportFiles.find((file) => {
    const functionsArray = JSON.parse(file.functions);
    return functionsArray.some((funct) => funct.id === func.id);
  });
  const functionsList = filteredFiles?.functions ? JSON.parse(filteredFiles?.functions) : [];
  const [functions, setFunctions] = useState(func || []);

  const handleUpdateFuntions = async (values) => {
    const index = functionsList.findIndex((item) => item.name === func.name);
    if (index !== -1) {
      functionsList[index] = values; // Update the existing object
    } else {
      functionsList.push(values); // Add the new object to the array
    }
    const res = await FileService.updateFunctions(fileId, functionsList);
  };

  const formConfig = [
    { label: 'Case passed', key: 'casePassed' },
    { label: 'Case failed', key: 'caseFailed' },
    { label: 'Case Untested', key: 'caseUntested' },
    { label: 'Bug remaining', key: 'bugRemaining' },
    { label: 'Bug reject', key: 'bugReject' },
    { label: 'Total bug', key: 'totalBug' }
  ];

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
                    {formConfig.map((item, index) => (
                      <Grid item xs={6} key={index}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor={`manager-project-testcase-${item.label}`}>{item.label}</InputLabel>
                          <OutlinedInput
                            id={`manager-project-testcase-${item.label}`}
                            type="number"
                            value={values[item.key]}
                            name={item.key}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="Enter number of test case"
                            fullWidth
                          />
                        </Stack>
                      </Grid>
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

export default UpdateFunction;
