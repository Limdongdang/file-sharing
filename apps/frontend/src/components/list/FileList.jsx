import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SlOptionsVertical } from "react-icons/sl";
import DropdownMenu from '../common/DropdownMenu';
import fileService from '../../services/file.service';
import { parseISO, format } from 'date-fns';
import DropdownCircle from '../common/DropdownCircle';

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
  const [filelist, setFilelist] = useState([]);

  const handleDownload = async (file) => {
    try {
      const response = await fileService.getPresignedUrlGetObject(file.originalname);
      const url = response.data;
      
      // fetch를 이용해 파일을 blob으로 받아오기
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      // 임시 <a> 태그를 생성하여 다운로드 트리거
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', file.originalname);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error(error);
      alert('다운로드 중 오류가 발생했습니다.');
    }
  };

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
        {filelist?.map((data, index) => {
          const menuItems = [
            { label: '다운로드', onClick: () => handleDownload(data) },
            { label: '삭제', onClick: () => alert('삭제 클릭됨') },
          ]
          return (
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
                  <DropdownCircle icon={SlOptionsVertical} menuItems={menuItems}/>
                </div>
            </ListItem>
          );
        })}
    </List>
  );
};

export default FileList;