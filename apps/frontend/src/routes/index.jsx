// index.jsx
import Login from '../layout/login/Login';
import Register from '../layout/login/Register';
import LoginLayout from '../layout/LoginLayout';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home';
import MyFiles from '../pages/MyFiles';
import SharedFiles from '../pages/SharedFiles';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'myfiles', element: <MyFiles /> },
      { path: 'sharedfiles', element: <SharedFiles /> },
    ],
  },
  {
    path: '/login',
    element: <LoginLayout />,
    children: [
      { path: '', element: <Login /> },
    ],
  },
  {
    path: '/register',
    element: <LoginLayout />,
    children: [
      { path: '', element: <Register /> },
    ],
  }
];

export default routes;