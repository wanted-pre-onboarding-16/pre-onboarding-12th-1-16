import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigation = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('jwt_token')) navigation('/todo');
    navigation('/signin');
  }, [navigation]);
  return <></>;
}

export default App;
