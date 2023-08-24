import axios from 'axios';
import React, { useCallback, useRef } from 'react';
import { ITodo, Prop } from '../../..';
import { UpdateTodo } from '../../util/TodoUtil';

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
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (checkRef.current && textRef.current && isModify) {
        if (!textRef.current.value.trim()) {
          alert('공백은 저장이 불가능합니다.');
          return;
        }
        const updatedTodo: ITodo = {
          ...data,
          todo: textRef.current.value,
          isCompleted: checkRef.current.checked,
        };
        await updateTodo(updatedTodo);
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
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        alert(err.response.data.message);
      } else {
        console.error(err);
      }
    }
  }, [data, isModify, updateTodo]);
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
        <button onClick={handelUpdate} data-testid="submit-button">
          제출
        </button>
      ) : (
        <button onClick={toggleIsModify} data-testid="modify-button">
          수정
        </button>
      )}

      {isModify ? (
        <button onClick={() => toggleIsModify()} data-testid="cancel-button">
          취소
        </button>
      ) : (
        <button onClick={handleDelete} data-testid="delete-button">
          삭제
        </button>
      )}
    </li>
  );
};

export default Todo;
