import React, { useState } from 'react'
import cityBg from '../images/cityBg.png'
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    
        const toggleVisibility = () => {
            setShowPassword(!showPassword);
        }

  return (  
    <>
    <div className='flex flex-col items-center justify-center h-screen text-white'
        style={{backgroundImage: `url(${cityBg})`}}>

        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
            <h1 className='text-4xl text-center text-white mb-10'>Sign in</h1>
            <form className='flex flex-col items-center justify-center mt-4'>
                <input type="email" placeholder="Email" className='mb-5 p-2 rounded w-80'/>
                  <div className="relative w-80 mb-5">
                              <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Password" 
                                className='p-2 rounded w-full'
                              />
                              <button 
                                type="button" 
                                onClick={toggleVisibility} 
                                className="absolute inset-y-0 right-2 flex items-center text-black"
                              >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                              </button>
                            </div>
                <button type="submit" className='bg-[#055992] text-white mb-2 p-2 rounded w-80'>Sign in</button>
                <p className='text-sm'>Not registered? <span className='underline'>Register</span></p>
            </form>
        </div>
    </div>
    </>
  )
}

export default Login