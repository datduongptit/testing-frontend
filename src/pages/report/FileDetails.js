/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Grid, Typography, Breadcrumbs, Chip, Button } from '@mui/material';
import MainCard from 'components/MainCard';
import FileService from 'services/file.service';
import { useSelector } from 'react-redux';
import matchUser from 'utils/matchUser';
import TestcaseDetails from './file-details/TestcaseDetails';
import TestReviewDetails from './file-details/TestReviewDetails';
import ExcuteDetails from './file-details/ExcuteDetails';
import BackButton from 'components/BackButton';

const FileDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const {
    users: { listUsers }
  } = useSelector((state) => state);
  const fileId = /[^/]*$/.exec(pathname)[0];
  const [file, setFile] = useState(null);
  const getLinkFile = (file) => {
    return file ? file.baseUrl + file.url : '';
  };

  useEffect(() => {
    const getFile = async () => {
      const res = await FileService.getFileById(fileId);
      if (res?.data) {
        setFile(res?.data?.result);
      }
    };
    getFile();
  }, [fileId]);
  return (
    file &&
    listUsers && (
      <>
        <BackButton />
        <Typography variant="h5">File details</Typography>
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <MainCard className="project-card-detail">
              <Typography variant="h6" gutterBottom>
                File name: <a href={getLinkFile(file)}>{file?.fileName}</a>
              </Typography>
              <Typography variant="h6" gutterBottom>
                File type: {file?.fileType}
              </Typography>
              <Typography variant="h6" gutterBottom>
                User upload: {matchUser(listUsers, file?.userUpload)}
              </Typography>
            </MainCard>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {file.fileType === 'TEST_CASE' && <TestcaseDetails file={file} />}
            {file.fileType === 'TEST_REVIEW' && <TestReviewDetails file={file} />}
            {file.fileType === 'EXCUTE_TEST' && <ExcuteDetails file={file} />}
          </Grid>
        </Grid>
      </>
    )
  );
};

export default FileDetails;
