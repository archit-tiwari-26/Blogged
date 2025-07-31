import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate("/");
                }
                setLoading(false);
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            appwriteService.deletePost(post.$id).then((status) => {
                if (status) {
                    appwriteService.deleteFile(post.featuredImage);
                    navigate("/");
                }
            });
        }
    };

    // Enhanced loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>

                <Container>
                    <div className="py-20 relative z-10">
                        {/* Navigation skeleton */}
                        <div className="mb-8 animate-pulse">
                            <div className="flex items-center space-x-2">
                                <div className="w-5 h-5 bg-gray-800/60 rounded"></div>
                                <div className="h-4 bg-gray-800/60 rounded w-32"></div>
                            </div>
                        </div>

                        {/* Hero image skeleton */}
                        <div className="relative mb-16 animate-pulse">
                            <div className="h-[60vh] bg-gradient-to-br from-gray-800/40 to-gray-900/60 rounded-3xl border border-gray-700/40 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                                <div className="absolute bottom-8 left-8 right-8">
                                    <div className="h-12 bg-gray-700/60 rounded-xl mb-4"></div>
                                    <div className="h-6 bg-gray-700/60 rounded-lg w-1/3"></div>
                                </div>
                            </div>
                        </div>

                        {/* Content skeleton */}
                        <div className="max-w-4xl mx-auto animate-pulse">
                            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/40 rounded-3xl p-12 border border-gray-700/40">
                                <div className="space-y-4">
                                    {[1,2,3,4,5,6].map((i) => (
                                        <div key={i} className="h-6 bg-gray-700/50 rounded-lg" style={{width: `${Math.random() * 40 + 60}%`}}></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return post ? (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 relative overflow-hidden">
            {/* Enhanced background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/8 to-purple-500/8 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-gradient-to-br from-purple-500/8 to-indigo-500/8 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 rounded-full blur-2xl"></div>
            </div>

            <Container>
                <div className="py-20 relative z-10">
                    {/* Enhanced Navigation */}
                    <nav className="mb-12">
                        <Link 
                            to="/all-posts"
                            className="group inline-flex items-center space-x-3 text-gray-400 hover:text-white transition-all duration-300 hover:-translate-x-1"
                        >
                            <div className="p-2 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 group-hover:border-gray-600/50 transition-all duration-300">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </div>
                            <span className="font-medium">Back to All Posts</span>
                        </Link>
                    </nav>

                    {/* Hero Section with Featured Image */}
                    <div className="relative mb-20">
                        <div className="relative h-[60vh] rounded-3xl overflow-hidden shadow-2xl group">
                            {/* Featured Image */}
                            <img
                                src={appwriteService.getFileView(post.featuredImage)}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            
                            {/* Enhanced gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            
                            {/* Content overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                                <div className="max-w-4xl">
                                    {/* Category badge */}
                                    <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6 border border-white/20">
                                        <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                                        Article
                                    </div>
                                    
                                    {/* Title */}
                                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                                        {post.title}
                                    </h1>
                                    
                                    {/* Meta information */}
                                    <div className="flex flex-wrap items-center gap-6 text-gray-300">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                                <span className="text-white font-bold">
                                                    {userData?.name?.charAt(0) || 'A'}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-white">
                                                    {userData?.name || 'Anonymous'}
                                                </p>
                                                <p className="text-sm text-gray-300">Author</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                            </svg>
                                            <span>
                                                {new Date(post.$createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Author Actions - Better positioned */}
                            {isAuthor && (
                                <div className="absolute top-8 right-8">
                                    <div className="flex space-x-3">
                                        <Link to={`/edit-post/${post.$id}`}>
                                            <button className="group relative px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-medium border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                <span className="relative z-10 flex items-center">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    Edit
                                                </span>
                                            </button>
                                        </Link>
                                        
                                        <button 
                                            onClick={deletePost}
                                            className="group relative px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-medium border border-white/20 hover:bg-red-500/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-rose-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <span className="relative z-10 flex items-center">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Delete
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Enhanced Article Content */}
                    <article className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-700/40 shadow-2xl overflow-hidden">
                            <div className="p-8 md:p-12 lg:p-16">
                                {/* Content with enhanced typography */}
                                <div className="prose prose-lg prose-invert max-w-none">
                                    <div className="text-gray-300 leading-relaxed text-lg space-y-6 [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-white [&>h1]:mb-6 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-gray-100 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-medium [&>h3]:text-gray-200 [&>h3]:mb-3 [&>p]:mb-6 [&>p]:leading-relaxed [&>ul]:mb-6 [&>ol]:mb-6 [&>li]:mb-2 [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-gray-400 [&>blockquote]:bg-gray-800/30 [&>blockquote]:rounded-r-lg [&>blockquote]:py-4 [&>code]:bg-gray-800 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-blue-300">
                                        {parse(post.content)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Enhanced Footer */}
                        <footer className="mt-20 pt-8 border-t border-gray-700/50">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">
                                            {userData?.name?.charAt(0) || 'A'}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold">
                                            {userData?.name || 'Anonymous'}
                                        </p>
                                        <p className="text-gray-400 text-sm">
                                            Published on {new Date(post.$createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex space-x-4">
                                    <Link 
                                        to="/"
                                        className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-xl font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                                    >
                                        Home
                                    </Link>
                                    <Link 
                                        to="/all-posts"
                                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                                    >
                                        More Posts
                                    </Link>
                                </div>
                            </div>
                        </footer>
                    </article>
                </div>
            </Container>
        </div>
    ) : null;
}
