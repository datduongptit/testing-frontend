// assets
import { LogoutOutlined } from '@ant-design/icons';

// icons
const icons = {
  LogoutOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const logout = {
  id: 'group-account',
  title: 'Account',
  type: 'group',
  children: [
    {
      id: 'logout',
      title: 'Logout',
      type: 'item',
      url: '/logout',
      icon: icons.LogoutOutlined,
      breadcrumbs: false
    }
  ]
};

export default logout;
