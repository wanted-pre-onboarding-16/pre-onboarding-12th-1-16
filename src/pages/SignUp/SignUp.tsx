import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Vaildate from '../../custom/Vaildate';
import { SignUpHandle } from '../../util/UserUtil';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.h1`
  color: ${props => props.theme.colors.white};
  margin-bottom: 25px;
`;

const EmailWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PasswordWrapper = styled(EmailWrapper)``;

const SignUpForm = styled.form`
  width: 450px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.colors.white};
  background: linear-gradient(
    to right,
    ${props => props.theme.colors.red},
    ${props => props.theme.colors.lightRed}
  );
  border-radius: 10px;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
`;

const Label = styled.label`
  font-weight: bold;
  font-size: x-large;
  margin-bottom: 5px;
`;

const EmailInput = styled.input`
  width: 300px;
  background-color: ${props => props.theme.colors.deepWhite};
  border: none;
  padding: 12px 15px;
  margin-bottom: 5px;
`;

const PasswordInput = styled(EmailInput)``;

const ErrorMsg = styled.p`
  text-align: center;
  margin-top: 20px;
`;

const SignUpBtn = styled.button`
  border-radius: 20px;
  border: 1px solid ${props => props.theme.colors.white};
  background-color: transparent;
  color: ${props => props.theme.colors.white};
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  margin-top: 20px;
  cursor: pointer;

  &:active {
    transform: scale(0.95);
  }
`;

const SignUp = () => {
  const navigate = useNavigate();
  const {
    email,
    setEmail,
    password,
    setPassword,
    enableButton,
    handleEmailChange,
    handlePasswordChange,
  } = Vaildate();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSignUp(e);
  };

  const [error, setError] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enableButton) return;
    try {
      await SignUpHandle(email, password).then(result => {
        if (result?.status === 201) {
          setError('');
          navigate('/signin');
          setEmail('');
          setPassword('');
        }
      });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response && err.response.status === 400) {
        setError(err.response.data.message);
      } else {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem('jwt_token')) navigate('/todo');
  }, [navigate]);

  return (
    <Container>
      <SignUpForm onSubmit={handleSignUp}>
        <Text>Sign Up</Text>
        <EmailWrapper>
          <Label>Email</Label>
          <EmailInput
            name="email"
            type="text"
            data-testid="email-input"
            placeholder="example@eamil.com"
            onChange={e => handleEmailChange(e)}
          />
        </EmailWrapper>
        <PasswordWrapper>
          <Label>Password</Label>
          <PasswordInput
            type="password"
            name="password"
            data-testid="password-input"
            placeholder="******************"
            onChange={e => handlePasswordChange(e)}
            onKeyDown={handleKeyDown}
          />
          {error && <ErrorMsg>{error}</ErrorMsg>}
        </PasswordWrapper>
        <div>
          <SignUpBtn
            type="submit"
            data-testid="signup-button"
            disabled={enableButton ? false : true}
          >
            Sign Up
          </SignUpBtn>
        </div>
      </SignUpForm>
    </Container>
  );
};

export default SignUp;
