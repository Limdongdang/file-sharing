import React from 'react';
import Login from './login/Login';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

// 두 컴포넌트를 가로로 나란히 배치하기 위해 Container 컴포넌트를 추가합니다.
const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const LoginLayout = () => {
  return (
    <Container>
        <Outlet />
    </Container>
  );
};

export default LoginLayout;