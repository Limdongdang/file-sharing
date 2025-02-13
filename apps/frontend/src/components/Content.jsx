import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin-left: clamp(200px, 20%, 300px);
    padding: 8px;
    height: 100%;
`;


const Content = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  );
};

export default Content;