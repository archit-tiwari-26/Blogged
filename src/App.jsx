import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { Header, Footer } from './components';
import { login, logout } from './store/authSlice';
import { Outlet } from 'react-router';

function App() {
  const[loading, setloading]=useState(true);
  const dispatch=useDispatch();
  
  useEffect(()=>{
    authService.getCurrentUser().then((userData)=>{
      if(userData){dispatch(login(userData));}
      else{dispatch(logout());}
    })
    .finally(()=>setloading(false));
  },[])

  // Enhanced loading screen matching our design system
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        {/* Animated Loading Spinner */}
        <div className="relative">
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                        rounded-full blur-xl animate-pulse" />
          
          {/* Main spinner */}
          <div className="relative w-20 h-20 border-4 border-gray-800 rounded-full 
                        border-t-blue-500 border-r-purple-500 animate-spin" />
          
          {/* Inner spinner */}
          <div className="absolute inset-3 w-14 h-14 border-2 border-gray-700 rounded-full 
                        border-b-blue-400 animate-spin" style={{animationDirection: 'reverse'}} />
        </div>
        
        {/* Loading text */}
        <div className="absolute mt-32">
          <p className="text-gray-400 text-lg font-medium animate-pulse">
            Initializing...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col bg-gray-950'>
      {/* Header */}
      <Header />
      
      {/* Main Content Area */}
      <main className='flex-1 relative'>
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <Outlet />
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App