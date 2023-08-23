import React, { useEffect, useState } from 'react';

const Vaildate = () => {
  const [email, setEmail] = useState('');
  const [isEmailValidate, setIsEamilValidate] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordValidate, setIsPasswordValidate] = useState(false);
  const [enableButton, setEnableButton] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!/@/.test(e.target.value)) {
      setIsEamilValidate(false);
    } else {
      setIsEamilValidate(true);
    }
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 8) {
      setIsPasswordValidate(false);
    } else {
      setIsPasswordValidate(true);
    }
    setPassword(e.target.value);
  };
  useEffect(() => {
    if (!isEmailValidate || !isPasswordValidate) {
      setEnableButton(false);
      return;
    }
    setEnableButton(true);
  }, [isEmailValidate, isPasswordValidate, setEnableButton]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    enableButton,
    handleEmailChange,
    handlePasswordChange,
  };
};

export default Vaildate;
