import { Wave } from 'lucide-react'

const HeroSection = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
      {/* Left side - Illustration */}
      <div className="w-full md:w-1/2 flex justify-center relative">
        <div className="relative w-64 h-64">
          {/* Person */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 bg-gray-200 rounded-full" /> {/* Head */}
            <div className="absolute top-24 w-32 h-40 bg-gray-300 rounded-t-full" /> {/* Body */}
            {/* Waving arm - animated */}
            <div className="absolute top-24 right-12 origin-bottom-left animate-[wave_2s_ease-in-out_infinite]">
              <div className="w-8 h-24 bg-gray-300 rounded-full transform rotate-12" />
            </div>
          </div>
          {/* Desk */}
          <div className="absolute bottom-0 w-full h-4 bg-gray-400" />
          {/* Laptop */}
          <div className="absolute bottom-4 right-12 w-24 h-16 bg-gray-600 rounded" />
          {/* Plant */}
          <div className="absolute bottom-4 left-12">
            <div className="w-8 h-8 bg-emerald-400 rounded-full" />
            <div className="w-6 h-2 bg-gray-600 rounded-full mx-auto" />
          </div>
        </div>
      </div>

      {/* Right side - Text content */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-2xl font-semibold text-emerald-600 mb-2">
          HELLO!
        </h2>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 relative">
          I'm Eric Nguyen
          <span className="absolute -bottom-2 left-0 w-48 h-3 bg-yellow-300 opacity-50 -z-10" />
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Cloud Engineer & System Administrator
        </p>
        <a 
          href="#contact" 
          className="inline-flex items-center px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-full font-medium transition-colors"
        >
          Get In Touch
          <Wave className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  )
}

export default HeroSection