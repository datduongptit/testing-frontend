/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import LoadingButton from '@mui/lab/LoadingButton';
import FileService from 'services/file.service';
import { dispatch } from 'store/index';
import { uploadFile } from 'store/reducers/projects';

const UploadRemind = ({ project, type }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleFileChange = async (e) => {
    setLoading(true);
    if (e.target.files) {
      const fileUpload = e.target.files[0];
      setFiles(e.target.files[0]);
      const res = await FileService.uploadFile(fileUpload, project, type);
      if (res) {
        dispatch(uploadFile({ fileData: res?.data?.result }));
      }
      setLoading(false);
    }
  };

  return (
    <div>
      {!loading ? (
        <Button
          variant="contained"
          color="primary"
          component="label"
          startIcon={<FileUploadIcon />}
          //   onClick={() => {
          //     handleClickOpen();
          //   }}
        >
          <label htmlFor="button-upload">Upload</label>
          <input id="button-upload" type="file" hidden={true} onChange={handleFileChange} />
        </Button>
      ) : (
        <LoadingButton loading={true} variant="contained">
          Loading
        </LoadingButton>
      )}
    </div>
  );
};

UploadRemind.propTypes = {
  project: PropTypes.object,
  type: PropTypes.string
};

export default UploadRemind;
