// index.jsx
import Protect from '@components/auth/Protect';
import Login from '../layout/auth/Login';
import Register from '../layout/auth/Register';
import LoginLayout from '../layout/LoginLayout';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home';
import MyFiles from '../pages/MyFiles';
import SharedFiles from '../pages/SharedFiles';

const routes = [
  {
    element: <Protect />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          { path: '', element: <Home /> },
          { path: 'myfiles', element: <MyFiles /> },
          { path: 'sharedfiles', element: <SharedFiles /> },
        ],
      },
    ]
  },
  {
    children: [
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
      },
    ]
  }
];

export default routes;