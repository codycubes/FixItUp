import React from 'react'
import logo from '../images/Fix It Up Logo Design.png'
import { Link, NavLink } from 'react-router-dom'

const Sidebar: React.FC = () => {
  return (
    <>
      <aside className='w-1/5 h-screen bg-[#055992] p-5 text-white flex flex-col items-center'>
        <div className='flex justify-center items-center'>
          <Link to='/dashboard' className='text-2xl font-semibold'>
            <img src={logo} alt='Fix It Up Logo' className='rounded-full' width={96} />
          </Link>
        </div>
        <nav className='text-white text-lg md:text-2xl flex-grow flex flex-col items-center py-28 space-y-5'>
          <NavLink
            to='/dashboard'
            className={({ isActive }) =>
              isActive ? 'nav-link px-4 py-2 my-2 font-bold' : 'nav-link px-4 py-2 my-2'
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to='/issues'
            className={({ isActive }) =>
              isActive ? 'nav-link px-4 py-2 my-2 font-bold' : 'nav-link px-4 py-2 my-2'
            }
          >
            Issue Management
          </NavLink>
          <NavLink
            to='/analytics'
            className={({ isActive }) =>
              isActive ? 'nav-link px-4 py-2 my-2 font-bold' : 'nav-link px-4 py-2 my-2'
            }
          >
            Analytics
          </NavLink>
          <NavLink
            to='/settings'
            className={({ isActive }) =>
              isActive ? 'nav-link px-4 py-2 my-2 font-bold' : 'nav-link px-4 py-2 my-2'
            }
          >
            Settings
          </NavLink>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar