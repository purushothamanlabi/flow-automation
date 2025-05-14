import React from 'react'

interface LoadingProps {
  bgColor?: string;
  spinnerColor?: string;
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({ 
  bgColor = "bg-purple-100", 
  spinnerColor = "border-purple-700", 
  text = "Loading..." 
}) => {
  return (
    <div className={`fixed inset-0 ${bgColor} flex items-center justify-center z-50`}>
      <div className="text-center">
        <div className={`inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${spinnerColor} mb-3`}></div>
        <p className="text-purple-700 font-medium">{text}</p>
      </div>
    </div>
  )
}

export default Loading