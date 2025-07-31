import React from 'react'
import appwriteService from '../appwrite/config'
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
    
  return (
    <Link to={`/post/${$id}`} className="group block">
        <article className='w-full bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden
                          border border-gray-600/40 hover:border-gray-500/60
                          transition-all duration-300 ease-out
                          shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30
                          hover:-translate-y-2 transform
                          group-hover:bg-gray-700/60
                          ring-1 ring-gray-700/30 hover:ring-gray-600/40'>
            
            {/* Image Container */}
            <div className='relative overflow-hidden'>
                <img 
                    src={appwriteService.getFileView(featuredImage)} 
                    alt={title}
                    className='w-full h-48 object-cover transition-transform duration-500 ease-out
                             group-hover:scale-110' 
                />
                
                {/* Image overlay on hover */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                
                {/* Read more indicator */}
                <div className='absolute bottom-4 right-4 opacity-0 group-hover:opacity-100
                              transition-all duration-300 transform translate-y-2 group-hover:translate-y-0'>
                    <div className='bg-white/20 backdrop-blur-sm rounded-full p-2
                                  border border-white/30'>
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className='p-6 bg-gray-900/30'>
                <h2 className='text-xl font-bold text-white mb-2 line-clamp-2
                             group-hover:text-blue-300 transition-colors duration-300'>
                    {title}
                </h2>
                
                {/* Subtle divider */}
                <div className='w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 
                              opacity-60 group-hover:opacity-100 group-hover:w-16
                              transition-all duration-300' />
                
                {/* Read more text */}
                <div className='mt-4 flex items-center text-gray-400 group-hover:text-blue-400
                              transition-colors duration-300'>
                    <span className='text-sm font-medium'>Read Article</span>
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 
                                   transition-transform duration-300" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>

            {/* Enhanced glow effect on hover */}
            <div className='absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
                          transition-opacity duration-300 pointer-events-none
                          bg-gradient-to-br from-blue-500/8 via-transparent to-purple-500/8' />
        </article>
    </Link>
  )
}

export default PostCard
