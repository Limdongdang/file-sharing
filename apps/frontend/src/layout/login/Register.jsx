import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  padding: 20px;
  background-color: #cbdbfc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  margin: 5px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  margin-top: 10px;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const VerificationButton = styled.div`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;

  &:hover {
    background-color: #0056b3;
  }
`;

const VerificationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
`;

const Register = () => {
  const navigate = useNavigate();

  const toggleForm = () => {
    navigate('/login');
  };

  return (
    <Container>
      <Form>
        <h2>Sign Up</h2>
        <Input type="text" placeholder="Username" />
        <Input type="password" placeholder="Password" />
        <VerificationWrapper>
          <Input type="email" placeholder="Email" style={{ flex: 2 }} />
          <VerificationButton>Verify</VerificationButton>
        </VerificationWrapper>
        <Input type="text" placeholder="Verification Code" />
        <Button type="submit">Sign Up</Button>
        <ToggleButton onClick={toggleForm}>
          Already have an account?
        </ToggleButton>
      </Form>
    </Container>
  );
};

export default Register;