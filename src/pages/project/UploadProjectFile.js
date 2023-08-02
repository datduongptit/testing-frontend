/* eslint-disable no-unused-vars */
import React from 'react';
// material-ui
import { Button } from '@mui/material';

// third party
import FileUploadIcon from '@mui/icons-material/FileUpload';

const UploadProjectFile = ({ files, handleChangeFiles, type }) => {
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        component="label"
        startIcon={<FileUploadIcon />}
        // disabled={disabled}
        //   onClick={() => {
        //     handleClickOpen();
        //   }}
      >
        <label htmlFor={'button-upload' + type}>Upload testing plan</label>
        <input id={'button-upload' + type} type="file" hidden={true} onChange={(e) => handleChangeFiles(type, e.target.files[0])} />
      </Button>
    </div>
  );
};

export default UploadProjectFile;
