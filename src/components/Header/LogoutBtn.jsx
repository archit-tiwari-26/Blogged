import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
      className='relative px-5 py-2.5 text-red-400 font-medium text-sm
                 transition-all duration-300 ease-out
                 hover:text-red-300 hover:bg-red-500/10
                 rounded-lg backdrop-blur-sm border border-red-500/20
                 before:absolute before:inset-0 before:rounded-lg
                 before:bg-gradient-to-r before:from-red-500/10 before:to-red-600/10
                 before:opacity-0 before:transition-opacity before:duration-300
                 hover:before:opacity-100 hover:border-red-500/40
                 active:scale-95 active:transition-transform active:duration-150
                 focus:outline-none focus:ring-2 focus:ring-red-500/50
                 group overflow-hidden'
      onClick={logoutHandler}
    >
      <span className='relative z-10 transition-transform duration-200 group-hover:translate-x-0.5'>
        Logout
      </span>
      
      {/* Subtle animated background */}
      <div className='absolute inset-0 bg-gradient-to-r from-red-500/5 to-red-600/5 
                      translate-x-full group-hover:translate-x-0 transition-transform duration-300' />
    </button>
  )
}

export default LogoutBtn