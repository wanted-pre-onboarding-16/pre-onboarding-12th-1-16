import axios from 'axios';
import React, { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import Todo from '../../components/Todo/Todo';
import { GlobalState } from '../../context/TodoProvider';
import { GetTodo, PostTodo } from '../../util/TodoUtil';

const Todos = () => {
  const navigation = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const context = GlobalState();
  const signOut = useCallback(() => {
    localStorage.removeItem('jwt_token');
    navigation('/');
  }, [navigation]);

  const addTodo = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();

      if (!inputRef.current) return;
      if (!inputRef.current.value.trim()) {
        alert('옳바르지 않은 값을 입력하셨습니다.');

        return;
      }
      try {
        await PostTodo(inputRef.current.value).then(result => {
          context?.dispatch({
            type: 'ADD',
            payload: result,
          });
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
    },
    [context],
  );

  useEffect(() => {
    if (!localStorage.getItem('jwt_token')) {
      alert('로그인을 하지않았습니다.');
      navigation('/signin');
      return;
    }
    const fetchInitialState = async () => {
      try {
        const result = await GetTodo();
        context?.dispatch({ type: 'GET', payload: result });
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
      <div className="my-10 flex items-center border-b border-teal-500 py-2">
        <input type="text" placeholder="example" data-testid="new-todo-input" ref={inputRef} />
        <button type="button" data-testid="new-todo-add-button" onClick={addTodo}>
          ADD
        </button>
      </div>
      <ul>{context?.state.todos.map(todo => <Todo key={todo.id} data={todo} />)}</ul>
    </div>
  );
};

export default Todos;
