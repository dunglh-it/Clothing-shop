import { useEffect, useState } from 'react'
import Slide1 from 'src/assets/images/slide-1.jpg'
import Slide2 from 'src/assets/images/slide-2.jpg'
import Slide3 from 'src/assets/images/slide-3.jpg'

const slides = [
  {
    id: 1,
    image: Slide1,
    alt: 'Slide 1'
  },

  {
    id: 2,
    image: Slide2,
    alt: 'Slide 2'
  },

  {
    id: 3,
    image: Slide3,
    alt: 'Slide 3'
  }
]

export default function Slide() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [currentIndex])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1))
  }

  return (
    <div className='relative m-auto w-full overflow-hidden rounded-lg shadow-md'>
      <div
        className='flex transition-transform duration-500'
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <img key={slide.id} src={slide.image} alt={slide.alt} className='h-72 w-full object-cover' />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className='absolute left-0 top-1/2 ml-2 -translate-y-1/2 transform rounded-full bg-white/30 p-3 text-black/60 hover:bg-lightBlue hover:text-white'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className='absolute right-0 top-1/2 mr-2 -translate-y-1/2 transform rounded-full bg-white/30 p-3 text-black/60 hover:bg-lightBlue hover:text-white'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
        </svg>
      </button>

      <div className='absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2'>
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full ${index === currentIndex ? 'bg-lightBlue' : 'bg-gray-400'}`}
          ></div>
        ))}
      </div>
    </div>
  )
}
