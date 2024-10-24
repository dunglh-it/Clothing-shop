import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import path from 'src/constants/path'
import { Category } from 'src/types/category.type'
import classNames from 'classnames'
import { NoUndefinedField } from 'src/types/utils.type'
import { schema, Schema } from 'src/utils/rules'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputNumber from 'src/components/InputNumber'
import omit from 'lodash/omit'
import RatingStars from '../RatingStars'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { useTranslation } from 'react-i18next'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

type FormData = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>

const priceSchema = schema.pick(['price_min', 'price_max'])

export default function AsideFilter({ queryConfig, categories }: Props) {
  const { t } = useTranslation('product')

  const { category } = queryConfig

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
    reset
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema)
  })

  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.product,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })

  const handleRemoveAll = () => {
    reset()
    navigate({
      pathname: path.product,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    })
  }

  return (
    <div className='py-4'>
      <Link
        to={path.product}
        className={classNames('flex items-center text-[10px] font-bold uppercase md:text-xs lg:text-base', {
          'text-lightBlue': !category,
          'dark:text-white': category
        })}
      >
        <svg viewBox='0 0 12 10' className='mr-3 h-4 w-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        {t('aside filter.all categories')}
      </Link>

      <div className='my-4 h-[1px] bg-lightBlue dark:bg-slate-400' />

      <ul>
        {categories.map((categoryItem) => {
          const isActive = category === categoryItem._id

          return (
            <li className='py-2 pl-2' key={categoryItem._id}>
              <Link
                to={{
                  pathname: path.product,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                className={classNames('relative px-2 text-[10px] md:text-xs lg:text-base', {
                  'font-semibold text-lightBlue': isActive,
                  'dark:text-white': !isActive
                })}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className='absolute left-[-10px] top-1 h-2 w-2 fill-lightBlue'>
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}
                {categoryItem.name}
              </Link>
            </li>
          )
        })}
      </ul>

      <Link
        to={path.home}
        className='mt-4 flex items-center text-[10px] font-bold uppercase dark:text-white md:text-xs lg:text-base'
      >
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='mr-3 h-4 w-3 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        {t('aside filter.filter search')}
      </Link>

      <div className='my-4 h-[1px] bg-lightBlue dark:bg-slate-400' />

      <div className='my-5'>
        <div className='text-[10px] dark:text-white md:text-xs lg:text-base'>{t('aside filter.price change')}:</div>
        <form className='mt-3' onSubmit={onSubmit}>
          <div className='flex flex-col items-start lg:flex-row'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder={`₫ ${t('aside filter.from')}`}
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm dark:bg-blackSecond text-[10px] md:text-xs lg:text-base'
                    classNameError='hidden'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                  />
                )
              }}
            />

            <div className='mx-2 mt-2 shrink-0 dark:text-white'>-</div>

            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder={`₫ ${t('aside filter.to')}`}
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm dark:bg-blackSecond text-[10px] md:text-xs lg:text-base'
                    classNameError='hidden'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_min')
                    }}
                  />
                )
              }}
            />
          </div>

          <div className='mt-1 min-h-[1.25rem] text-center text-[10px] text-red-600 lg:text-sm'>
            {errors.price_min?.message}
          </div>

          <Button className='flex w-full items-center justify-center bg-lightBlue p-2 text-[10px] uppercase text-white hover:bg-lightBlue/80 lg:text-sm'>
            {t('aside filter.apply')}
          </Button>
        </form>
      </div>

      <div className='my-4 h-[1px] bg-lightBlue dark:bg-slate-400' />

      <div className='text-md text-[10px] dark:text-white md:text-xs lg:text-base'>{t('aside filter.rating')}:</div>

      <RatingStars queryConfig={queryConfig} />
      <div className='my-4 h-[1px] bg-lightBlue dark:bg-slate-400' />

      <Button
        className='flex w-full items-center justify-center bg-lightBlue p-2 text-[10px] uppercase text-white hover:bg-lightBlue/80 md:text-xs lg:text-base'
        onClick={handleRemoveAll}
      >
        {t('aside filter.delete all')}
      </Button>
    </div>
  )
}
