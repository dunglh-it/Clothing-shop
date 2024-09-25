import { Link } from 'react-router-dom'
import NavHeader from '../NavHeader'
import useSearchProducts from 'src/hooks/useSearchProducts'
import logoLight from 'src/assets/images/logo-light.png'

export default function CartHeader() {
  const { onSubmitSearch, register } = useSearchProducts()
  return (
    <div className='border-b border-b-black/10'>
      <div className='bg-lightBlue text-white'>
        <div className='container'>
          <NavHeader />
        </div>
      </div>

      <div className='bg-white py-6 shadow-sm'>
        <div className='container'>
          <nav className='md:flex md:items-center md:justify-between'>
            <Link to='/'>
              <img src={logoLight} alt='Logo' className='h-[28.29px] w-[168px] object-cover' />
            </Link>

            <form className='mt-3 md:mt-0 md:w-[50%]' onSubmit={onSubmitSearch}>
              <div className='flex rounded-sm border-2 border-lightBlue'>
                <input
                  type='text'
                  className='w-full flex-grow border-none bg-transparent px-3 py-1 text-black outline-none'
                  placeholder='Tìm kiếm sản phẩm'
                  {...register('name')}
                />
                <button className='flex-shrink-0 bg-lightBlue px-8 py-2 hover:opacity-90'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5 stroke-white'
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
          </nav>
        </div>
      </div>
    </div>
  )
}
