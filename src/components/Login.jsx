import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: { errors }} = useForm()
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const login = async(data) => {
        setError("")
        setIsLoading(true)
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center px-4 py-12 bg-gray-950 relative overflow-hidden'>
            {/* Background decorative elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Login Card */}
                <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-800/50 
                              shadow-2xl shadow-black/20 hover:shadow-black/30 transition-shadow duration-300">
                    
                    {/* Logo Section */}
                    <div className="mb-8 flex justify-center">
                        <div className="inline-block w-full max-w-[100px] group">
                            <div className="transform transition-transform duration-300 group-hover:scale-105">
                                <Logo width="100%" />
                            </div>
                        </div>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Welcome Back
                        </h2>
                        <p className="text-gray-400">
                            Sign in to your account to continue
                        </p>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center mb-6">
                        <p className="text-gray-400">
                            Don't have an account?{' '}
                            <Link
                                to="/signup"
                                className="text-blue-400 hover:text-blue-300 font-medium 
                                         transition-colors duration-200 relative group"
                            >
                                Sign Up
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r 
                                               from-blue-400 to-purple-400 group-hover:w-full 
                                               transition-all duration-300" />
                            </Link>
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg 
                                      backdrop-blur-sm animate-in slide-in-from-top-2">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <p className="text-red-400 text-sm font-medium">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit(login)} className="space-y-6">
                        <Input
                            label="Email Address"
                            placeholder="Enter your email"
                            type="email"
                            error={errors.email?.message}
                            required
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPattern: (value) => 
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Please enter a valid email address",
                                }
                            })}
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            error={errors.password?.message}
                            required
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                        />

                        <Button
                            type="submit"
                            className="w-full py-3 text-base font-semibold"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    Signing In...
                                </div>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>

                    {/* Additional Options */}
                    <div className="mt-6 pt-6 border-t border-gray-800/50">
                        <div className="text-center">
                            <Link
                                to="/"
                                className="text-gray-400 hover:text-gray-300 text-sm 
                                         transition-colors duration-200"
                            >
                                ← Back to Home
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom decorative text */}
                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        Secure login powered by modern encryption
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login