import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuthStatus } from '@store/slices/auth.slice';
import { useSelector } from 'react-redux';

const router = createBrowserRouter(routes);

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <RouterProvider router={router} />
  )
}

export default App
