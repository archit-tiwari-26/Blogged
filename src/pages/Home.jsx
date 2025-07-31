import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'

function Home() {
    const [allPosts, setAllPosts] = useState([]) // Store all posts
    const [displayedPosts, setDisplayedPosts] = useState([]) // Posts currently shown
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [postsPerPage] = useState(4) // Number of posts to load at a time
    const [currentPage, setCurrentPage] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setAllPosts(posts.documents)
                // Initially display only first 4 posts
                setDisplayedPosts(posts.documents.slice(0, postsPerPage))
                setCurrentPage(1)
            }
            setLoading(false)
        })
    }, [postsPerPage])

    const handleGetStarted = () => {
        navigate('/signup')
    }

    const handleLoadMore = () => {
        setLoadingMore(true)
        
        // Simulate loading delay for better UX
        setTimeout(() => {
            const nextPage = currentPage + 1
            const startIndex = 0
            const endIndex = nextPage * postsPerPage
            
            const newDisplayedPosts = allPosts.slice(startIndex, endIndex)
            setDisplayedPosts(newDisplayedPosts)
            setCurrentPage(nextPage)
            setLoadingMore(false)
        }, 800)
    }

    // Check if there are more posts to load
    const hasMorePosts = displayedPosts.length < allPosts.length

    // Enhanced loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                    <div className="absolute top-1/2 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
                </div>
                
                <Container>
                    <div className="py-20 relative z-10">
                        {/* Enhanced loading skeleton */}
                        <div className="text-center mb-16 animate-pulse">
                            <div className="h-14 bg-gradient-to-r from-gray-800/60 to-gray-700/60 rounded-2xl w-96 mx-auto mb-6 backdrop-blur-sm border border-gray-700/30 shadow-2xl"></div>
                            <div className="h-8 bg-gradient-to-r from-gray-800/60 to-gray-700/60 rounded-2xl w-64 mx-auto backdrop-blur-sm border border-gray-700/30 shadow-xl"></div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {[1,2,3,4].map((i) => (
                                <div key={i} className="animate-pulse group">
                                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/40 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:border-gray-600/50 relative overflow-hidden">
                                        {/* Shimmer effect */}
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                                        
                                        <div className="h-52 bg-gradient-to-br from-gray-700/50 to-gray-800/70 rounded-2xl mb-6 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
                                        </div>
                                        <div className="h-7 bg-gradient-to-r from-gray-700/60 to-gray-600/60 rounded-xl w-4/5 mb-3"></div>
                                        <div className="h-5 bg-gradient-to-r from-gray-700/60 to-gray-600/60 rounded-xl w-3/5"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
  
    // Enhanced empty state
    if (allPosts.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center relative overflow-hidden">
                {/* Enhanced background decorations */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
                    
                    {/* Floating particles */}
                    <div className="absolute top-1/3 left-1/6 w-2 h-2 bg-white/20 rounded-full animate-ping"></div>
                    <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                    <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-white/10 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
                </div>
                
                <Container>
                    <div className="text-center py-20 relative z-10">
                        {/* Enhanced hero illustration */}
                        <div className="relative mb-16">
                            <div className="mx-auto w-80 h-80 relative">
                                {/* Enhanced decorative circles with gradients */}
                                <div className="absolute top-0 left-0 w-full h-full">
                                    <div className="absolute top-4 left-4 w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full animate-pulse shadow-2xl border border-gray-600/50"></div>
                                    <div className="absolute top-12 right-8 w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full animate-pulse shadow-xl border border-gray-500/50" style={{animationDelay: '0.5s'}}></div>
                                    <div className="absolute bottom-16 left-8 w-6 h-6 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full animate-pulse shadow-lg border border-gray-700/50" style={{animationDelay: '1s'}}></div>
                                    <div className="absolute bottom-8 right-12 w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full animate-pulse shadow-2xl border border-gray-600/50" style={{animationDelay: '1.5s'}}></div>
                                </div>
                                
                                {/* Enhanced main illustration */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-40 h-40 bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-3xl shadow-2xl flex items-center justify-center border border-gray-700/50 backdrop-blur-xl relative overflow-hidden group hover:scale-105 transition-all duration-500">
                                        {/* Glow effect */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        
                                        <svg className="w-20 h-20 text-gray-300 relative z-10 group-hover:text-white transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced content */}
                        <div className="max-w-4xl mx-auto space-y-12">
                            <div className="space-y-6">
                                <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight tracking-tight">
                                    Welcome to Our Blog
                                </h1>
                                <p className="text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto font-light">
                                    Discover amazing stories, insights, and ideas. Login to unlock a world of engaging content and join our creative community.
                                </p>
                            </div>

                            {/* Enhanced single CTA Button */}
                            <div className="pt-8">
                                <button 
                                    onClick={handleGetStarted}
                                    className="group relative px-12 py-5 bg-gradient-to-r from-white to-gray-100 text-gray-900 font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 hover:-translate-y-2 text-lg overflow-hidden"
                                >
                                    {/* Button glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                                    
                                    <span className="relative z-10 flex items-center">
                                        Get Started
                                        <svg className="ml-3 w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                </button>
                            </div>

                            {/* Enhanced features grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-20">
                                <div className="group p-8 bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/40 hover:border-gray-600/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 relative overflow-hidden">
                                    {/* Card glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                                            <svg className="w-8 h-8 text-gray-300 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </div>
                                        <h3 className="font-bold text-white mb-3 text-xl">Create Posts</h3>
                                        <p className="text-gray-400 text-base leading-relaxed">Share your thoughts and stories with our vibrant community of writers and readers.</p>
                                    </div>
                                </div>

                                <div className="group p-8 bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/40 hover:border-gray-600/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                                            <svg className="w-8 h-8 text-gray-300 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="font-bold text-white mb-3 text-xl">Join Community</h3>
                                        <p className="text-gray-400 text-base leading-relaxed">Connect with like-minded writers and readers from around the world.</p>
                                    </div>
                                </div>

                                <div className="group p-8 bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/40 hover:border-gray-600/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                                            <svg className="w-8 h-8 text-gray-300 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <h3 className="font-bold text-white mb-3 text-xl">Get Inspired</h3>
                                        <p className="text-gray-400 text-base leading-relaxed">Discover amazing content that sparks creativity and ignites imagination.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    // Enhanced posts display
    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 relative overflow-hidden'>
            {/* Enhanced background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/8 to-indigo-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>
            
            <Container>
                <div className='py-20 relative z-10'>
                    {/* Enhanced header section */}
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-xl text-gray-300 rounded-full text-base font-semibold mb-10 border border-gray-700/40 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                            <span className="w-3 h-3 bg-gradient-to-r from-white to-gray-300 rounded-full mr-4 animate-pulse shadow-lg"></span>
                            Latest Posts
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-8 leading-tight tracking-tight">
                            Discover Amazing Stories
                        </h1>
                        <p className="text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
                            Explore our collection of insightful articles, creative stories, and thought-provoking content crafted by our community.
                        </p>
                    </div>

                    {/* Enhanced posts grid */}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
                        {displayedPosts.map((post, index) => (
                            <div 
                                key={post.$id} 
                                className='transform transition-all duration-700 hover:scale-105 hover:-translate-y-3 relative group'
                                style={{
                                    animationDelay: `${index * 150}ms`,
                                    animation: 'fadeInUp 0.8s ease-out forwards'
                                }}
                            >
                                {/* Card glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>

                    {/* Enhanced load more section */}
                    {hasMorePosts && (
                        <div className="text-center mt-20">
                            <button 
                                onClick={handleLoadMore}
                                disabled={loadingMore}
                                className="group relative px-12 py-5 bg-gradient-to-r from-white to-gray-100 text-gray-900 font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 hover:-translate-y-2 text-lg overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                                
                                <span className="relative z-10 flex items-center">
                                    {loadingMore ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Loading More...
                                        </>
                                    ) : (
                                        <>
                                            Load More Posts
                                            <svg className="ml-3 w-6 h-6 transform group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                        </>
                                    )}
                                </span>
                            </button>
                            
                            {/* Posts counter */}
                            <div className="mt-6 text-gray-400 text-sm">
                                Showing {displayedPosts.length} of {allPosts.length} posts
                            </div>
                        </div>
                    )}
                </div>
            </Container>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes shimmer {
                    100% {
                        transform: translateX(100%);
                    }
                }
                
                .shadow-3xl {
                    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
                }
            `}</style>
        </div>
    )
}

export default Home
