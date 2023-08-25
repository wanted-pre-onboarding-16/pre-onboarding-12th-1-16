import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Vaildate from '../../custom/Vaildate';
import { SignUpHandle } from '../../util/UserUtil';
import {
  Container,
  EmailInput,
  EmailWrapper,
  ErrorMsg,
  Label,
  PasswordInput,
  PasswordWrapper,
  Text,
} from '../SignIn/SignIn.styled';
import { SignInBtn, SignUpBtn, SignUpForm } from './SignUp.styled';

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
          <SignInBtn onClick={() => navigate('/signin')}>Sign In</SignInBtn>
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
