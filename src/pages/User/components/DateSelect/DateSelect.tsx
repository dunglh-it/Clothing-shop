import range from 'lodash/range'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

export default function DateSelect({ value, onChange, errorMessage }: Props) {
  const { t } = useTranslation(['profile'])

  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  useEffect(() => {
    if (value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFromSelect, name } = event.target
    const newDate = {
      ...date,
      [name]: Number(valueFromSelect)
    }

    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
      <div className='mb-2 truncate pt-0 text-xs capitalize dark:text-gray-400 sm:w-[20%] sm:text-right md:mb-0 md:pt-1 md:text-sm lg:pt-3 lg:text-base'>
        {t('my account info.date of birth')}
      </div>
      <div className='sm:w-[80%] sm:pl-5'>
        <div className='flex justify-between'>
          <select
            onChange={handleChange}
            name='date'
            className='hover:border-orange h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 text-xs dark:bg-blackSecond dark:text-gray-400 md:text-sm lg:text-base'
            value={value?.getDate() || date.date}
          >
            <option disabled>{t('my account info.day')}</option>
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            onChange={handleChange}
            name='month'
            className='hover:border-orange h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 text-xs dark:bg-blackSecond dark:text-gray-400 md:text-sm lg:text-base'
            value={value?.getMonth() || date.month}
          >
            <option disabled>{t('my account info.month')}</option>
            {range(0, 12).map((item) => (
              <option value={item} key={item}>
                {item + 1}
              </option>
            ))}
          </select>

          <select
            onChange={handleChange}
            name='year'
            className='hover:border-orange h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 text-xs dark:bg-blackSecond dark:text-gray-400 md:text-sm lg:text-base'
            value={value?.getFullYear() || date.year}
          >
            <option disabled>{t('my account info.year')}</option>
            {range(1990, 2024).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='mt-1 min-h-[1.25rem] text-[10px] text-red-600 md:text-xs lg:text-sm'>{errorMessage}</div>
      </div>
    </div>
  )
}
