import styled from 'styled-components';

export const List = styled.li`
  display: flex;

  margin: 2rem 0;
  padding: 0.5rem 0;
  border-bottom: 2px;
  border-style: solid;
  border-color: #eee;
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
  /* border-color: #38b2ac; /* border-teal-500의 일반적인 값입니다. 실제 프로젝트의 색상 값에 따라 변경될 수 있습니다. */
  /* border-bottom-width: 2px; */
  padding: 0;
  outline: none;
`;
export const Text = styled.p`
  font-size: 24px;
  margin-right: 4px;
  min-width: 250px;
  vertical-align: middle;
  line-height: 1.5;
  color: #eee;
`;
export const ModifyBtn = styled.button`
  width: 100%;
  background-color: transparent;
  margin-right: 4px;
  border: 1px solid #eee;
  color: #eee;
  padding: 2px 7px;
  border-radius: 0.25rem;
`;
export const DeleteBtn = styled(ModifyBtn)``;
export const UpdateBtn = styled(ModifyBtn)``;
export const CancelBtn = styled(ModifyBtn)``;
