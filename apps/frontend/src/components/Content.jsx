import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin-left: max(200px, 25%);
    padding: 8px;
    height: 100%;
    background-color: red;
`;


const Content = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  );
};

export default Content;