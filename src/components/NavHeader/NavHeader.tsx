import { useContext } from 'react'
import Popover from '../Popover'
import { AppContext } from 'src/contexts/app.context'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi } from 'src/apis/auth.api'
import { purchaseStatus } from 'src/constants/purchase'
import flagVietNam from 'src/assets/images/flag-vietnam.png'
import flagEnglish from 'src/assets/images/flag-english.png'

export default function NavHeader() {
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
  return (
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

      <Popover
        className='ml-4 flex cursor-pointer items-center py-1 hover:opacity-75'
        renderPopover={
          <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
            <div className='flex flex-col'>
              <button className='flex items-center px-3 py-2 hover:bg-slate-100 hover:text-lightBlue'>
                <img src={flagVietNam} alt='Viet Nam' className='mr-2 h-5 w-5 object-cover' />
                <span>Tiếng Việt</span>
              </button>
              <button className='flex items-center px-3 py-2 pt-2 hover:bg-slate-100 hover:text-lightBlue'>
                <img src={flagEnglish} alt='English' className='mr-2 h-5 w-5 object-cover' />
                <span>English</span>
              </button>
            </div>
          </div>
        }
      >
        <img src={flagVietNam} alt='Viet Nam' className='h-5 w-5 object-cover' />
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
      </Popover>

      {isAuthenticated && (
        <Popover
          className='ml-6 flex cursor-pointer items-center py-1 hover:opacity-75'
          renderPopover={
            <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
              <Link
                to='/profile'
                className='block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-lightBlue'
              >
                Tài khoản của tôi
              </Link>
              <Link
                to='/'
                className='block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-lightBlue'
              >
                Đơn mua
              </Link>
              <button
                onClick={handleLogout}
                className='block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-lightBlue'
              >
                Đăng xuất
              </button>
            </div>
          }
        >
          <div className='mr-2 h-6 w-6 flex-shrink-0'>
            <img
              src='https://cf.shopee.vn/file/d04ea22afab6e6d250a370d7ccc2e675_tn'
              alt='avatar'
              className='h-full w-full rounded-full object-cover'
            />
          </div>
          <div>{profile?.email}</div>
        </Popover>
      )}

      {!isAuthenticated && (
        <div className='flex items-center'>
          <Link to={path.register} className='mx-3 capitalize hover:text-lightBlue/70'>
            Đăng ký
          </Link>
          <div className='h-4 border-r-[1px] border-r-lightBlue/40' />
          <Link to={path.login} className='mx-3 capitalize hover:text-lightBlue/70'>
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  )
}
