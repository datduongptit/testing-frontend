// third-party
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

// project import
import reducers from './reducers';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware({
    serializableCheck: false
  })
});

const { dispatch } = store;

export { store, dispatch };
