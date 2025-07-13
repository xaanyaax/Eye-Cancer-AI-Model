import React from 'react'

function Navbar() {
  return (
    
      <div className="bg-blue-50 px-6 py-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center">
            <a href="#">
              <img
                src="https://i.ibb.co/zWxnNsb5/image.png"
                alt="image"
                border="0"
                className="w-20 h-20 rounded-lg object-cover shadow-sm"
              />
            </a>

            <div className="ml-4 flex flex-col items-center justify-center px-73">
              <h1 className="text-2xl font-bold text-blue-900 ">
                Eye Cancer Detection Center
              </h1>
              <p className="text-blue-700 text-sm">
                Advanced Diagnostic Service
              </p>
            </div>
          </div>
          <img
            src="https://i.ibb.co/ksLCzDFX/image.png"
            alt="image"
            border="0"
            className="w-20 h-20 rounded-lg object-cover shadow-sm"
          />
        </div>
      </div> 
   
  )
}

export default Navbar