import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import Account from 'pages/account/Account';
import AccountDetail from 'pages/account/AccountDetail';
import Project from 'pages/project/index';
import ProjectDetails from 'pages/project/ProjectDetails';
import ListReport from 'pages/report/ListReport';
import FileDetails from 'pages/report/FileDetails';
import Histories from 'pages/histories/Histories';
import ListUsersAssign from 'pages/project/ListUsersAssign';
// import ReportDetails from 'pages/report/ReportDetails';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'icons/ant',
      element: <AntIcons />
    },
    {
      path: 'project',
      element: <Project type="project" />
    },
    {
      path: 'project/:id',
      element: <ProjectDetails />
    },
    {
      path: 'project/:id/testers',
      element: <ListUsersAssign />
    },
    {
      path: 'project/:id/files',
      element: <ListReport />
    },
    {
      path: 'account',
      element: <Account />
    },
    {
      path: 'account/:id',
      element: <AccountDetail />
    },
    {
      path: 'report',
      element: <Project type="report" />
    },
    {
      path: 'report/:id',
      element: <ProjectDetails />
    },
    {
      path: 'testing-task',
      element: <ListReport />
    },
    {
      path: 'file-details/:id',
      element: <FileDetails />
    },
    {
      path: 'history',
      element: <Histories />
    }
  ]
};

export default MainRoutes;
