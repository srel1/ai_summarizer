import React from 'react'
import {logo} from '../assets'

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
        <nav className='flex justify-between items-center w-full pt-3 mb-10'>
            <img src={logo} alt='sumz_logo'  className=''/>
            <button 
                type='button' 
                className='rounded-full border-black bg-orange-400 text-white py-1.5 px-5 hover:bg-black hover:text-white'
                onClick={() => window.open('https://github.com/')}
            >
            Github
            </button>
        </nav>

        <h1 className='font-extrabold text-center text-5xl sm:text-6xl mt-5 leading-[1.15]'>
            Summarize articles with <br className='max-md:hidden'/>
            <span className='bg-gradient-to-r from-amber-500 via-orange-600 to bg-yellow-500 bg-clip-text text-transparent'>OpenAI GPT-4</span>
        </h1>
        <h2 className='mt-5 text-lg text-gray-600 sm:text-xl text-center max-w-2xl'>
            Simply your reading with Summize, and open-source article
            summarizer that transforms lengthy articles into clear and concise summaries
        </h2>

    </header>
  )
}

export default Hero