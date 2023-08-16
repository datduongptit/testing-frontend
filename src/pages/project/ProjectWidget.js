/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import moment from 'moment';
import { Grid, Typography, Breadcrumbs, Chip } from '@mui/material';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

const ProjectWidget = ({ files, project }) => {
  const testcaseFiles = files?.filter((item) => item.fileType === 'TEST_CASE');
  let totalPassed = 0;
  let totalFailed = 0;
  let totalUntested = 0;
  let totalBug = 0;
  let testcase = 0;

  testcaseFiles.forEach((item) => {
    const functions = JSON.parse(item.functions);
    functions.forEach((func) => {
      totalPassed += parseInt(func.casePassed) || 0;
      totalFailed += parseInt(func.caseFailed) || 0;
      totalUntested += parseInt(func.caseUntested) || 0;
      totalBug += parseInt(func.totalBug) || 0;
      testcase += parseInt(func.testcase) || 0;
    });
  });
  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h5">Dashboard</Typography>
        </Grid> */}
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <AnalyticEcommerce title="Start project" count={moment(project?.startedAt).format('YYYY-MM-DD')} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <AnalyticEcommerce title="End project" count={moment(project?.endAt).format('YYYY-MM-DD')} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <AnalyticEcommerce title="Total tester" count={project?.usersAssigned?.length} isButtonView={true} link="testers" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Total test case" count={testcase} isButtonView={true} link="files" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Total case passed" count={totalPassed} isButtonView={true} link="files" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Total failed" count={totalFailed} isButtonView={true} link="files" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Total bug" count={totalBug} isButtonView={true} link="files" />
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectWidget;
