import styled from 'styled-components';

export const List = styled.li`
  display: flex;
  margin: 2rem 0;
  padding: 0.5rem 0;
  border-bottom: 2px;
  border-style: solid;
  border-color: ${props => props.theme.colors.deepWhite};
`;

export const TodoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CheckBoxInput = styled.input`
  margin-right: 1rem;
`;

export const Input = styled.input`
  font-size: 24px;
  margin-right: 4px;
  min-width: 250px;
  border: 0;
  height: 36px;
  padding: 0;
  outline: none;
`;
export const Text = styled.p`
  font-size: 24px;
  margin-right: 4px;
  min-width: 250px;
  vertical-align: middle;
  line-height: 1.5;
  color: ${props => props.theme.colors.deepWhite};
`;
export const ModifyBtn = styled.button`
  width: 100%;
  background-color: transparent;
  margin-right: 4px;
  border: 1px solid ${props => props.theme.colors.deepWhite};
  color: ${props => props.theme.colors.deepWhite};
  padding: 2px 7px;
  border-radius: 0.25rem;
  transition: color 0.2s;
  &:hover {
    color: black;
  }
`;
export const DeleteBtn = styled(ModifyBtn)``;
export const UpdateBtn = styled(ModifyBtn)``;
export const CancelBtn = styled(ModifyBtn)``;
