import React, {useId} from 'react'

function Select({
    options,
    label,
    className = "",
    error = "",
    required = false,
    placeholder = "Select an option...",
    ...props
}, ref) {
    const id = useId()
    
    return (
        <div className='w-full'>
            {label && (
                <label 
                    htmlFor={id} 
                    className='inline-block mb-3 text-sm font-medium text-gray-300
                             transition-colors duration-200'
                >
                    {label}
                    {required && <span className="text-red-400 ml-1">*</span>}
                </label>
            )}
            
            <div className="relative group">
                <select
                    {...props}
                    id={id}
                    ref={ref}
                    className={`
                        w-full px-4 py-3 rounded-lg appearance-none
                        bg-gray-900/50 backdrop-blur-sm
                        text-gray-100
                        border border-gray-700/50
                        transition-all duration-300 ease-out
                        focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-900
                        focus:border-blue-500/50 focus:bg-gray-800/50
                        hover:border-gray-600/50 hover:bg-gray-800/30
                        disabled:opacity-50 disabled:cursor-not-allowed
                        cursor-pointer
                        ${error ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' : ''}
                        ${className}
                    `}
                >
                    <option value="" disabled className="bg-gray-800 text-gray-400">
                        {placeholder}
                    </option>
                    {options?.map((option) => (
                        <option 
                            key={option} 
                            value={option}
                            className="bg-gray-800 text-gray-100 py-2 hover:bg-gray-700"
                        >
                            {option}
                        </option>
                    ))}
                </select>
                
                {/* Custom dropdown arrow */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg 
                        className="w-5 h-5 text-gray-400 group-hover:text-gray-300 
                                 group-focus-within:text-blue-400 transition-all duration-200
                                 group-focus-within:rotate-180" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                
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
}

export default React.forwardRef(Select)