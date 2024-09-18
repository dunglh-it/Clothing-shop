import { Link } from 'react-router-dom'
import flagVietnam from 'src/assets/images/flag-vietnam.png'
import logoLight from 'src/assets/images/logo-light.png'

export default function Header() {
  return (
    <div className='bg-gray-100'>
      <div className='container'>
        <div className='flex justify-end'>
          <div className='flex cursor-pointer items-center hover:opacity-75'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-5 w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z'
              />
            </svg>

            <span className='mx-1'>Giao diện: Sáng</span>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-5 w-5'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
            </svg>
          </div>

          <div className='ml-4 flex cursor-pointer items-center py-1 hover:opacity-75'>
            <img src={flagVietnam} alt='Viet Nam' className='h-5 w-5 object-cover' />
            <span className='mx-1'>Tiếng Việt</span>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-5 w-5'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
            </svg>
          </div>

          <div className='ml-6 flex cursor-pointer items-center py-1 hover:opacity-75'>
            <div className='mr-2 h-6 w-6 flex-shrink-0'>
              <img
                src='https://cf.shopee.vn/file/d04ea22afab6e6d250a370d7ccc2e675_tn'
                alt='avatar'
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            <div>Duy Nghia</div>
          </div>
        </div>

        <div className='mt-4 grid grid-cols-12 items-center gap-12 pb-6'>
          <Link to='/' className='col-span-2'>
            <img src={logoLight} alt='Logo' className='h-full w-full object-cover' />
          </Link>

          <form className='col-span-9'>
            <div className='flex rounded-sm bg-white p-1'>
              <input
                type='text'
                name='search'
                className='flex-grow border-none bg-transparent px-3 py-2 text-black outline-none'
                placeholder='Tìm kiếm sản phẩm'
              />

              <button className='flex-shrink-0 rounded-sm bg-lightBlue px-6 py-2 hover:opacity-90'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='white'
                  className='h-6 w-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
                </svg>
              </button>
            </div>
          </form>

          <div className='col-span-1'>
            <Link to='/'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-7 w-7'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
