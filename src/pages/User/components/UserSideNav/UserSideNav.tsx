import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { getAvatarUrl } from 'src/utils/utils'

export default function UserSideNav() {
  const { t } = useTranslation(['profile'])

  const { profile } = useContext(AppContext)

  return (
    <div>
      <div className='flex items-center border-b border-b-gray-200 py-4 dark:border-b-gray-400'>
        <Link
          to={path.profile}
          className='h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-black/10 md:h-11 md:w-11 lg:h-12 lg:w-12'
        >
          <img src={getAvatarUrl(profile?.avatar)} alt='' className='h-full w-full object-cover' />
        </Link>

        <div className='flex-grow pl-4'>
          <div className='mb-1 truncate text-xs font-semibold text-gray-600 dark:text-gray-400 md:text-sm lg:text-base'>
            {profile?.email}
          </div>
          <Link
            to={path.profile}
            className='flex items-center text-[10px] capitalize text-gray-500 md:text-xs lg:text-sm'
          >
            <svg
              width={12}
              height={12}
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
              style={{ marginRight: 4 }}
              className='h-2 w-2 md:h-3 md:w-3'
            >
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            {t('profile info.edit profile')}
          </Link>
        </div>
      </div>

      <div className='mt-5 flex items-center gap-12 md:mt-6 md:flex-col md:items-start md:gap-0 lg:mt-7'>
        <Link
          to={path.profile}
          className='flex items-center text-xs capitalize transition-colors dark:text-gray-400 md:text-sm lg:text-base'
        >
          <div className='mr-1 h-[16px] w-[16px] md:mr-2 md:h-[18px] md:w-[18px] lg:mr-3 lg:h-[22px] lg:w-[22px]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-4 w-4 stroke-lightBlue md:h-5 md:w-5 lg:h-6 lg:w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
              />
            </svg>
          </div>
          {t('profile info.my account')}
        </Link>

        <Link
          to={path.changePassword}
          className='flex items-center text-xs capitalize text-gray-600 transition-colors dark:text-gray-400 md:mt-4 md:text-sm lg:text-base'
        >
          <div className='mr-1 h-[16px] w-[16px] md:mr-2 md:h-[18px] md:w-[18px] lg:mr-3 lg:h-[22px] lg:w-[22px]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-4 w-4 stroke-lightBlue md:h-5 md:w-5 lg:h-6 lg:w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z'
              />
            </svg>
          </div>
          {t('change password')}
        </Link>

        <Link
          to={path.historyPurchase}
          className='flex items-center text-xs capitalize text-gray-600 transition-colors dark:text-gray-400 md:mt-4 md:text-sm lg:text-base'
        >
          <div className='mr-1 h-[16px] w-[16px] md:mr-2 md:h-[18px] md:w-[18px] lg:mr-3 lg:h-[22px] lg:w-[22px]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-4 w-4 stroke-lightBlue md:h-5 md:w-5 lg:h-6 lg:w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z'
              />
            </svg>
          </div>
          {t('profile info.my purchase')}
        </Link>
      </div>
    </div>
  )
}
