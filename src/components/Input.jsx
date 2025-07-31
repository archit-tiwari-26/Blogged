import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    error = "",
    required = false,
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && (
                <label 
                    className='inline-block mb-3 text-sm font-medium text-gray-300
                             transition-colors duration-200' 
                    htmlFor={id}
                >
                    {label}
                    {required && <span className="text-red-400 ml-1">*</span>}
                </label>
            )}
            
            <div className="relative group">
                <input
                    type={type}
                    className={`
                        w-full px-4 py-3 rounded-lg
                        bg-gray-900/50 backdrop-blur-sm
                        text-gray-100 placeholder-gray-500
                        border border-gray-700/50
                        transition-all duration-300 ease-out
                        focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-900
                        focus:border-blue-500/50 focus:bg-gray-800/50
                        hover:border-gray-600/50 hover:bg-gray-800/30
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${error ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' : ''}
                        ${className}
                    `}
                    ref={ref}
                    {...props}
                    id={id}
                />
                
                {/* Subtle glow effect on focus */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-focus-within:opacity-100 
                              transition-opacity duration-300 pointer-events-none
                              bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
            </div>
            
            {/* Error message */}
            {error && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1 animate-in slide-in-from-left-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    )
})

export default Input