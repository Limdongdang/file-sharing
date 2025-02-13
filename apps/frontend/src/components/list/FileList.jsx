import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SlOptionsVertical } from "react-icons/sl";
import IconButton from '../common/IconButton';
import DropdownMenu from '../common/DropdownMenu';
import fileService from '../../services/file.service';

const List = styled.div`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListHeader = styled.div`
  display: flex;
  padding: 8px;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
`;

const ListItem = styled.div`
  display: flex;
  padding: 8px;
  border-bottom: 1px solid #ddd;
  align-items: center;
`;

const LISTHEADER = [
  {
    name: '이름',
    flex: 4
  },
  {
    name: '크기',
    flex: 2
  },
  {
    name: '업로드 날짜',
    flex: 2
  },
  {
    name: '',
    flex: 1
  }
]

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const FILEDATAEXAMEPLE = [
  {
    name: '파일1',
    type: 'video',
    size: '1MB',
    date: '2025.02.13.',
  },
  {
    name: '파일2',
    type: 'image',
    size: '2MB',
    date: '2025.02.12',
  },
  {
    name: '파일3',
    type: 'document',
    size: '3MB',
    date: '2025.02.11',
  },
]

const getFileIcon = (type) => {
  switch (type) {
    case 'video':
      return '🎥';
    case 'image':
      return '📷';
    case 'document':
      return '📄';
    default:
      return
  }
};

const FileList = () => {
  const menuItems = [
    { label: '다운로드', onClick: () => alert('다운로드 클릭됨') },
    { label: '삭제', onClick: () => alert('삭제 클릭됨') },
  ];
  const [filelist, setFilelist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const filelist = await fileService.getFiles();
        console.log(filelist);
        setFilelist(filelist);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <List>
        <ListHeader>
            {LISTHEADER.map((header, index) => (
            <div key={index} style={{ flex: header.flex }}>{header.name}</div>
            ))}
        </ListHeader>
        {FILEDATAEXAMEPLE.map((data, index) => (
        <ListItem key={index}>
            <div style={{ flex: 4, display: 'flex'}}>
              <IconWrapper>
                {getFileIcon(data.type)}
              </IconWrapper>
              <span style={{marginLeft: '8px'}}></span>
              {data.name}
            </div>
            <div style={{ flex: 2 }}>{data.size}</div>
            <div style={{ flex: 2 }}>{data.date}</div>
            <div style={{ flex: 1 }}>
              <DropdownMenu icon={SlOptionsVertical} menuItems={menuItems} />
            </div>
        </ListItem>
        ))}
    </List>
  );
};

export default FileList;