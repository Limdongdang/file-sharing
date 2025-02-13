// index.jsx
import Layout from '../layout/Layout';
import Home from '../pages/Home';
import MyFiles from '../pages/MyFiles';
import SharedFiles from '../pages/SharedFiles';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/myfiles', element: <MyFiles /> },
      { path: '/sharedfiles', element: <SharedFiles /> },
    ],
  },
];

export default routes;