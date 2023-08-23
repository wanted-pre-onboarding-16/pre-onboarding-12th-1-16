import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { ITodo } from '../../..';
import Todo from '../../components/Todo/Todo';

import { GetTodo, PostTodo } from '../../util/TodoUtil';

const Todos = () => {
  const [todoList, setTodoList] = useState<ITodo[]>([]);

  const navigation = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);

  const signOut = useCallback(() => {
    localStorage.removeItem('jwt_token');
    navigation('/');
  }, [navigation]);

  const addTodo = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!inputRef.current) return;
    let todo = inputRef.current.value;

    if (!todo.trim()) {
      alert('옳바르지 않은 값을 입력하셨습니다.');
      return;
    }
    try {
      await PostTodo(todo).then(result => {
        setTodoList(prevList => [...prevList, result]);
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        alert(err.response?.data.message);
      } else {
        console.error(err);
      }
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('jwt_token')) {
      alert('로그인을 하지않았습니다.');
      navigation('/signin');
      return;
    }
    const fetchInitialState = async () => {
      try {
        await GetTodo().then(result => setTodoList(result));
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.data) {
          alert(err.response.data.message);
        } else {
          console.error(err);
        }
      }
    };
    fetchInitialState();
  }, [navigation]);

  return (
    <div>
      <button onClick={signOut}>Sign Out</button>
      <div>
        <input type="text" placeholder="example" data-testid="new-todo-input" ref={inputRef} />
        <button type="button" data-testid="new-todo-add-button" onClick={addTodo}>
          ADD
        </button>
      </div>
      <ul>{todoList?.map(todo => <Todo key={todo.id} data={todo} />)}</ul>
    </div>
  );
};

export default Todos;
