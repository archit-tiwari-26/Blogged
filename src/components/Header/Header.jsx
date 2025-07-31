import React, { useState, useEffect } from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-800/50 py-3' 
          : 'bg-gray-900/90 backdrop-blur-lg border-b border-gray-800/20 py-4'
      }`}>
        <Container>
          <nav className='flex items-center justify-between relative'>
            {/* Logo Section */}
            <div className='flex-shrink-0 z-10'>
              <Link to='/' className='block group'>
                <div className='relative inline-block p-2 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'>
                  <Logo width='70px' />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <ul className='hidden md:flex items-center space-x-1'>
              {navItems.map((item) => 
                item.active ? (
                  <li key={item.name} className='relative'>
                    <button
                      onClick={() => navigate(item.slug)}
                      className='relative px-6 py-3 font-medium text-gray-300 hover:text-white rounded-lg transition-all duration-300 hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-gray-600 group'
                    >
                      <span className='relative z-10'>{item.name}</span>
                      <div className='absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-3/4 transform -translate-x-1/2'></div>
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li className='ml-2'>
                  <LogoutBtn />
                </li>
              )}
            </ul>

            {/* Mobile Menu Button */}
            <button 
              className='md:hidden p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600 z-10'
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <div className='w-6 h-5 flex flex-col justify-between'>
                <span className={`block h-0.5 w-full bg-gray-300 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}></span>
                <span className={`block h-0.5 w-full bg-gray-300 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0 translate-x-4' : ''
                }`}></span>
                <span className={`block h-0.5 w-full bg-gray-300 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}></span>
              </div>
            </button>
          </nav>

          {/* Mobile Navigation */}
          <div className={`md:hidden absolute top-full left-0 right-0 bg-gray-900/98 backdrop-blur-xl rounded-b-xl shadow-2xl border-b border-gray-800/50 transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen 
              ? 'opacity-100 visible translate-y-0 max-h-96' 
              : 'opacity-0 invisible -translate-y-4 max-h-0'
          }`}>
            <ul className='py-4 space-y-1'>
              {navItems.map((item) => 
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        navigate(item.slug)
                        setIsMobileMenuOpen(false)
                      }}
                      className='w-full text-left px-6 py-4 font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200 relative group'
                    >
                      {item.name}
                      <div className='absolute left-0 top-0 bottom-0 w-1 bg-white transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300'></div>
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li className='px-6 py-2'>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        </Container>
      </header>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-300'
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
      
      {/* Spacer for fixed header */}
      <div className='h-20'></div>
    </>
  )
}

export default Header