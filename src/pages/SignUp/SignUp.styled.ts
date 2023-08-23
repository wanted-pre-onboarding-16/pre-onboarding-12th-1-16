import styled from 'styled-components';

export const SignUpForm = styled.form`
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

export const SignUpBtn = styled.button`
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
