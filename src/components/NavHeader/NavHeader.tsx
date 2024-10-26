import { useContext, useEffect, useState } from 'react'
import Popover from '../Popover'
import { AppContext } from 'src/contexts/app.context'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi } from 'src/apis/auth.api'
import { purchaseStatus } from 'src/constants/purchase'
import flagVietNam from 'src/assets/images/flag-vietnam.png'
import flagEnglish from 'src/assets/images/flag-english.png'
import { getAvatarUrl } from 'src/utils/utils'
import { useTranslation } from 'react-i18next'
import { locales } from 'src/i18n/i18n'
// import './style.css'

export default function NavHeader() {
  const { i18n, t } = useTranslation(['account'])
  const currentLanguage = locales[i18n.language as keyof typeof locales]

  const [isDarkMode, setIsDarkMode] = useState(false)

  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  const queryClient = useQueryClient()

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({
        queryKey: [
          'purchases',
          {
            status: purchaseStatus.inCart
          }
        ]
      })
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  const changeLanguage = (lng: 'en' | 'vi') => {
    i18n.changeLanguage(lng)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    if (isDarkMode) {
      document.body.classList.remove('dark')
      document.body.classList.add('light')
    } else {
      document.body.classList.remove('light')
      document.body.classList.add('dark')
    }
  }

  return (
    <div className='flex justify-end pt-3'>
      <div className='flex cursor-pointer items-center hover:opacity-75'>
        <button
          className='rounded-full border bg-white px-2 py-2 text-black shadow-sm hover:border hover:border-white hover:bg-lightBlue hover:text-white focus:bg-white dark:bg-black/50 dark:text-white dark:focus:bg-black/50'
          onClick={toggleTheme}
          title={isDarkMode ? `${t('dark')} ` : `${t('light')}`}
        >
          {isDarkMode ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-4 w-4 md:h-5 md:w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-4 w-4 md:h-5 md:w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
              />
            </svg>
          )}{' '}
        </button>
      </div>

      <Popover
        className='ml-4 flex cursor-pointer items-center py-1 hover:opacity-75'
        renderPopover={
          <div className='relative rounded-sm border border-gray-200 bg-white shadow-md dark:border-blackSecond dark:bg-blackSecond'>
            <div className='flex flex-col'>
              <button
                className='flex items-center px-3 py-2 text-[10px] hover:bg-slate-100 hover:text-lightBlue dark:text-white dark:hover:bg-blackSecond dark:hover:text-lightBlue md:text-[16px]'
                onClick={() => changeLanguage('vi')}
              >
                <img src={flagVietNam} alt='Viet Nam' className='mr-2 h-4 w-4 object-cover md:h-5 md:w-5' />
                <span>Tiếng Việt</span>
              </button>

              <button
                className='flex items-center px-3 py-2 pt-2 text-[10px] hover:bg-slate-100 hover:text-lightBlue dark:text-white dark:hover:bg-blackSecond dark:hover:text-lightBlue md:text-[16px]'
                onClick={() => changeLanguage('en')}
              >
                <img src={flagEnglish} alt='English' className='mr-2 h-4 w-4 object-cover md:h-5 md:w-5' />
                <span>English</span>
              </button>
            </div>
          </div>
        }
      >
        {currentLanguage === 'Tiếng Việt' ? (
          <img src={flagVietNam} alt='Viet Nam' className='h-4 w-4 object-cover md:h-5 md:w-5' />
        ) : (
          <img src={flagEnglish} alt='Viet Nam' className='h-4 w-4 object-cover md:h-5 md:w-5' />
        )}
        <span className='mx-1 text-[10px] dark:text-white md:text-[16px]'>{currentLanguage}</span>

        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-3 w-3 dark:text-white md:h-4 md:w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
        </svg>
      </Popover>

      {isAuthenticated && (
        <Popover
          className='ml-6 flex cursor-pointer items-center py-1 hover:opacity-75'
          renderPopover={
            <div className='relative rounded-sm border border-gray-200 bg-white shadow-md dark:border-blackSecond dark:bg-blackSecond'>
              <Link
                to={path.profile}
                className='block w-full bg-white px-4 py-3 text-left text-[10px] capitalize hover:bg-slate-100 hover:text-lightBlue dark:bg-blackSecond dark:text-white dark:hover:text-lightBlue md:text-[16px]'
              >
                {t('account:login.my account')}
              </Link>
              <Link
                to={path.historyPurchase}
                className='block w-full bg-white px-4 py-3 text-left text-[10px] capitalize hover:bg-slate-100 hover:text-lightBlue dark:bg-blackSecond dark:text-white dark:hover:text-lightBlue md:text-[16px]'
              >
                {t('account:login.my purchase')}
              </Link>
              <button
                onClick={handleLogout}
                className='block w-full bg-white px-4 py-3 text-left text-[10px] capitalize hover:bg-slate-100 hover:text-lightBlue dark:bg-blackSecond dark:text-white dark:hover:text-lightBlue md:text-[16px]'
              >
                {t('account:login.logout')}
              </button>
            </div>
          }
        >
          <div className='mr-2 h-5 w-5 flex-shrink-0 md:h-6 md:w-6'>
            <img src={getAvatarUrl(profile?.avatar)} alt='avatar' className='h-full w-full rounded-full object-cover' />
          </div>

          <div className='text-[10px] dark:text-white md:text-[16px]'>{profile?.email}</div>
        </Popover>
      )}

      {!isAuthenticated && (
        <div className='flex items-center'>
          <Link
            to={path.register}
            className='mx-3 text-[10px] capitalize hover:text-lightBlue/70 dark:text-white md:text-[16px]'
          >
            {t('sign up')}
          </Link>
          <div className='h-4 border-r-[1px] border-r-lightBlue/50' />
          <Link
            to={path.login}
            className='mx-3 text-[10px] capitalize hover:text-lightBlue/70 dark:text-white md:text-[16px]'
          >
            {t('sign in')}
          </Link>
        </div>
      )}
    </div>
  )
}
