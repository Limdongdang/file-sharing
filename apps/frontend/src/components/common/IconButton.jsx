import React from 'react';
import { SlOptionsVertical } from 'react-icons/sl';
import styled from 'styled-components';

const IconButtonWrapper = styled.div`
    display: flex;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;

    &:hover {
        cursor: pointer;
        background-color: #a4c2f4;
    }

    svg {
        display: block;
    }
`;

const IconButton = ({ icon: Icon, onClick }) => { 
    return (
        <IconButtonWrapper onClick={onClick}>
            <Icon />
        </IconButtonWrapper>
    );
};
export default IconButton;