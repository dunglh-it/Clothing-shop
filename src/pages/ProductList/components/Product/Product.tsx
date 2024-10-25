import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
import path from 'src/constants/path'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from 'src/utils/utils'

interface Props {
  product: ProductType
}

export default function Product({ product }: Props) {
  const { t } = useTranslation(['product'])

  return (
    <Link to={`${path.home}${generateNameId({ name: product.name, id: product._id })}`}>
      <Helmet>
        <title>{t('product.items')} | Clothing Shop</title>
        <meta name='description' content='Danh sách sản phẩm của Clothing Shop' />
      </Helmet>

      <div className='overflow-hidden rounded-sm bg-white shadow-md transition-transform duration-100 hover:translate-y-[-0.04rem] hover:text-lightBlue hover:shadow-lg dark:bg-blackPrimary dark:hover:text-lightBlue'>
        <div className='relative w-full pt-[100%]'>
          <img
            src={product.image}
            alt={product.name}
            className='absolute left-0 top-0 h-full w-full bg-white object-cover dark:bg-blackPrimary'
          />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='line-clamp-2 min-h-[1rem] text-[10px] dark:text-white md:text-xs'>{product.name}</div>
          <div className='mt-3 flex items-start max-[350px]:flex-col min-[375px]:flex-row md:items-center'>
            <div className='relative max-w-[70%] truncate text-sm text-gray-500 md:static md:max-w-[50%] md:line-through'>
              <span className='text-[10px] lg:text-xs'>₫</span>
              <span className='absolute left-0 top-2/4 h-[1px] w-full -translate-y-1/2 bg-gray-500 md:hidden'></span>
              <span className='text-[10px] md:text-xs lg:text-base'>
                {formatCurrency(product.price_before_discount)}
              </span>
            </div>
            <div className='truncate text-lightBlue min-[375px]:ml-1'>
              <span className='text-[10px] lg:text-xs'>₫</span>
              <span className='text-[10px] md:text-xs lg:text-base'>{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-between'>
            <ProductRating rating={product.rating} />

            <div className='ml-1 truncate text-[10px] text-black dark:text-white md:ml-2 md:text-xs lg:text-sm'>
              <span>{formatNumberToSocialStyle(product.sold)}</span>
              <span className='ml-1'>{t('product.sold')}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
