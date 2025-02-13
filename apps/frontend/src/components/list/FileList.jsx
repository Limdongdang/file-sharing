import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SlOptionsVertical } from "react-icons/sl";
import DropdownMenu from '../common/DropdownMenu';
import fileService from '../../services/file.service';
import { parseISO, format } from 'date-fns';

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

// 파일 MIME 타입에 따라 아이콘을 반환하는 함수
const getFileIconWithMimetype = (mimetype) => {
  if (mimetype.includes('video')) {
    return '🎥';
  } else if (mimetype.includes('image')) {
    return '📷';
  } else if (mimetype.includes('pdf')) {
    return '📃';
  } else {
    return '📄';
  }
}

// 파일 날짜를 받아와서 yyyy.mm.dd 형식으로 반환하는 함수
const FormatDate = (isoString) => {
  const date = parseISO(isoString);
  if (date.getFullYear() === new Date().getFullYear()) {
    return format(date, 'MM월 dd일');
  }
  return format(date, 'yyyy.MM.dd');
}

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
        setFilelist(filelist.data);
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
        {filelist?.map((data, index) => (
        <ListItem key={index}>
            <div style={{ flex: 4, display: 'flex'}}>
              <IconWrapper>
                {getFileIconWithMimetype(data.mimetype)}
              </IconWrapper>
              <span style={{marginLeft: '8px'}}></span>
              {data.originalname}
            </div>
            <div style={{ flex: 2 }}>{data.size}</div>
            <div style={{ flex: 2 }}>{FormatDate(data.createdAt)}</div>
            <div style={{ flex: 1 }}>
              <DropdownMenu icon={SlOptionsVertical} menuItems={menuItems} />
            </div>
        </ListItem>
        ))}
    </List>
  );
};

export default FileList;