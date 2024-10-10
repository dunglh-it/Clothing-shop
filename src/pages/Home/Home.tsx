import { createSearchParams, Link } from 'react-router-dom'
import Slide from 'src/components/Slide'
import path from 'src/constants/path'
import shirt from 'src/assets/images/ao-thun.png'
import cellphone from 'src/assets/images/dien-thoai.png'
import clock from 'src/assets/images/dong-ho.png'
import all from 'src/assets/images/tat-ca.png'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { useQuery } from '@tanstack/react-query'
import { ProductListConfig } from 'src/types/product.type'
import productApi from 'src/apis/product.api'
import Product from '../ProductList/components/Product'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation(['home'])

  const queryConfig = useQueryConfig()

  const { data: productDataHome } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProductsHome(queryConfig as ProductListConfig)
    }
  })

  return (
    <div className='bg-gray-100 py-6 pb-20 dark:bg-[#292E39]'>
      <Helmet>
        <title>Grocerymart | Clothing Shop</title>
        <meta name='description' content='Trang chủ của Grocerymart' />
      </Helmet>

      <div className='container'>
        <Slide />

        <div className='mb-4 mt-8 text-2xl text-black/50 dark:text-white'>{t('home:main.categories')}</div>

        <div className='mb-6 overflow-hidden rounded-md bg-white shadow-lg dark:bg-[#171C28]'>
          <div className='grid grid-cols-4'>
            <div className='col-span-1'>
              <Link
                to={path.product}
                className='flex flex-col items-center justify-center border border-neutral-200 py-3 hover:shadow-lg dark:border-black/80 dark:text-white'
              >
                <img src={all} alt='Tất cả' className='h-20 w-20 object-cover' />
                <span>{t('home:main.all')}</span>
              </Link>
            </div>

            <div className='col-span-1'>
              <Link
                to={path.product + '?page=1&limit=20&category=60aba4e24efcc70f8892e1c6'}
                className='flex flex-col items-center justify-center border border-neutral-200 border-l-transparent py-3 hover:shadow-lg dark:border-black/80 dark:text-white'
              >
                <img src={shirt} alt='Áo thun' className='h-20 w-20 object-cover' />
                <span>{t('home:main.t-shirt')}</span>
              </Link>
            </div>

            <div className='col-span-1'>
              <Link
                to={path.product + '?page=1&limit=20&category=60afafe76ef5b902180aacb5'}
                className='border-neutral-20 flex flex-col items-center justify-center border border-l-transparent border-r-transparent py-3 hover:shadow-md dark:border-black/80 dark:text-white'
              >
                <img src={cellphone} alt='Điện thoại' className='h-20 w-20 object-cover' />
                <span>{t('home:main.cellphone')}</span>
              </Link>
            </div>

            <div className='col-span-1'>
              <Link
                to={path.product + '?page=1&limit=20&category=60afacca6ef5b902180aacaf'}
                className='flex flex-col items-center justify-center border border-neutral-200 py-3 hover:shadow-lg dark:border-black/80 dark:text-white'
              >
                <img src={clock} alt='Đồng hồ' className='h-20 w-20 object-cover' />
                <span>{t('home:main.watch')}</span>
              </Link>
            </div>
          </div>
        </div>

        <div className='mb-4 mt-8 text-2xl text-black/50 dark:text-white'>{t('home:main.just for you')}</div>

        <div className='mt-6 grid grid-cols-5 gap-4 shadow-md'>
          {productDataHome?.data.data.products.map((product) => (
            <div className='col-span-1' key={product._id}>
              <Product product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
