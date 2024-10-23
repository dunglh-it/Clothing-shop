import { sortBy, order as orderConstant } from 'src/constants/product'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { ProductListConfig } from 'src/types/product.type'
import path from 'src/constants/path'
import omit from 'lodash/omit'
import classNames from 'classnames'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { useTranslation } from 'react-i18next'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: Props) {
  const { t } = useTranslation(['product'])

  const page = Number(queryConfig.page)
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const navigate = useNavigate()

  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.product,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.product,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='rounded-sm bg-white px-2 py-3 shadow-md dark:bg-blackPrimary lg:px-3 lg:py-4'>
      <div className='flex flex-wrap items-center justify-between gap-1 pl-2 md:pl-3 lg:gap-2 lg:pl-5'>
        <div className='flex flex-wrap items-center gap-2 md:gap-3 lg:gap-4'>
          <div className='text-[10px] font-bold dark:text-white md:text-xs lg:text-base'>
            {t('sort filter.sort by')}:
          </div>

          <button
            className={classNames(
              'h-8 rounded-sm px-2 text-center text-[10px] capitalize md:px-3 md:text-xs lg:px-4 lg:text-sm ',
              {
                'bg-lightBlue text-white hover:bg-lightBlue/80': isActiveSortBy(sortBy.view),
                'bg-white text-black shadow hover:bg-lightBlue hover:text-white dark:bg-blackSecond dark:text-white dark:hover:bg-lightBlue dark:hover:text-white':
                  !isActiveSortBy(sortBy.view)
              }
            )}
            onClick={() => handleSort(sortBy.view)}
          >
            {t('sort filter.popular')}
          </button>

          <button
            className={classNames(
              'h-8 rounded-sm  px-2 text-center text-[10px] capitalize md:px-3 md:text-xs lg:px-4 lg:text-sm ',
              {
                'bg-lightBlue text-white hover:bg-lightBlue/80': isActiveSortBy(sortBy.createdAt),
                'bg-white text-black shadow hover:bg-lightBlue hover:text-white dark:bg-blackSecond dark:text-white dark:hover:bg-lightBlue dark:hover:text-white':
                  !isActiveSortBy(sortBy.createdAt)
              }
            )}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            {t('sort filter.latest')}
          </button>

          <button
            className={classNames(
              'h-8 rounded-sm  px-2 text-center text-[10px] capitalize md:px-3 md:text-xs lg:px-4 lg:text-sm ',
              {
                'bg-lightBlue text-white hover:bg-lightBlue/80': isActiveSortBy(sortBy.sold),
                'bg-white text-black shadow hover:bg-lightBlue hover:text-white dark:bg-blackSecond dark:text-white dark:hover:bg-lightBlue dark:hover:text-white':
                  !isActiveSortBy(sortBy.sold)
              }
            )}
            onClick={() => handleSort(sortBy.sold)}
          >
            {t('sort filter.top sales')}
          </button>

          <select
            className={classNames(
              'h-8 cursor-pointer rounded-sm px-2 text-left text-[10px] capitalize md:w-[120px] md:px-3 md:text-xs lg:px-4 lg:text-sm ',
              {
                'bg-lightBlue text-white hover:bg-lightBlue/80': isActiveSortBy(sortBy.price),
                'bg-white text-black shadow hover:bg-lightBlue hover:text-white dark:bg-blackSecond dark:text-white dark:hover:bg-lightBlue dark:hover:text-white':
                  !isActiveSortBy(sortBy.price)
              }
            )}
            value={order || ''}
            onChange={(event) => handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
          >
            <option value='' disabled className='bg-white text-black dark:bg-blackSecond dark:text-white'>
              {t('sort filter.price')}
            </option>
            <option
              value={orderConstant.asc}
              className='cursor-pointer bg-white text-black dark:bg-blackSecond dark:text-white'
            >
              {t('sort filter.price')}: {t('sort filter.low to high')}
            </option>
            <option
              value={orderConstant.desc}
              className='cursor-pointer bg-white text-black dark:bg-blackSecond dark:text-white'
            >
              {t('sort filter.price')}: {t('sort filter.high to low')}
            </option>
          </select>
        </div>

        <div className='my-4 h-[1px] w-full bg-lightBlue/60 md:hidden'></div>

        <div className='ml-auto flex items-center justify-center'>
          <div>
            <span className='text-xs text-lightBlue md:text-sm lg:text-base'>{page}</span>
            <span className='text-xs dark:text-white md:text-sm lg:text-base'>/{pageSize}</span>
          </div>
          <div className='ml-2 flex items-center'>
            {page === 1 ? (
              <span className='flex h-6 cursor-not-allowed items-center rounded-bl-sm rounded-tl-sm bg-white/60 px-2 shadow hover:text-black dark:border dark:border-blackSecond  dark:bg-blackPrimary dark:text-white md:h-7 md:px-3 lg:h-8'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-2 w-2 md:h-3 md:w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.product,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='flex h-6 w-6 items-center justify-center rounded-bl-sm rounded-tl-sm  bg-white shadow hover:bg-lightBlue hover:text-white dark:bg-blackSecond dark:hover:bg-lightBlue dark:hover:text-white md:h-7 md:w-7 lg:h-8 lg:w-9'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-2 w-2 md:h-3 md:w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </Link>
            )}

            {page === pageSize ? (
              <span className='flex h-6 cursor-not-allowed items-center rounded-br-sm rounded-tr-sm bg-white px-2 shadow hover:text-black dark:border dark:border-blackSecond dark:bg-blackPrimary dark:text-white md:h-7 md:px-3 lg:h-8'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-2 w-2 md:h-3 md:w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.product,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='flex h-6 w-6 items-center justify-center rounded-br-sm rounded-tr-sm  bg-white shadow hover:bg-lightBlue hover:text-white dark:bg-blackSecond dark:hover:bg-lightBlue dark:hover:text-white md:h-7 md:w-7 lg:h-8 lg:w-9'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-2 w-2 md:h-3 md:w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
