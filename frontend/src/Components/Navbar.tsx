import React from 'react'
import { IoMdNotifications } from 'react-icons/io'
import { MdAccountCircle } from 'react-icons/md'
import { Link } from 'react-router-dom'


const Navbar: React.FC = () => {
  return (
    <header>
           <div className='container mx-auto px-4 py-5 flex justify-between items-center'>
                <h1 className=' text-2xl font-semibold'>Welcome!</h1>
                <div className="flex items-center justify-between space-x-4">
                    <button>
                        <IoMdNotifications size={24} className='text-gray-500'/>
                    </button>   
                    <button>
                        <Link to='/profile'>
                            <MdAccountCircle size={28} className='text-gray-500'/>
                        </Link>
                    </button>

                </div>
            </div>
    </header>
  )
}

export default Navbar