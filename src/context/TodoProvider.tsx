import React, { createContext, useContext, useReducer } from 'react';
import type { ITodo, State } from '../..';

type Action =
  | { type: 'ADD'; payload: ITodo }
  | { type: 'GET'; payload: ITodo[] }
  | { type: 'DELETE'; payload: number }
  | {
      type: 'UPDATE';
      payload: ITodo;
    };

const GlobalStateContext = createContext<
  { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

const initialState: State = {
  todos: [],
};

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case 'GET':
      return {
        ...state,
        todos: action.payload,
      };
    case 'DELETE':
      return {
        ...state,
        todos: state.todos.filter(el => el.id !== action.payload),
      };
    case 'UPDATE':
      return {
        ...state,
        todos: state.todos.map(el => {
          if (el.id === action.payload.id) return action.payload;
          return el;
        }),
      };
  }
};

export const GlobalState = () => {
  const context = useContext(GlobalStateContext);
  return context;
};

export const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
