import axios from 'axios';
import React, { useCallback, useRef } from 'react';
import { ITodo, Prop } from '../../..';
import { UpdateTodo } from '../../util/TodoUtil';
import {
  CancelBtn,
  CheckBoxInput,
  DeleteBtn,
  Input,
  List,
  ModifyBtn,
  Text,
  TodoWrapper,
  UpdateBtn,
} from './Todo.styled';

const Todo = ({ data, deleteTodo, updateTodo, isModify, toggleIsModify }: Prop) => {
  const textRef = useRef<HTMLInputElement>(null);
  const checkRef = useRef<HTMLInputElement>(null);

  const handleDelete = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      deleteTodo(data.id);
    },
    [data.id, deleteTodo],
  );
  const handelUpdate = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (checkRef.current && textRef.current && isModify) {
        if (!textRef.current.value.trim()) return;
        const updatedTodo: ITodo = {
          ...data,
          todo: textRef.current.value,
          isCompleted: checkRef.current.checked,
        };
        updateTodo(updatedTodo);
        toggleIsModify();
      }
    },
    [data, isModify, updateTodo, toggleIsModify],
  );

  const checkBoxUpdate = useCallback(async () => {
    try {
      if (checkRef.current && !isModify) {
        const updatedTodo: ITodo = {
          ...data,
          isCompleted: checkRef.current?.checked,
        };
        const result = await UpdateTodo(updatedTodo);
        if (result.status === 204) {
          updateTodo(updatedTodo);
        } else throw Error('유효하지 않은 응답');
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        console.error(err.response.data.message);
      } else {
        console.error(err);
      }
    }
  }, [data, isModify, updateTodo]);
  return (
    <List>
      <CheckBoxInput
        name="checkbox-input"
        type="checkbox"
        defaultChecked={data.isCompleted}
        ref={checkRef}
        onChange={checkBoxUpdate}
        aria-label="checkbox"
      />

      {isModify ? (
        <TodoWrapper>
          <Input
            type="text"
            defaultValue={data.todo}
            ref={textRef}
            data-testid="modify-input"
            placeholder="1글자 이상 입력해주세요."
          ></Input>
          <UpdateBtn onClick={handelUpdate} data-testid="submit-button">
            제출
          </UpdateBtn>
          <CancelBtn onClick={() => toggleIsModify()} data-testid="cancel-button">
            취소
          </CancelBtn>
        </TodoWrapper>
      ) : (
        <TodoWrapper>
          <Text>{data.todo}</Text>
          <ModifyBtn onClick={toggleIsModify} data-testid="modify-button">
            수정
          </ModifyBtn>
          <DeleteBtn onClick={handleDelete} data-testid="delete-button">
            삭제
          </DeleteBtn>
        </TodoWrapper>
      )}
    </List>
  );
};

export default Todo;
