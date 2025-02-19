import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { FaFileAlt, FaFileUpload, FaHome, FaLink, FaShare, FaUpload } from 'react-icons/fa';
import { RiFolderUploadFill } from "react-icons/ri";
import { IoFileTrayStackedSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import DropdownMenu from '../../components/common/DropdownMenu';
import Divider from '../../components/common/Divider';
import fileService from '../../services/file.service';
import { AppContext } from '../../context/AppContext';

const Container = styled.div`
    width: 20%;
    min-width: 200px;
    max-width: 300px;
    height: 100%;
    background-color: #F4F6F9;
    z-index: 1000;
    position: fixed;
`;

const SideMenu = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    padding: 0 10px;
    margin-top: 20px;
    flex-direction: column;
    box-sizing: border-box;
`;

const Button = styled(Link)`
    width: 100%;
    height: 40px;
    border-radius: 20px;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    color: inherit;

    &:hover {
        background-color: #1657dd;
        color: white;
    }

    svg {
        margin-right: 20px;
        justify-content: center;
    }
`;


const SideBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { setSidebarEvent } = useContext(AppContext);    

    const uploadMenuItems = [
        { icon : FaFileUpload , label: '파일 업로드', onClick: () => handleUploadFile() },
        { icon: RiFolderUploadFill,label: '폴더 업로드', onClick: () => alert('폴더 업로드 클릭됨') },
        { icon: FaLink ,label: '링크 업로드', onClick: () => alert('링크 업로드 클릭됨') },
    ];

    const handleUploadFile = () => {
        try {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.onchange = async (event) => {
                const file = event.target.files[0];
                if (file) {
                    const maxSizeInBytes = 1 * 1024 * 1024 * 1024; // 1GB
                    if (file.size > maxSizeInBytes) {
                        alert('파일 사이즈가 1GB를 초과합니다.');
                        return;
                    }
                    await fileService.uploadFileAndSaveInfo(file);
                    setIsDropdownOpen(false);
                    setSidebarEvent('fileUploaded');
                }
            };
            fileInput.click();
        } catch (error) {
            console.error('파일 업로드 중 오류 발생:', error);
            alert('파일 업로드 중 오류가 발생했습니다.');
        }
    };

    return (
        <Container>
            <SideMenu>
                <DropdownMenu
                    icon={FaUpload}
                    menuItems={uploadMenuItems}
                    title='업로드'
                    size={16}
                    isOpen={isDropdownOpen}
                    setIsOpen={setIsDropdownOpen}
                />
                <Divider></Divider>
                <Button to={'/'}>
                    <FaHome size={20}/>
                    홈
                </Button>
                <Button to={'/myfiles'}>
                    <IoFileTrayStackedSharp size={20}/>
                    내 파일함
                </Button>
                <Button to={'/sharedfiles'}>
                    <FaShare size={20}/>
                    공유 파일함
                </Button>
            </SideMenu>
        </Container>
    );
};

export default SideBar;