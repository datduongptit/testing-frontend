/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

// material-ui
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';

// project import
import OrdersTable from './OrdersTable';
import IncomeAreaChart from './IncomeAreaChart';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import SalesColumnChart from './SalesColumnChart';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// assets
import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ProjectService from 'services/project.service';
import { setListProjects } from 'store/reducers/projects';
import FileService from 'services/file.service';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// sales report status
const status = [
  {
    value: 'today',
    label: 'Today'
  },
  {
    value: 'month',
    label: 'This Month'
  },
  {
    value: 'year',
    label: 'This Year'
  }
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const {
    auth: { user: currentUser },
    projects: { listProjects, total }
  } = useSelector((state) => state);
  const [value, setValue] = useState('today');
  const [slot, setSlot] = useState('week');
  const [projectInfo, setProjectInfo] = useState(null);
  const dispatch = useDispatch();
  const getListProjectByUserId = async () => {
    const res = await ProjectService.getProjectByUserId(null, { page: 1, limit: 1000, search: '' });
    if (res) {
      dispatch(setListProjects({ data: res.data.result.listUsersAssigned, total: res.data.result.total }));
    }
  };

  const getCalculateData = async () => {
    const res = await FileService.getTotalBug();

    setProjectInfo(res.data?.result);
  };

  const countUserAssigned = (projects) => {
    const countedIds = [];
    // Tạo một object để lưu trữ số lần xuất hiện của từng id
    // Lặp qua mỗi dự án
    projects.forEach((project) => {
      // Lặp qua mỗi người được giao trong dự án
      project.usersAssigned.forEach((user) => {
        // Nếu id chưa được đếm, thêm vào mảng và tăng đếm
        if (!countedIds.includes(user.id)) {
          countedIds.push(user.id);
        }
      });
    });

    return countedIds.length;
  };

  useEffect(() => {
    getListProjectByUserId();
    getCalculateData();
  }, []);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    listProjects &&
    projectInfo && (
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* row 1 */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h5">Dashboard</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <AnalyticEcommerce title="Total Project" count={total} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <AnalyticEcommerce title="Total Users in all projects" count={countUserAssigned(listProjects)} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <AnalyticEcommerce title="Total Testcase" count={projectInfo?.totalTestcase} />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <AnalyticEcommerce title="Total Bugs" count={projectInfo?.totalBugs} />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <AnalyticEcommerce title="AVG Bugs per Project" count={Math.floor(projectInfo?.totalBugs / total)} />
        </Grid>

        <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

        {/* row 2 */}
        <Grid item xs={12} md={12} lg={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Income Overview</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <Box sx={{ p: 3, pb: 0 }}>
              <Stack spacing={2}>
                <Typography variant="h6" color="textSecondary">
                  This Week Statistics
                </Typography>
                <Typography variant="h3">$7,650</Typography>
              </Stack>
            </Box>
            <MonthlyBarChart projects={listProjects} />
          </MainCard>
        </Grid>
      </Grid>
    )
  );
};

export default DashboardDefault;
