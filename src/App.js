/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { ErrorBoundary } from 'react-error-boundary';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './css/custom.css';
import { dispatch } from 'store/index';
import { setListUsers } from 'store/reducers/users';
import UserService from 'services/user.service';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

function ErrorFallback({ error, componentStack, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <pre>{componentStack}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const App = () => {
  const [explode, setExplode] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  if (!user) navigate('/login');
  const getListUsers = async () => {
    try {
      const response = await UserService.getAllUsers();
      dispatch(setListUsers({ data: response.data?.result }));
    } catch (error) {
      console.log('error');
    }
  };

  useEffect(() => {
    getListUsers();
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => setExplode(false)} resetKeys={[explode]}>
      <ThemeCustomization>
        <ScrollTop>
          <Routes />
        </ScrollTop>
      </ThemeCustomization>
    </ErrorBoundary>
  );
};

export default App;
