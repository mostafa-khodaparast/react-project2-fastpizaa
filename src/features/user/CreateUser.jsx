import { useState } from 'react';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateName } from './userSlice';

function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateName(username))
    navigate('/menu')
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className='pb-4 font-bold'>👋 Welcome! Please start by telling us your name:</p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='customeInput w-72 mb-3'
      />

      {username ? (
        <div>
          <Button size="medium">Start ordering</Button>
        </div>
      ) : ''}
    </form>
  );
}

export default CreateUser;
