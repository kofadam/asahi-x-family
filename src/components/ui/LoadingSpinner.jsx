import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-yellow-300/30 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-yellow-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-white/80">Loading cultural insights...</p>
    </div>
  )
}

export default LoadingSpinner