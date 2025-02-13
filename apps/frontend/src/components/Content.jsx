import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Home from '../pages/Home';
import MyFiles from '../pages/MyFiles';

const Container = styled.div`
    margin-left: max(200px, 25%);
    padding: 8px;
    height: 100%;
    background-color: white;
`;


const Content = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  );
};

export default Content;