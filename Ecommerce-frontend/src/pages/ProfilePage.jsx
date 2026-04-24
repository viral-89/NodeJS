import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { data, Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../context/UserContext';

const ProfilePage = () => {

  const [Data, setData] = useState("")
  const [Error, setError] = useState("")

  const { centerData } = useContext(DataContext)

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })

        console.log(localStorage.getItem("token"))
        setData(response?.data?.user)

      } catch (error) {
        console.log(error.response)
        setError(error.response?.data?.message)
      }
    }
    fetchData()
  }, [])

  const logout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })

      localStorage.setItem("token", " ")
      navigate("/login")
    } catch (error) {
      console.log(error.response)
    }
  }


  return (
    <>

      {Error && (
        <div className='w-full h-screen flex items-center justify-center text-9xl text-red-600'>
          Access Denied !
        </div>
      )}

      {/* user profile */}
      {Data.username && (<div className="bg-white flex justify-center items-center min-h-screen">

        <div className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-6 text-gray-800">

          {/* Avatar */}
          <div className="w-24 h-24 border border-gray-800 rounded-full flex items-center justify-center cursor-pointer">
            <span className="text-xl">
              {Data?.username
                ? Data.username
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)
                : "?"}
            </span>
          </div>

          {/* Name */}
          <div className="text-center">
            <h1 className="text-2xl ">{Data?.username}</h1>
          </div>



          {/* Details */}
          <div className="w-full space-y-3">
            <div className="border-b border-gray-800 pb-2">
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm">{Data?.email}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="w-full flex flex-col gap-3">
            <Link to="/edit-profile" className="bg-black text-white py-2 hover:bg-gray-900 text-center">
              <button >
                Edit Profile
              </button>
            </Link>

            <button className="border border-gray-800 py-2 hover:bg-gray-100" onClick={logout}>
              Log Out
            </button>
          </div>

        </div>

      </div>)}


    </>
  );
};

export default ProfilePage;