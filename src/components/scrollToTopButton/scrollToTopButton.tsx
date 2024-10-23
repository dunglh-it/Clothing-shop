import { useEffect, useState } from 'react'

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  // Hàm để theo dõi khi cuộn trang
  const toggleVisibility = () => {
    if (window.pageYOffset > 200) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Hàm để cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Cuộn mượt mà
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <div>
      {isVisible && (
        <button
          className='fixed bottom-10 right-5 z-50 cursor-pointer scroll-smooth rounded-full border-none bg-white p-2 text-lightBlue shadow-md outline-none transition-all hover:bg-lightBlue hover:text-white dark:bg-blackPrimary dark:text-white md:right-10 lg:p-3'
          onClick={scrollToTop}
        >
          {/* Icon mũi tên đi lên */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2}
            stroke='currentColor'
            className='h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M19 14l-7-7-7 7' />
          </svg>
        </button>
      )}
    </div>
  )
}
