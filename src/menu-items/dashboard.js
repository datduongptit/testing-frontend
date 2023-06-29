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
      breadcrumbs: false
    },
    {
      id: 'account',
      title: 'Account',
      type: 'item',
      url: '/account',
      icon: icons.UserOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
