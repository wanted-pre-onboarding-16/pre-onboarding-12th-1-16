import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

import Vaildate from '../../custom/Vaildate';
import { SignUpHandle } from '../../util/UserUtil';

const SignUp = () => {
  const navigation = useNavigate();
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enableButton) return;
    try {
      await SignUpHandle(email, password).then(result => {
        if (result?.status === 201) {
          alert('회원가입이 완료되었습니다');
          navigation('/signin');
          setEmail('');
          setPassword('');
        }
      });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response && err.response.status === 400) {
        alert(err.response.data.message);
      } else {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem('jwt_token')) navigation('/todo');
  }, [navigation]);

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <div>
          <div>
            <label>Email</label>
          </div>
          <div>
            <input
              name="email"
              type="text"
              data-testid="email-input"
              placeholder="example@eamil.com"
              onChange={e => handleEmailChange(e)}
            />
          </div>
        </div>
        <div>
          <div>
            <label>Password</label>
          </div>
          <div>
            <input
              type="password"
              name="password"
              data-testid="password-input"
              placeholder="******************"
              onChange={e => handlePasswordChange(e)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        <div>
          <div>
            <button
              type="submit"
              data-testid="signup-button"
              disabled={enableButton ? false : true}
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
