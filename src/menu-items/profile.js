// assets
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const profile = {
  id: 'group-dasboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Profile',
      type: 'item',
      url: '/profile',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'dashboard',
      title: 'Profile',
      type: 'item',
      url: '/profile',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    }
  ]
};

export default profile;
