import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import userService from '../../services/user.service';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/auth.slice';
 
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  background-color: #cbdbfc;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
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

const LogoImage = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 12px;
`;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const toggleForm = () => {
    navigate('/register');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const body = {
        username: username,
        password: password,
      }
      const response = await userService.loginUser(body);
      if (response.status !== 200) {
        throw new Error('로그인에 실패했습니다.');
      } else{
        const user = { username: "test"};
        const token = response.data.token;
        dispatch(loginSuccess({ user, token }));
        localStorage.setItem('token', token);
        navigate('/');
      }
      
    } catch (error) {
      console.error('로그인 중 에러 발생:', error);
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <LogoImage src='/duck.png' alt='Logo' />
        <h2>Hide On Stash</h2>
        <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <Button type="submit">Login</Button>
        <ToggleButton onClick={toggleForm}>
          Create an account
        </ToggleButton>
      </Form>
    </Container>
  );
};

export default Login;