import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import google from 'src/assets/images/google.png'

export default function Footer() {
  const { t } = useTranslation(['footer'])

  return (
    <footer className='bg-gray-200 shadow-sm dark:bg-blackPrimary'>
      <div className='container'>
        <div className='grid grid-cols-4 py-10'>
          <div className='col-span-1'>
            <h4 className='text-sm font-semibold uppercase dark:text-white'>{t('take care.customer service')}</h4>

            <ul className='mt-5 text-[12px] capitalize text-neutral-600'>
              <li className='mb-2 pb-1 hover:text-lightBlue dark:text-slate-400'>
                <Link to='/'>{t('take care.help centre')}</Link>
              </li>

              <li className='mb-2 pb-1 hover:text-lightBlue dark:text-slate-400'>
                <Link to='/'>{t('take care.how to buy')}</Link>
              </li>

              <li className='mb-2 pb-1 hover:text-lightBlue dark:text-slate-400'>
                <Link to='/'>{t('take care.how to sell')}</Link>
              </li>

              <li className='mb-2 pb-1 hover:text-lightBlue dark:text-slate-400'>
                <Link to='/'>{t('take care.payment')}</Link>
              </li>

              <li className='mb-2 pb-1 hover:text-lightBlue dark:text-slate-400'>
                <Link to='/'>{t('take care.shipping')}</Link>
              </li>

              <li className='mb-2 pb-1 hover:text-lightBlue dark:text-slate-400'>
                <Link to='/'>{t('take care.return refund')}</Link>
              </li>

              <li className='mb-2 pb-1 hover:text-lightBlue dark:text-slate-400'>
                <Link to='/'>{t('take care.contact us')}</Link>
              </li>

              <li className='hover:text-lightBlue dark:text-slate-400'>
                <Link to='/'>{t('take care.warranty policy')}</Link>
              </li>
            </ul>
          </div>

          <div className='col-span-1'>
            <h4 className='text-sm font-semibold uppercase dark:text-white'>{t('about of.about')}</h4>

            <ul className='mt-5 text-[12px] capitalize text-neutral-600'>
              <li className='mb-2 pb-1 hover:text-lightBlue dark:text-slate-400'>
                <Link to='/'>{t('about of.about us')}</Link>
              </li>

              <li className='mb-2 pb-1 hover:text-lightBlue dark:text-slate-400'>
                <Link to='/'>{t('about of.career')}</Link>
              </li>

              <li className='mb-2 pb-1 hover:text-lightBlue dark:text-slate-400'>
                <Link to='/'>{t('about of.policy')}</Link>
              </li>

              <li className='mb-2 pb-1 hover:text-lightBlue dark:text-slate-400'>
                <Link to='/'>{t('about of.privacy')}</Link>
              </li>
            </ul>
          </div>

          <div className='col-span-1'>
            <h4 className='text-sm font-semibold uppercase dark:text-white'>{t('about of.follow')}</h4>

            <ul className='mt-5 text-[12px] capitalize text-neutral-600'>
              <li className='mb-2 pb-1 hover:text-lightBlue dark:text-slate-400'>
                <Link to='/' className='flex items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'
                    className='mr-2 h-4 w-4 dark:bg-slate-400'
                  >
                    <path d='M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z' />
                  </svg>{' '}
                  <span>Facebook</span>
                </Link>
              </li>

              <li className='mb-2 pb-1 hover:text-lightBlue dark:text-slate-400'>
                <Link to='/' className='flex items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 448 512'
                    className='mr-2 h-4 w-4 dark:bg-slate-400'
                  >
                    <path d='M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z' />
                  </svg>

                  <span>Instagram</span>
                </Link>
              </li>

              <li className='mb-2 pb-1 hover:text-lightBlue dark:text-slate-400'>
                <Link to='/' className='flex items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 448 512'
                    className='mr-2 h-4 w-4 dark:bg-slate-400'
                  >
                    <path d='M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z' />
                  </svg>

                  <span>Linkedin</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className='col-span-1'>
            <h4 className='text-sm font-semibold uppercase dark:text-white'>{t('about of.download app')}</h4>

            <div className='mt-5 inline-block rounded-md border bg-white px-4 py-2 shadow-sm dark:bg-blackSecond'>
              <Link to='/'>
                <img src={google} alt='Google play' className='h-6 w-24' />
              </Link>
            </div>
          </div>
        </div>

        <div className='border-t border-neutral-300 py-6 text-center text-[14px] text-neutral-600 dark:text-white'>
          <span>© 2024 Grocerymart. {t('about of.all rights reserved')}.</span>
        </div>
      </div>
    </footer>
  )
}
