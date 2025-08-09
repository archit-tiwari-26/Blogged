import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div className="flex items-center space-x-3 group cursor-pointer" style={{width}}>
      {/* Logo Icon */}
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-105">
          {/* Icon Symbol */}
          <div className="relative">
            <div className="w-6 h-6 bg-white/90 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-sm"></div>
            </div>
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-white/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
        
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
      </div>
      
      {/* Logo Text */}
      <div className="flex flex-col">
        <span className="text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300">
          BloggedIn
        </span>
        <span className="text-xs text-slate-400 -mt-1 opacity-75 group-hover:opacity-100 transition-opacity duration-300">
          
        </span>
      </div>
    </div>
  )
}

export default Logo