import axios from 'axios';
import React, { useCallback, useRef, useState } from 'react';
import type { Prop } from '../../..';
import { GlobalState } from '../../context/TodoProvider';
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

const Todo = ({ data, deleteTodo }: Prop) => {
  const context = GlobalState();
  const textRef = useRef<HTMLInputElement>(null);
  const checkRef = useRef<HTMLInputElement>(null);
  const [isModify, setIsModify] = useState(false);

  const handleDelete = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      deleteTodo(data.id);
    },
    [data.id, deleteTodo],
  );
  const updateTodo = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (checkRef.current && textRef.current && isModify) {
        if (!textRef.current.value.trim()) {
          alert('공백은 저장이 불가능합니다.');
          return;
        }
      }
      try {
        const result = await UpdateTodo({
          id: data.id,
          todo: textRef.current?.value as string,
          isCompleted: checkRef.current?.checked as boolean,
        });
        context?.dispatch({
          type: 'UPDATE',
          payload: result,
        });
        setIsModify(false);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.data) {
          alert(err.response.data.message);
        } else {
          console.error(err);
        }
      }
    },
    [context, data.id, isModify],
  );

  const checkBoxUpdate = useCallback(async () => {
    try {
      if (checkRef.current && !isModify) {
        const result = await UpdateTodo({
          ...data,
          isCompleted: checkRef.current?.checked,
        });
        context?.dispatch({
          type: 'UPDATE',
          payload: result,
        });
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        alert(err.response.data.message);
      } else {
        console.error(err);
      }
    }
  }, [context, data, isModify]);
  return (
    <List>
      <CheckBoxInput
        type="checkbox"
        defaultChecked={data.isCompleted}
        ref={checkRef}
        onChange={checkBoxUpdate}
      />
      {isModify ? (
        <TodoWrapper>
          <Input
            type="text"
            defaultValue={data.todo}
            ref={textRef}
            data-testid="modify-input"
          ></Input>
          <UpdateBtn onClick={updateTodo} data-testid="submit-button">
            제출
          </UpdateBtn>
          <CancelBtn onClick={() => setIsModify(false)} data-testid="cancel-button">
            취소
          </CancelBtn>
        </TodoWrapper>
      ) : (
        <TodoWrapper>
          <Text>{data.todo}</Text>

          <ModifyBtn onClick={() => setIsModify(!isModify)} data-testid="modify-button">
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

export default React.memo(Todo);
