import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

    return (
        <>
            <div className='w-full h-screen flex items-center justify-center'>
                <Link to='/login'>
                    <button className="bg-black text-white font-light px-8 py-2 mt-4 hover:bg-gray-900">Go To Login Page</button>
                </Link>
            </div>
        </>
    )
}

export default Home