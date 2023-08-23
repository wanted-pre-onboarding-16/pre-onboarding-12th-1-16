import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function App() {
  const navigation = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('jwt_token')) navigation('/todo');
  }, [navigation]);
  return (
    <div>
      <h1>Wanted Front-end Todo List</h1>
      <div>
        <Link to={'/signin'}>Sign In</Link>
        <Link to={'/signup'}>Sign Up</Link>
      </div>
    </div>
  );
}

export default App;
