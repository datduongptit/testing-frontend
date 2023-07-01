/* eslint-disable no-unused-vars */
// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  // const { user: currentUser } = useSelector((state) => state.auth);
  // if (!currentUser) {
  //   return <Navigate to="/login" />;
  // }
  return (
    <ThemeCustomization>
      <ScrollTop>
        <Routes />
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;
