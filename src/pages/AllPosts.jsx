import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredPosts, setFilteredPosts] = useState([])

    useEffect(() => {  
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
                setFilteredPosts(posts.documents)
            }
            setLoading(false)
        })
    }, [])

    // Filter posts based on search term
    useEffect(() => {
        if (searchTerm) {
            const filtered = posts.filter(post => 
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.content.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setFilteredPosts(filtered)
        } else {
            setFilteredPosts(posts)
        }
    }, [searchTerm, posts])

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-16">
                <Container>
                    <div className="max-w-7xl mx-auto">
                        {/* Header Skeleton */}
                        <div className="text-center mb-16">
                            <div className="bg-slate-800/50 rounded-lg h-12 w-64 mx-auto mb-4 animate-pulse"></div>
                            <div className="bg-slate-800/50 rounded-lg h-6 w-96 mx-auto mb-8 animate-pulse"></div>
                            <div className="bg-slate-800/50 rounded-lg h-12 w-80 mx-auto animate-pulse"></div>
                        </div>
                        
                        {/* Grid Skeleton */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, index) => (
                                <div key={index} className="bg-slate-800/50 rounded-2xl h-80 animate-pulse"></div>
                            ))}
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
  
    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-16'>
            <Container>
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4">
                            Blogged
                        </h1>
                        <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                            Explore insights, ideas, and experiences from our community of writers and creators.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-md mx-auto relative">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search posts..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-6 py-4 pl-12 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                                />
                                <svg 
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Stats Bar */}
                    <div className="flex items-center justify-between mb-12 p-6 bg-gradient-to-r from-slate-900/50 to-slate-800/30 border border-slate-700/50 rounded-xl">
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-slate-300 font-medium">
                                    {filteredPosts.length} {filteredPosts.length === 1 ? 'Post' : 'Posts'}
                                </span>
                            </div>
                            {searchTerm && (
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <span className="text-slate-400 text-sm">
                                        Searching for "{searchTerm}"
                                    </span>
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="text-blue-400 hover:text-blue-300 text-sm underline transition-colors duration-300"
                                    >
                                        Clear
                                    </button>
                                </div>
                            )}
                        </div>
                        
                        <div className="text-slate-400 text-sm">
                            Updated {new Date().toLocaleDateString()}
                        </div>
                    </div>

                    {/* Posts Grid */}
                    {filteredPosts.length > 0 ? (
                        <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                            {filteredPosts.map((post) => (
                                <div key={post.$id} className='group'>
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="text-center py-20">
                            <div className="max-w-md mx-auto">
                                <div className="w-20 h-20 bg-gradient-to-br from-slate-800 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {searchTerm ? 'No posts found' : 'No posts yet'}
                                </h3>
                                <p className="text-slate-400 mb-6">
                                    {searchTerm 
                                        ? `We couldn't find any posts matching "${searchTerm}". Try adjusting your search terms.`
                                        : 'Be the first to share your story with the community.'
                                    }
                                </p>
                                {searchTerm ? (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5"
                                    >
                                        Clear Search
                                    </button>
                                ) : (
                                    <a
                                        href="/add-post"
                                        className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5"
                                    >
                                        Create Your First Post
                                    </a>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Load More Section (Future Enhancement) */}
                    {filteredPosts.length > 0 && filteredPosts.length >= 12 && (
                        <div className="text-center mt-16">
                            <button className="px-8 py-4 border border-slate-700 text-slate-300 rounded-xl font-medium hover:bg-slate-800/50 hover:border-slate-600 transition-all duration-300">
                                Load More Posts
                            </button>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts