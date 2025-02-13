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
        <Content>
          <Outlet />
        </Content>
    </>
  );
};

export default Layout;