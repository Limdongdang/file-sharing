import React from 'react';
import Header from './main/Header';
import SideBar from './main/Sidebar';
import Content from './main/Content';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
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

export default MainLayout;