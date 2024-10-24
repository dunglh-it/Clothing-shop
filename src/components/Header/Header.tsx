import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import logoLight from 'src/assets/images/logo-light.png'
import logoDark from 'src/assets/images/logo-dark.png'
import Popover from '../Popover'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { useQuery } from '@tanstack/react-query'
import path from 'src/constants/path'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { useForm } from 'react-hook-form'
import { schema, Schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { purchaseStatus } from 'src/constants/purchase'
import purchaseApi from 'src/apis/purchase.api'
import { formatCurrency } from 'src/utils/utils'
import noproduct from 'src/assets/images/no-product.png'
import NavHeader from '../NavHeader'
import { useTranslation } from 'react-i18next'

type FormData = Pick<Schema, 'name'>
const nameSchema = schema.pick(['name'])

const MAX_PURCHASES = 5

export default function Header() {
  const { t } = useTranslation(['header'])

  const [isDarkMode, setIsDarkMode] = useState<'light' | 'dark'>('light')
  const [isSearchOpen, setIsSearchOpen] = useState(false)

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

  const queryConfig = useQueryConfig()
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },

    resolver: yupResolver(nameSchema)
  })

  const navigate = useNavigate()

  const { isAuthenticated } = useContext(AppContext)

  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }

    navigate({
      pathname: path.product,
      search: createSearchParams(config).toString()
    })
  })

  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchaseStatus.inCart }),
    enabled: isAuthenticated
  })

  const purchasesInCart = purchasesInCartData?.data.data

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  return (
    <div className='bg-[#d2f5f5] px-2 shadow-md dark:bg-[#171C28]'>
      <div className='container'>
        <NavHeader />

        <div className='mt-4 grid grid-cols-12 items-center gap-3 pb-4 md:gap-12 md:pb-6'>
          {isSearchOpen ? (
            <div className='relative col-span-12'>
              <form className='mr-12 flex justify-between' onSubmit={onSubmitSearch}>
                <input
                  type='text'
                  className='flex-grow border-none bg-white px-3 py-2 text-black outline-none dark:bg-[#292E39] dark:text-white'
                  placeholder={t('search for products')}
                  {...register('name')}
                />

                <button className='bg-lightBlue p-3 px-6 py-2 hover:opacity-90 dark:bg-blackPrimary' type='submit'>
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

                <button onClick={toggleSearch} className='absolute right-0 top-1 p-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-6 w-6 text-black dark:text-white'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </form>
            </div>
          ) : (
            <>
              <Link to='/' className='col-span-3 md:col-span-3 lg:col-span-2'>
                {isDarkMode === 'dark' ? (
                  <img src={logoDark} alt='Logo Dark' className='w-15 h-full  object-cover md:w-full' />
                ) : (
                  <img src={logoLight} alt='Logo Light' className='w-15 h-full object-cover  md:w-full' />
                )}
              </Link>

              <form className='col-span-6 md:col-span-7 lg:col-span-9' onSubmit={onSubmitSearch}>
                <div className='hidden justify-start rounded-sm bg-white p-1 dark:bg-[#292E39] md:flex'>
                  <input
                    type='text'
                    className='flex-grow border-none bg-transparent px-3 py-2 text-black outline-none md:inline-block'
                    placeholder={t('search for products')}
                    {...register('name')}
                  />

                  <button
                    className='flex-shrink-0 bg-lightBlue p-3 px-6 py-2 hover:opacity-90 dark:bg-blackPrimary md:rounded-sm'
                    type='button'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='white'
                      className='md:h-6 md:w-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                      />
                    </svg>
                  </button>
                </div>

                <button
                  className='flex-shrink-0 rounded-full bg-lightBlue p-3 hover:opacity-90 dark:border dark:bg-blackPrimary md:hidden'
                  onClick={toggleSearch}
                  type='button'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='white'
                    className='h-3 w-3'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                    />
                  </svg>
                </button>
              </form>

              <div className='col-span-3 col-start-12 md:col-span-2 lg:col-span-1'>
                <Popover
                  renderPopover={
                    <div className='relative max-w-[250px] rounded-sm border border-gray-200 bg-white text-sm shadow-md dark:border-blackPrimary dark:bg-blackPrimary md:max-w-[350px] lg:max-w-[400px]'>
                      {purchasesInCart && purchasesInCart.length > 0 ? (
                        <div className='p-2'>
                          <div className='text-[12px] capitalize text-gray-400 dark:text-white md:text-base'>
                            Sản phẩm mới thêm
                          </div>
                          <div className='mt-5'>
                            {purchasesInCart.slice(0, MAX_PURCHASES).map((purchase) => (
                              <div className='mt-4 flex' key={purchase._id}>
                                <div className='flex-shrink-0'>
                                  <img
                                    src={purchase.product.image}
                                    alt={purchase.product.name}
                                    className='h-6 w-6 object-cover md:h-11 md:w-11'
                                  />
                                </div>
                                <div className='ml-2 flex-grow overflow-hidden'>
                                  <div className='truncate text-xs dark:text-white md:text-base'>
                                    {purchase.product.name}
                                  </div>
                                </div>
                                <div className='ml-2 flex-shrink-0'>
                                  <span className='text-xs text-lightBlue md:text-base'>
                                    ₫{formatCurrency(purchase.product.price)}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className='mt-6 flex items-center justify-between'>
                            <div className='text-xs capitalize text-gray-500'>
                              <span className='text-xs font-semibold text-lightBlue md:text-base'>
                                {purchasesInCart.length > MAX_PURCHASES ? purchasesInCart.length - MAX_PURCHASES : ''}
                              </span>{' '}
                              Thêm hàng vào giỏ
                            </div>
                            <Link
                              to={path.cart}
                              className='rounded-sm bg-lightBlue px-4 py-2 text-xs capitalize text-white hover:bg-opacity-90 md:text-base'
                            >
                              Xem giỏ hàng
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div className='flex h-[300px] w-[300px] flex-col items-center justify-center p-2'>
                          <img src={noproduct} alt='no purchase' className='h-12 w-12 md:h-24 md:w-24' />
                          <div className='mt-3 text-xs capitalize dark:text-white md:text-base'>
                            {t('no products yet')}
                          </div>
                        </div>
                      )}
                    </div>
                  }
                >
                  <Link
                    to='/'
                    className='relative flex w-full items-center justify-end pr-2'
                    onClick={(e) => {
                      e.preventDefault()
                    }}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-5 w-5 dark:text-white md:h-7 md:w-7'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
                      />
                    </svg>

                    {purchasesInCart && purchasesInCart.length > 0 && (
                      <span className='absolute -right-1 top-[-10px] rounded-full bg-lightBlue px-[9px] py-[1px] text-[10px] text-white md:text-xs'>
                        {purchasesInCart?.length}
                      </span>
                    )}
                  </Link>
                </Popover>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
