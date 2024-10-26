import { useState, useEffect } from 'react'

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    // Xử lý sự kiện khi cuộn trang
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }

    // Gán sự kiện khi cuộn
    window.addEventListener('scroll', handleScroll)

    // Xóa sự kiện khi component bị hủy
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hàm xử lý khi nhấn nút
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Tạo hiệu ứng cuộn mượt
    })
  }

  return (
    <>
      {showButton && (
        <button
          className='fixed bottom-3 right-2 cursor-pointer rounded-full border-none bg-white p-3 text-lightBlue shadow-md transition-all duration-200 hover:bg-lightBlue hover:text-white dark:bg-blackPrimary dark:text-white dark:hover:bg-white dark:hover:text-lightBlue md:bottom-4 md:right-4 lg:bottom-5 lg:right-5 '
          onClick={scrollToTop}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='m4.5 15.75 7.5-7.5 7.5 7.5' />
          </svg>
        </button>
      )}
    </>
  )
}

export default ScrollToTopButton
