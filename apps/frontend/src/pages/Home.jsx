import React, { useContext } from 'react';
import FileList from '../components/list/FileList';
import { AppContext } from '../context/AppContext';

const Home = () => {
  const { sidebarEvent } = useContext(AppContext);

  return (
    <div>
      <h3>내 파일</h3>
      <FileList sidebarEvent={sidebarEvent}/>
    </div>
  );
};

export default Home;