// index.jsx
import Layout from '../layout/Layout';
import Home from '../pages/Home';
import MyFiles from '../pages/MyFiles';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/myfiles', element: <MyFiles /> },
    ],
  },
];

export default routes;