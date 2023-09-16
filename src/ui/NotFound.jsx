import { useNavigate, useRouteError } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate()
  const error = useRouteError()

  return (
    <div className='flex flex-col items-center justify-center font-bold mt-auto h-screen w-full space-y-5'>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <button onClick={() => navigate(-1)} className='text-sm text-blue-500 hover:text-blue-600'>&larr; Go back</button>
    </div>
  );
}

export default NotFound;
