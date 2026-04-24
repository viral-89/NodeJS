import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DataContext } from '../context/UserContext'

const EditProfile = () => {

    const [formData, setFormData] = useState({ email: "", username: "" })
    const [error, setError] = useState("")

    const { centerData } = useContext(DataContext)
    console.log("User Data :", centerData)

    useEffect(() => {
        if (centerData) {
            setFormData({ email: centerData.email, username: centerData.username })
        }
    }, [centerData])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate();

    const userData = { username: centerData.Username, email: centerData.Email }

    const submitForm = async () => {
        try {
            await axios.put(`${import.meta.env.VITE_BASE_URL}/user/update`, formData, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })

            navigate("/profile")
          
        } catch (error) {
            console.log(error.response)
            setError(error.response)
        }
    }

    return (
        <>
            <div className="bg-white flex justify-center items-center min-h-screen">

                <form className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800" onSubmit={(e) => e.preventDefault(submitForm())}>

                    {/* Heading */}
                    <div className="inline-flex items-center gap-2 mb-2 mt-10">
                        <p className="text-3xl">Edit Profile</p>
                    </div>




                    {/* Password */}
                    <input
                        type="text"
                        id="username"
                        placeholder="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-800 outline-none"
                    />

                    {/* Email */}
                    <input
                        type="email"
                        id="email"
                        placeholder="email"
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-800 outline-none"
                    />


                    {/* Links */}
                    <div className="w-full flex flex-col gap-3">
                        <button className="bg-black text-white py-2 hover:bg-gray-900 text-center">
                            Update Profile
                        </button>

                        <Link to="/profile" className="text-center border border-gray-800 py-2 hover:bg-gray-100">
                            Back To Profile
                        </Link>
                    </div>

                </form>

            </div>
        </>
    )
}

export default EditProfile