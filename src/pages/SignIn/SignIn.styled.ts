import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.h1`
  color: ${props => props.theme.colors.white};
  margin-bottom: 25px;
`;

export const EmailWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PasswordWrapper = styled(EmailWrapper)``;

export const SignInForm = styled.form`
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

export const Label = styled.label`
  font-weight: bold;
  font-size: x-large;
  margin-bottom: 5px;
`;

export const EmailInput = styled.input`
  width: 300px;
  background-color: ${props => props.theme.colors.deepWhite};
  border: none;
  padding: 12px 15px;
  margin-bottom: 5px;
`;

export const PasswordInput = styled(EmailInput)``;

export const ErrorMsg = styled.p`
  text-align: center;
  margin-top: 20px;
`;

export const SignInBtn = styled.button`
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
  margin-right: 5px;
  cursor: pointer;

  &:active {
    transform: scale(0.95);
  }
`;

export const SignUpBtn = styled(SignInBtn)`
  margin-left: 5px;
`;
