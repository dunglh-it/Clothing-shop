import { Link } from 'react-router-dom'
import NavHeader from '../NavHeader'
import useSearchProducts from 'src/hooks/useSearchProducts'
import logoLight from 'src/assets/images/logo-light.png'
import logoDark from 'src/assets/images/logo-dark.png'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

export default function CartHeader() {
  const { t } = useTranslation(['header'])

  const [isDarkMode, setIsDarkMode] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const getBodyMode = () => {
      return document.body.classList.contains('dark') ? 'dark' : 'light'
    }

    setIsDarkMode(getBodyMode())

    const observer = new MutationObserver(() => {
      setIsDarkMode(getBodyMode())
    })

    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  const { onSubmitSearch, register } = useSearchProducts()
  return (
    <div className='border-b border-b-black/10 dark:border-b-blackPrimary'>
      <div className='bg-lightBlue pb-2 text-white dark:bg-blackSecond'>
        <div className='container'>
          <NavHeader />
        </div>
      </div>

      <div className='bg-white py-6 shadow-sm dark:bg-blackPrimary'>
        <div className='container'>
          <nav className='md:flex md:items-center md:justify-between'>
            <Link to='/'>
              {isDarkMode === 'dark' ? (
                <img src={logoDark} alt='Logo Dark' className='h-[28.29px] w-[168px] object-cover' />
              ) : (
                <img src={logoLight} alt='Logo Light' className='h-[28.29px] w-[168px] object-cover' />
              )}
            </Link>

            <form className='mt-3 md:mt-0 md:w-[50%]' onSubmit={onSubmitSearch}>
              <div className='flex rounded-sm border-2 border-lightBlue'>
                <input
                  type='text'
                  className='w-full flex-grow border-none bg-transparent px-3 py-1 text-black outline-none dark:bg-blackSecond'
                  placeholder={t('search for products')}
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
