export interface Todo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
export interface State {
  todos: Todo[];
}

export type Action =
  | { type: 'ADD'; payload: Todo }
  | { type: 'GET'; payload: Todo[] }
  | { type: 'DELETE'; payload: number }
  | {
      type: 'UPDATE';
      payload: Todo;
    };
export interface Prop {
  data: { id: number; todo: string; isCompleted: boolean; userId: number };
}
