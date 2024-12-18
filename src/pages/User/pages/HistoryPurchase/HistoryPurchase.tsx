import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { createSearchParams, Link } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import path from 'src/constants/path'
import { purchaseStatus } from 'src/constants/purchase'
import useQueryParams from 'src/hooks/useQueryParams'
import { PurchaseListStatus } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'

const purchaseTabs = [
  { status: purchaseStatus.all, name: 'Tất cả' },
  { status: purchaseStatus.waitForConfirmation, name: 'Chờ xác nhận' },
  { status: purchaseStatus.waitForGetting, name: 'Chờ lấy hàng' },
  { status: purchaseStatus.inProgress, name: 'Đang giao' },
  { status: purchaseStatus.delivered, name: 'Đã giao' },
  { status: purchaseStatus.cancelled, name: 'Đã hủy' }
]
export default function HistoryPurchase() {
  const { t } = useTranslation(['profile'])

  const queryParams: { status?: string } = useQueryParams()

  const status: number = Number(queryParams.status) || purchaseStatus.all

  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => purchaseApi.getPurchases({ status: status as PurchaseListStatus })
  })

  const purchasesInCart = purchasesInCartData?.data.data

  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: path.historyPurchase,
        search: createSearchParams({
          status: String(tab.status)
        }).toString()
      }}
      className={classNames(
        'flex flex-1 items-center justify-center truncate border-b-2 bg-white py-2 text-center text-xs dark:bg-blackPrimary md:py-3 md:text-sm lg:py-4',
        {
          'border-b-lightBlue text-lightBlue': status === tab.status,
          'border-b-black/10 text-gray-900 dark:text-white': status !== tab.status
        }
      )}
    >
      {tab.name}
    </Link>
  ))

  return (
    <div>
      <Helmet>
        <title>{t('profile info.my purchase')} | Clothing Shop</title>
        <meta name='description' content='Đơn mua hàng của bạn' />
      </Helmet>

      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex rounded-t-sm shadow-sm'>{purchaseTabsLink}</div>
          <div>
            {purchasesInCart?.map((purchase) => (
              <div
                key={purchase._id}
                className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm dark:bg-blackPrimary dark:text-white'
              >
                <Link
                  to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                  className='flex'
                >
                  <div className='flex-shrink-0'>
                    <img
                      className='md:h-18 md:w-18 h-16 w-16 object-cover lg:h-20 lg:w-20'
                      src={purchase.product.image}
                      alt={purchase.product.name}
                    />
                  </div>
                  <div className='ml-3 flex-grow overflow-hidden text-xs md:text-sm lg:text-base'>
                    <div className='truncate'>{purchase.product.name}</div>
                    <div className='mt-3'>x{purchase.buy_count}</div>
                  </div>
                  <div className='ml-3 flex-shrink-0 text-xs md:text-sm lg:text-base'>
                    <span className='truncate text-gray-500 line-through'>
                      ₫{formatCurrency(purchase.product.price_before_discount)}
                    </span>
                    <span className='ml-2 truncate text-lightBlue'>₫{formatCurrency(purchase.product.price)}</span>
                  </div>
                </Link>
                <div className='flex justify-end'>
                  <div>
                    <span className='text-xs font-semibold md:text-sm lg:text-base'>
                      {t('my purchase info.total price')}:
                    </span>
                    <span className='ml-4 text-base text-lightBlue md:text-lg lg:text-xl'>
                      ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
