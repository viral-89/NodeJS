import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { DataContext } from '../context/UserContext';


const LoginPage = () => {
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [Error, setError] = useState("")

  const { setCenterData } = useContext(DataContext)

  const navigate = useNavigate();

  // API Fetch -- Data Send

  const submitForm = async () => {
    console.log("Form Submitted !")

    const userData = { email: Email, password: Password }

    try {
      let response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, userData)

      if (response.status === 200) {
        const data = response.data;

        localStorage.setItem("token", data.token);
        setCenterData(data.checkUser)
        navigate("/profile")
      }

      setEmail("")
      setPassword("")

    } catch (e) {
      let error = e.response?.data?.error;
      setError(error)
    }

  }

  return (
    <div className="bg-white flex justify-center items-center min-h-screen">

      <form className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800" onSubmit={(e) => e.preventDefault(submitForm())}>

        {/* Heading */}
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="text-3xl">Login</p>
        </div>

        {Error && <div className="w-full">
          {Error.map((val, index) => {
            return (
              <p key={index} className="border border-red-600 px-3 py-2 text-red-400 text-sm mb-2 bg-red-50">
                {val.msg}
              </p>
            )
          })}
        </div>}


        {/* Email */}
        <input
          type="email"
          id="email"
          placeholder="Email"
          name='email'
          value={Email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          className="w-full px-3 py-2 border border-gray-800 outline-none"
        />

        {/* Password */}
        <input
          type="password"
          id="password"
          placeholder="Password"
          name="password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800 outline-none"
        />

        {/* Links */}
        <div className="w-full flex justify-between text-sm -mt-2">
          <p className="cursor-pointer hover:underline">Forgot password?</p>
          <Link to="/joinus" className="cursor-pointer hover:underline">
            Create account
          </Link>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bg-black text-white font-light px-8 py-2 mt-4 hover:bg-gray-900"
        >
          Login
        </button>

      </form>

    </div>
  );
};

export default LoginPage;