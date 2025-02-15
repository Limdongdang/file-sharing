import React from 'react';
import Header from '../components/Header';
import SideBar from '../components/Sidebar';
import Content from '../components/Content';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
        <Header />
        <SideBar />
        <div style={{ minWidth: '800px' }}>
          <Content>
            <Outlet />
          </Content>
        </div>
    </>
  );
};

export default Layout;