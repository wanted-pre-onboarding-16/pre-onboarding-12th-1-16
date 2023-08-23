import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Vaildate from '../../custom/Vaildate';
import { SignInHandle } from '../../util/UserUtil';

const SignIn = () => {
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

  const [error, setError] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enableButton) return;
    try {
      const result = await SignInHandle(email, password);
      if (result.status === 200 && result.data.access_token) {
        alert('환영합니다.');
        localStorage.setItem('jwt_token', result.data.access_token);
        setError('');
        setEmail('');
        setPassword('');
        navigate('/todo');
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
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
    <div>
      <form onSubmit={handleSignIn}>
        <div>
          <label htmlFor="">Email</label>
          <input
            type="text"
            data-testid="email-input"
            placeholder="example@email.com"
            onChange={e => handleEmailChange(e)}
            value={email}
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            data-testid="password-input"
            placeholder="password"
            value={password}
            onChange={e => handlePasswordChange(e)}
          />
          {error && <p>{error}</p>}
        </div>
        <div>
          <button data-testid="signin-button" type="submit" disabled={enableButton ? false : true}>
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
