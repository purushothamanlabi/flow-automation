import IMAGE from './../../assets/4886419.jpg'
import { useNavigate } from 'react-router-dom'
import { Routes as AppRoutes } from './../../util/Routes'
import { useState } from 'react'
import Loading from '../../components/Loading'
import React from 'react'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [imageLoaded, setImageLoaded] = useState(false)

  // Handle image load
  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <section className="bg-white text-black w-full h-full">
      {/* Loading overlay that shows until image is loaded */}
      {!imageLoaded && <Loading />}

      <div className={`flex flex-col md:flex-row h-screen bg-white transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Left section - Purple background with illustration (hidden on mobile) */}
        <div className="hidden md:flex w-full md:w-1/2 bg-purple-400 items-center justify-center md:h-full overflow-hidden">
          <img 
            src={IMAGE} 
            alt="Customer service illustration" 
            className="w-full h-full object-cover"
            onLoad={handleImageLoad}
          />
        </div>
        
        {/* Right section - Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 sm:px-8 md:px-10 lg:px-16 py-8 md:py-0 bg-white overflow-y-auto">
          <div className="mb-6 md:mb-8 bg-white w-full max-w-[400px]">
            <div className="flex items-center bg-white">
              <div className="h-6 w-6 bg-purple-700 rounded"></div>
              <div className="h-6 w-6 bg-purple-400 rounded ml-1"></div>
              <span className="ml-2 text-xl font-bold text-black bg-white">Reptix.ai</span>
            </div>
          </div>
          
          <div className="w-full max-w-[400px]">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 text-black bg-white">Sign in</h1>
            <p className="text-gray-500 mb-4 sm:mb-6 bg-white">Please enter your credentials</p>
            
            <div className="mb-3 bg-white">
              <label className="block mb-1 text-black bg-white text-sm">Email address</label>
              <input 
                type="email" 
                className="w-full min-w-[200px] sm:min-w-[250px] max-w-[400px] p-2 border border-gray-300 rounded bg-white text-black"
                placeholder="Enter your email"
              />
            </div>
            
            <div className="mb-4 bg-white">
              <label className="block mb-1 text-black bg-white text-sm">Password</label>
              <input 
                type="password" 
                className="w-full min-w-[200px] sm:min-w-[250px] max-w-[400px] p-2 border border-gray-300 rounded bg-white text-black"
                placeholder="Enter your password"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-5 bg-white space-y-2 sm:space-y-0">
              <div className="flex items-center bg-white">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="mr-2 h-4 w-4 bg-white"
                />
                <label htmlFor="remember" className="text-gray-600 text-xs sm:text-sm bg-white">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-purple-700 text-xs sm:text-sm bg-white">Forgot password?</a>
            </div>
            
            <button className="w-full min-w-[200px] sm:min-w-[250px] max-w-[400px] bg-purple-700 text-white py-2 rounded mb-3 text-sm font-medium">
              Sign in
            </button>
            
            <button className="w-full min-w-[200px] sm:min-w-[250px] max-w-[400px] border border-gray-300 py-2 rounded flex items-center justify-center bg-white text-black text-sm">
              <svg className="h-5 w-5 mr-2" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
              Sign in with Google
            </button>
            
            <p className="text-center mt-4 sm:mt-5 text-gray-600 bg-white text-sm">
              Don't have an account? <a onClick={() => navigate(AppRoutes.Register)} className="text-purple-700 font-medium bg-white cursor-pointer">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login