import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="mt-auto relative overflow-hidden py-16 bg-gray-950 border-t border-gray-800/50">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-950" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          {/* Logo and Copyright Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-8 inline-flex items-center group">
                <div className="transform transition-transform duration-300 group-hover:scale-105">
                  <Logo width="100px" />
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-gray-400 leading-relaxed max-w-md">
                  Crafting exceptional digital experiences with passion and precision. 
                  Your stories, beautifully told.
                </p>
                <p className="text-xs text-gray-500 border-t border-gray-800 pt-4">
                 
                </p>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-wider mb-6 text-xs font-semibold uppercase text-gray-300 
                           relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 
                           after:w-8 after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-gray-400 hover:text-white transition-all duration-300 
                             hover:translate-x-1 transform inline-block
                             relative group"
                    to="/"
                  >
                    <span className="relative">
                      Features
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r 
                                     from-blue-500 to-purple-500 group-hover:w-full 
                                     transition-all duration-300" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-white transition-all duration-300 
                             hover:translate-x-1 transform inline-block
                             relative group"
                    to="/"
                  >
                    <span className="relative">
                      Pricing
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r 
                                     from-blue-500 to-purple-500 group-hover:w-full 
                                     transition-all duration-300" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-white transition-all duration-300 
                             hover:translate-x-1 transform inline-block
                             relative group"
                    to="/"
                  >
                    <span className="relative">
                      Affiliate Program
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r 
                                     from-blue-500 to-purple-500 group-hover:w-full 
                                     transition-all duration-300" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-white transition-all duration-300 
                             hover:translate-x-1 transform inline-block
                             relative group"
                    to="/"
                  >
                    <span className="relative">
                      Press Kit
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r 
                                     from-blue-500 to-purple-500 group-hover:w-full 
                                     transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Support Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-wider mb-6 text-xs font-semibold uppercase text-gray-300 
                           relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 
                           after:w-8 after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500">
                Support
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-gray-400 hover:text-white transition-all duration-300 
                             hover:translate-x-1 transform inline-block
                             relative group"
                    to="/"
                  >
                    <span className="relative">
                      Account
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r 
                                     from-blue-500 to-purple-500 group-hover:w-full 
                                     transition-all duration-300" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-white transition-all duration-300 
                             hover:translate-x-1 transform inline-block
                             relative group"
                    to="/"
                  >
                    <span className="relative">
                      Help
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r 
                                     from-blue-500 to-purple-500 group-hover:w-full 
                                     transition-all duration-300" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-white transition-all duration-300 
                             hover:translate-x-1 transform inline-block
                             relative group"
                    to="/"
                  >
                    <span className="relative">
                      Contact Us
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r 
                                     from-blue-500 to-purple-500 group-hover:w-full 
                                     transition-all duration-300" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-white transition-all duration-300 
                             hover:translate-x-1 transform inline-block
                             relative group"
                    to="/"
                  >
                    <span className="relative">
                      Customer Support
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r 
                                     from-blue-500 to-purple-500 group-hover:w-full 
                                     transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-wider mb-6 text-xs font-semibold uppercase text-gray-300 
                           relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 
                           after:w-8 after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500">
                Legals
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-gray-400 hover:text-white transition-all duration-300 
                             hover:translate-x-1 transform inline-block
                             relative group"
                    to="/"
                  >
                    <span className="relative">
                      Terms &amp; Conditions
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r 
                                     from-blue-500 to-purple-500 group-hover:w-full 
                                     transition-all duration-300" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-white transition-all duration-300 
                             hover:translate-x-1 transform inline-block
                             relative group"
                    to="/"
                  >
                    <span className="relative">
                      Privacy Policy
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r 
                                     from-blue-500 to-purple-500 group-hover:w-full 
                                     transition-all duration-300" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-white transition-all duration-300 
                             hover:translate-x-1 transform inline-block
                             relative group"
                    to="/"
                  >
                    <span className="relative">
                      Licensing
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r 
                                     from-blue-500 to-purple-500 group-hover:w-full 
                                     transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer