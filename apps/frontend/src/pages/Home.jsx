import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import FileList from '../components/list/FileList';
import { AppContext } from '../context/AppContext';

const Container = styled.div`
  padding: 20px;
`;

const Home = () => {
  const { sidebarEvent } = useContext(AppContext);

  useEffect(() => {
    console.log('sidebarEvent:', sidebarEvent);
  }, [sidebarEvent]);

  return (
    <Container>
      <h3>내 파일</h3>
      <FileList sidebarEvent={sidebarEvent}/>
    </Container>
  );
};

export default Home;