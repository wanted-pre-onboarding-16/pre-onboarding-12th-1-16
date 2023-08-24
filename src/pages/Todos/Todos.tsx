import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { ITodo } from '../../..';
import Todo from '../../components/Todo/Todo';

import { DeleteTodo, GetTodo, PostTodo, UpdateTodo } from '../../util/TodoUtil';
import { AddBtn, Container, Input, InputWrapper, SignOutBtn } from './Todos.styled';

const Todos = () => {
  const navigation = useNavigate();
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const signOut = useCallback(() => {
    localStorage.removeItem('jwt_token');
    navigation('/');
  }, [navigation]);

  const toggleIsModify = (id?: number) => {
    if (id === undefined) return;
    setEditingTodoId(prevId => (prevId === id ? null : id));
  };

  const addTodo = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!inputRef.current) return;
    if (!inputRef.current.value.trim()) return;

    try {
      await PostTodo(inputRef.current.value).then(result => {
        if (result) {
          setTodoList(prevList => [...prevList, result]);
          if (inputRef.current) {
            inputRef.current.value = '';
          }
        } else throw Error('유효하지 않은 응답입니다.');
      });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        console.error(err.response?.data.message);
      } else {
        console.error(err);
      }
    }
  }, []);

  const deleteTodo = useCallback(async (postId: number) => {
    try {
      const result = await DeleteTodo(postId);
      if (result.status === 204) {
        setTodoList(prevList => {
          const newList = [...prevList].filter(el => el.id !== postId);
          return newList;
        });
      } else throw Error('유효하지 않은 응답');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        console.error(err.response.data.message);
      } else {
        console.error(err);
      }
    }
  }, []);

  const updateTodo = useCallback(async (updatedTodo: ITodo) => {
    try {
      const result = await UpdateTodo(updatedTodo);
      if (result.status === 200) {
        setTodoList(prevList => {
          const updatedList = [...prevList];
          const todoIndex = updatedList.findIndex(el => el.id === updatedTodo.id);
          if (todoIndex !== -1) {
            updatedList[todoIndex] = updatedTodo;
          }
          return updatedList;
        });
      } else throw Error('유효하지 않은 응답');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        console.error(err.response.data.message);
      } else {
        console.error(err);
      }
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('jwt_token')) {
      navigation('/signin');
      return;
    }
    const fetchInitialState = async () => {
      try {
        const result = await GetTodo();
        setTodoList(result);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.data) {
          console.error(err.response.data.message);
        } else {
          console.error(err);
        }
      }
    };
    fetchInitialState();
  }, [navigation]);

  return (
    <Container>
      <SignOutBtn onClick={signOut}>Sign Out</SignOutBtn>
      <InputWrapper>
        <Input
          type="text"
          placeholder="1글자 이상 입력하세요."
          data-testid="new-todo-input"
          ref={inputRef}
        />
        <AddBtn type="button" data-testid="new-todo-add-button" onClick={addTodo}>
          ADD
        </AddBtn>
      </InputWrapper>
      <ul>
        {todoList?.map(todo => (
          <Todo
            key={todo.id}
            data={todo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
            isModify={todo.id === editingTodoId}
            toggleIsModify={() => toggleIsModify(todo.id)}
          />
        ))}
      </ul>
    </Container>
  );
};

export default Todos;
