import axios from 'axios';

export const PostTodo = async (todo: string) => {
  const result = await axios({
    url: 'https://www.pre-onboarding-selection-task.shop/todos',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json',
    },
    data: {
      todo,
    },
  });

  return result.data;
};

export const GetTodo = async () => {
  const result = await axios({
    url: `https://www.pre-onboarding-selection-task.shop/todos`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
    },
  });
  return result.data;
};
export const DeleteTodo = async (id: number) => {
  await axios({
    url: `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
    },
  });
};

export const UpdateTodo = async (value: { id: number; todo: string; isCompleted: boolean }) => {
  const result = await axios({
    url: `https://www.pre-onboarding-selection-task.shop/todos/${value.id}`,
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json',
    },
    data: {
      todo: value.todo,
      isCompleted: value.isCompleted,
    },
  });
  return result.data;
};
