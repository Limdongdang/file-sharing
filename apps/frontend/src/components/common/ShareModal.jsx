import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale'
import { addDays } from 'date-fns';
import Calendar from './Calendar';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  min-width : 400px;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 80%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  margin: 5px;
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ShareModal = ({ isOpen,onRequestClose, onShare }) => {
  const [expiryDate, setExpiryDate] = useState(addDays(new Date(), 1));

  if (!isOpen) return null;

  const handleShare = () => {
    onShare(expiryDate);
  };

  const handleDateChange = (date) => {
    setExpiryDate(date);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onRequestClose();
    }
  };

  return ReactDOM.createPortal(
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <div style={{ marginBottom: '20px' }}>
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>공유 링크를 생성하시겠습니까?</span>
        </div>
        <div>
          <label>공유 기간 : </label>
          <Calendar onDateChange={handleDateChange}></Calendar>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button onClick={handleShare}>확인</Button>
          <Button onClick={onRequestClose}>취소</Button>
        </div>
      </ModalContent>
    </ModalOverlay>,
    document.body
  );
};

export default ShareModal;