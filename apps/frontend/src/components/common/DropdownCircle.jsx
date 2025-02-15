import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const MenuWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const MenuButton = styled.div`
  display: flex;
  justify-content: center;
  height: 40px;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  width: 36px;
  height: 36px;

  &:hover {
    background-color: #a4c2f4;
  }

  svg {
    display: block;
  }
`;

const MenuList = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  position: absolute;
  right: 0;
  background-color: white;
  min-width: 160px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
`;

const MenuItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: #f4f6f9;
  }
`;

const DropdownCircle = ({ icon: Icon, menuItems, size=20 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  return (
    <MenuWrapper ref={menuRef}>
      <MenuButton onClick={toggleMenu}>
        {Icon && <Icon size={size} />}
      </MenuButton>
      <MenuList $isOpen={isOpen}>
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={item.onClick}>
            {item.label}
          </MenuItem>
        ))}
      </MenuList>
    </MenuWrapper>
  );
};

export default DropdownCircle;