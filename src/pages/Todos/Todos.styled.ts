import styled from 'styled-components';
import { SignInBtn } from '../SignIn/SignIn.styled';

export const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  margin-top: 5rem;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 0.5rem;
  background: linear-gradient(
    to right,
    ${props => props.theme.colors.red},
    ${props => props.theme.colors.lightRed}
  );
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
`;
export const InputWrapper = styled.div`
  width: 50%;
  margin: 40px 0;
  padding: 8px 0;
  display: flex;
  align-items: center;
  border-bottom: 2px;
  border-style: solid;
  border-color: #eee;
`;

export const Input = styled.input`
  background-color: transparent;
  width: 100%;
  outline: none;
  border: none;
  color: #eee;
  font-size: 20px;
  margin-right: 3px;
  padding: 1px 2px;
  line-height: 1.25;
  appearance: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #eee;
  }
`;

export const SignOutBtn = styled(SignInBtn)`
  background-color: transparent;
  margin: 0;
  margin-left: auto;
  padding: 7px 44px;
  width: 150px;
  transition: color 0.2s;
  &:hover {
    color: black;
  }
`;

export const AddBtn = styled(SignInBtn)`
  flex-shrink: 0;
  background-color: transparent;
  margin: 0;
  transition: color 0.2s;
  &:hover {
    color: black;
  }
`;
