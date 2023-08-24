export interface ITodo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
export interface State {
  todos: ITodo[];
}

export type Action =
  | { type: 'ADD'; payload: ITodo }
  | { type: 'GET'; payload: ITodo[] }
  | { type: 'DELETE'; payload: number }
  | {
      type: 'UPDATE';
      payload: ITodo;
    };
export interface Prop {
  data: ITodo;
  deleteTodo: (postId: number) => void;
  updateTodo: (data: ITodo) => void;
  toggleIsModify: () => void;
  isModify: boolean;
}
