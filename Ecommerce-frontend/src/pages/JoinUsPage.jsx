import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const JoinUsPage = () => {

    const [Username, setUsername] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Error, setError] = useState("")

    const navigate = useNavigate();

    let userData = { username: Username, email: Email, password: Password }

    const submitForm = async () => {
        console.log("Form Submitted !");
        // console.log(userData);


        try {
            let response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, userData)
            if (response.status === 200) {
                const data = response;
                localStorage.setItem("token", data.token);

                navigate('/login')
            }

            setUsername("")
            setEmail("")
            setPassword("")
        } catch (err) {
            let Err = err.response?.data?.error
            console.log(err.response)
            console.log(Err);
            setError(Err);
        }

    }

    return (
        <div className="bg-white flex justify-center items-center min-h-screen">

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    submitForm();
                }}
                className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
            >

                {/* Heading */}
                <div className="inline-flex items-center gap-2 mb-2 mt-10">
                    <p className="text-3xl">Create Account</p>
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

                {/* Username */}
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={Username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3 py-2 border border-gray-800 outline-none"
                />

                {/* Email */}
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full px-3 py-2 border border-gray-800 outline-none"
                />

                {/* Password */}
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-3 py-2 border border-gray-800 outline-none"
                />

                {/* Footer Links */}
                <div className="w-full flex justify-end text-sm -mt-2">
                    <Link to="/login" className="cursor-pointer hover:underline">
                        Already have an account?
                    </Link>
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="bg-black text-white font-light px-8 py-2 mt-4 hover:bg-gray-900"
                >
                    Create Account
                </button>

            </form>

        </div>
    );
};

export default JoinUsPage;