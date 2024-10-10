import classNames from 'classnames'
import { createSearchParams, Link } from 'react-router-dom'
import path from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

const RANGE = 2

export default function Pagination({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)

  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false

    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true

        return (
          <span
            key={index}
            className='mx-2 rounded border bg-white px-3 py-2 shadow-sm hover:bg-lightBlue hover:text-white dark:bg-blackPrimary dark:text-white'
          >
            ...
          </span>
        )
      }

      return null
    }

    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true

        return (
          <span
            key={index}
            className='mx-2 rounded border bg-white px-3 py-2 shadow-sm hover:bg-lightBlue hover:text-white dark:bg-blackPrimary dark:text-white'
          >
            ...
          </span>
        )
      }

      return null
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1

        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }

        return (
          <Link
            to={{
              pathname: path.product,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames(
              'mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-md hover:bg-lightBlue hover:text-white dark:bg-blackPrimary dark:text-white dark:hover:bg-lightBlue',
              {
                'border-lightBlue': pageNumber === page,
                'border-transparent': pageNumber !== page
              }
            )}
          >
            {pageNumber}
          </Link>
        )
      })
  }

  return (
    <div className='mt-6 flex flex-wrap justify-center'>
      {page === 1 ? (
        <span className='mx-2 cursor-not-allowed rounded border bg-white/60 px-3 py-2 shadow-sm dark:border-blackPrimary dark:bg-blackSecond dark:text-white'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
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
          className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm hover:bg-lightBlue hover:text-white dark:border-none dark:bg-blackPrimary dark:text-white dark:hover:bg-lightBlue'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
          </svg>
        </Link>
      )}

      {renderPagination()}

      {page === pageSize ? (
        <span className='mx-2 cursor-not-allowed rounded border bg-white/60 px-3 py-2 shadow-sm dark:border-blackPrimary dark:bg-blackSecond dark:text-white'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
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
          className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm hover:bg-lightBlue hover:text-white dark:border-none dark:bg-blackPrimary dark:text-white dark:hover:bg-lightBlue'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
          </svg>
        </Link>
      )}
    </div>
  )
}
