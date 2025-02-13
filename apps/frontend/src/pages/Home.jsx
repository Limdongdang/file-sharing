import React from 'react';
import styled from 'styled-components';
import FileList from '../components/list/FileList';

const Container = styled.div`
  padding: 20px;
`;

const Home = () => {
  return (
    <Container>
      <h3>내 파일</h3>
      <FileList />
    </Container>
  );
};

export default Home;