// assets
import { DashboardOutlined, UserOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  UserOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'project',
      title: 'Project',
      type: 'item',
      url: '/project',
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
      childs: [
        {
          id: 'project',
          title: 'Project detail',
          type: 'collapse',
          url: '/project',
          icon: icons.DashboardOutlined,
          breadcrumbs: false
        }
      ]
    },
    // {
    //   id: 'account',
    //   title: 'Testing task',
    //   type: 'item',
    //   url: '/testing-task',
    //   icon: icons.UserOutlined,
    //   breadcrumbs: false
    // },
    {
      id: 'account',
      title: 'Account',
      type: 'item',
      url: '/account',
      icon: icons.UserOutlined,
      breadcrumbs: false
    },
    {
      id: 'report',
      title: 'Report',
      type: 'item',
      url: '/report',
      icon: icons.UserOutlined,
      breadcrumbs: false
    },
    {
      id: 'history',
      title: 'History',
      type: 'item',
      url: '/history',
      icon: icons.UserOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
