import axios from 'axios';
import React, { useCallback, useRef, useState } from 'react';
import type { Prop } from '../../..';

import { GlobalState } from '../../context/TodoProvider';
import { DeleteTodo, UpdateTodo } from '../../util/TodoUtil';

const Todo = ({ data }: Prop) => {
  const context = GlobalState();
  const textRef = useRef<HTMLInputElement>(null);
  const checkRef = useRef<HTMLInputElement>(null);
  const [isModify, setIsModify] = useState(false);

  const deleteTodo = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await DeleteTodo(data.id).then(_ => {
          context?.dispatch({
            type: 'DELETE',
            payload: data.id,
          });
        });
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.data) {
          alert(err.response.data.message);
        } else {
          console.error(err);
        }
      }
    },
    [context, data.id],
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
    <li>
      <input
        type="checkbox"
        defaultChecked={data.isCompleted}
        ref={checkRef}
        onChange={checkBoxUpdate}
      />
      {isModify ? (
        <input
          type="text"
          defaultValue={data.todo}
          ref={textRef}
          data-testid="modify-input"
        ></input>
      ) : (
        <p>{data.todo}</p>
      )}

      {isModify ? (
        <button onClick={updateTodo} data-testid="submit-button">
          제출
        </button>
      ) : (
        <button onClick={() => setIsModify(!isModify)} data-testid="modify-button">
          수정
        </button>
      )}

      {isModify ? (
        <button onClick={() => setIsModify(false)} data-testid="cancel-button">
          취소
        </button>
      ) : (
        <button onClick={deleteTodo} data-testid="delete-button">
          삭제
        </button>
      )}
    </li>
  );
};

export default React.memo(Todo);
