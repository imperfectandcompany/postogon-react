import React, { useState } from 'react';
import axios from 'axios';
import { setLoginDetails } from '../../Utils/Common';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

 
function Login(props: { history: string[]; }) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState<String | null>(null);
 
  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('https://api.postogon.com/auth', { username: username.value, password: password.value }).then(response => {
      setLoading(false);
      setLoginDetails(JSON.stringify(response.data));
    props.history.push('/login');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data);
      else 
     setError("Something went wrong. Please try again later.");
    });
  }
 
  return (
      <div className="max-w-md p-8 mx-auto bg-white rounded md:p-12 md:my-10 lg:shadow-2xl md:shadow-lg sm:shadow-sm">
        <form className="flex flex-col" onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 font-light text-md" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              {...username} autoComplete="new-password"
              className="w-full p-4 font-light leading-tight border border-gray-500 appearance-none bg-drabya-gray focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-light text-md" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              {...password} autoComplete="new-password" 
              className="w-full p-4 font-light leading-tight border border-gray-500 appearance-none bg-drabya-gray focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between mb-5">
            <Link to="/continue">
              <div className="inline-block text-sm font-light text-indigo-600 align-baseline hover:text-indigo-500">
                Already have an account?
              </div>
            </Link>
            <motion.button
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.9 }}
              style={{}}
              type="submit" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading}
              className="flex-initial px-6 py-2 font-semibold text-white bg-indigo-600 rounded justify-items-start hover:bg-indigo-700 focus:outline-none focus:shadow-outline"
            >{loading ? <div><div className="animate-pulse text-indigo-500">Login</div></div> : <div>Login</div>}
            </motion.button>
          </div>
        </form>
        <div className="text-center break-words">{error && <><small className="text-indigo-600">{error}</small><br /></>}<br />
</div>
      </div>






  );
}
 
const useFormInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}
 
export default Login;