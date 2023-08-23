import axios from 'axios';

export const SignInHandle = async (email: string, password: string) => {
  const result = await axios({
    url: 'https://www.pre-onboarding-selection-task.shop/auth/signin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      email,
      password,
    },
  });
  return result;
};

export const SignUpHandle = async (email: string, password: string) => {
  const result = await axios({
    url: 'https://www.pre-onboarding-selection-task.shop/auth/signup',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      email,
      password,
    },
  });
  return result;
};
