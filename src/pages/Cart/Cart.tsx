import { useMutation, useQuery } from '@tanstack/react-query'
import produce from 'immer'
import keyBy from 'lodash/keyBy'
import { useContext, useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import purchaseApi from 'src/apis/purchase.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constants/path'
import { purchaseStatus } from 'src/constants/purchase'
import { AppContext } from 'src/contexts/app.context'
import { Purchase } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import noproduct from 'src/assets/images/no-product.png'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

export default function Cart() {
  const { t } = useTranslation(['cart'])

  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)

  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.inCart }],
    queryFn: () =>
      purchaseApi.getPurchases({
        status: purchaseStatus.inCart
      })
  })

  const location = useLocation()
  const choosePurchaseIdFromLocation = (location.state as { purchaseId: string } | null)?.purchaseId

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const buyProductsMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1000
      })
    }
  })

  const deletePurchasesMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const purchasesInCart = purchasesInCartData?.data.data

  const isAllChecked = useMemo(() => extendedPurchases.every((purchase) => purchase.checked), [extendedPurchases])
  const checkedPurchases = useMemo(() => extendedPurchases.filter((purchase) => purchase.checked), [extendedPurchases])
  const checkedPurchasesCount = checkedPurchases.length
  const totalCheckedPurchasePrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + current.product.price * current.buy_count
      }, 0),
    [checkedPurchases]
  )
  const totalCheckedPurchaseSavingPrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + (current.product.price_before_discount - current.product.price) * current.buy_count
      }, 0),
    [checkedPurchases]
  )

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, '_id')
      return (
        purchasesInCart?.map((purchase) => {
          const isChoosePurchaseFromLocation = choosePurchaseIdFromLocation === purchase._id
          return {
            ...purchase,
            disabled: false,
            checked: isChoosePurchaseFromLocation || Boolean(extendedPurchasesObject[purchase._id]?.checked)
          }
        }) || []
      )
    })
  }, [purchasesInCart, choosePurchaseIdFromLocation])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  const handleCheck = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }

  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchases[purchaseIndex]
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }

  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchases[purchaseIndex]._id
    deletePurchasesMutation.mutate([purchaseId])
  }
  const handleDeleteManyPurchases = () => {
    const purchasesIds = checkedPurchases.map((purchase) => purchase._id)
    deletePurchasesMutation.mutate(purchasesIds)
  }
  const handleBuyPurchases = () => {
    if (checkedPurchases.length > 0) {
      const body = checkedPurchases.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyProductsMutation.mutate(body)
    }
  }

  return (
    <div className='bg-gray-100 py-16 dark:bg-blackSecond'>
      <Helmet>
        <title>{t('cart.cart shop')} | Clothing Shop</title>
        <meta name='description' content='Giỏ hàng của bạn trong Clothing Shop' />
      </Helmet>

      <div className='container'>
        {extendedPurchases.length > 0 ? (
          <>
            <div className='overflow-auto'>
              <div className='min-w-[1000px]'>
                <div className='grid grid-cols-12 rounded-md bg-white px-9 py-5 text-sm capitalize text-gray-500 shadow-md dark:bg-blackPrimary'>
                  <div className='col-span-6'>
                    <div className='flex items-center'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 cursor-pointer accent-lightBlue'
                          checked={isAllChecked}
                          onChange={handleCheckAll}
                        />
                      </div>
                      <div className='flex-grow text-black dark:text-white'>{t('cart:cart.product')}</div>
                    </div>
                  </div>

                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 text-center dark:text-white'>
                      <div className='col-span-2'>{t('cart:cart.unit price')}</div>
                      <div className='col-span-1'>{t('cart:cart.quantity')}</div>
                      <div className='col-span-1'>{t('cart:cart.total price')}</div>
                      <div className='col-span-1'>{t('cart:cart.actions')}</div>
                    </div>
                  </div>
                </div>

                {extendedPurchases.length > 0 && (
                  <div className='my-3 rounded-md bg-white p-5 shadow-md dark:bg-blackPrimary'>
                    {extendedPurchases?.map((purchase, index) => (
                      <div
                        key={purchase._id}
                        className='mb-5 grid grid-cols-12 rounded-sm border border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500 first:mt-0 dark:border-blackSecond dark:bg-blackPrimary dark:text-white'
                      >
                        <div className='col-span-6'>
                          <div className='flex'>
                            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                              <input
                                type='checkbox'
                                className='h-5 w-5 cursor-pointer accent-lightBlue'
                                checked={purchase.checked}
                                onChange={handleCheck(index)}
                              />
                            </div>

                            <div className='flex-grow'>
                              <div className='flex'>
                                <Link
                                  className='h-20 w-20 flex-shrink-0'
                                  to={`${path.home}${generateNameId({
                                    name: purchase.product.name,
                                    id: purchase.product._id
                                  })}`}
                                >
                                  <img alt={purchase.product.name} src={purchase.product.image} />
                                </Link>

                                <div className='flex-grow px-2 pb-2 pt-1'>
                                  <Link
                                    to={`${path.home}${generateNameId({
                                      name: purchase.product.name,
                                      id: purchase.product._id
                                    })}`}
                                    className='ml-2 line-clamp-2 text-left'
                                  >
                                    {purchase.product.name}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='col-span-6'>
                          <div className='grid grid-cols-5 items-center'>
                            <div className='col-span-2'>
                              <div className='flex items-center justify-center'>
                                <span className='text-gray-300 line-through'>
                                  ₫{formatCurrency(purchase.product.price_before_discount)}
                                </span>
                                <span className='ml-3 text-lightBlue'>₫{formatCurrency(purchase.product.price)}</span>
                              </div>
                            </div>

                            <div className='col-span-1'>
                              <QuantityController
                                max={purchase.product.quantity}
                                value={purchase.buy_count}
                                classNameWrapper='flex items-center'
                                onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                                onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                                onType={handleTypeQuantity(index)}
                                onFocusOut={(value) =>
                                  handleQuantity(
                                    index,
                                    value,
                                    value >= 1 &&
                                      value <= purchase.product.quantity &&
                                      value !== (purchasesInCart as Purchase[])[index].buy_count
                                  )
                                }
                                disabled={purchase.disabled}
                              />
                            </div>

                            <div className='col-span-1'>
                              <span className='text-lightBlue'>
                                ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                              </span>
                            </div>

                            <div className='col-span-1'>
                              <button
                                className='bg-none text-black transition-colors hover:text-lightBlue dark:text-white'
                                onClick={handleDelete(index)}
                              >
                                {t('cart:cart.delete')}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-md border border-gray-100 bg-white p-5 shadow-md dark:border-blackSecond dark:bg-blackPrimary sm:flex-row sm:items-center'>
              <div className='flex items-center'>
                <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                  <input
                    type='checkbox'
                    className='h-5 w-5 cursor-pointer accent-lightBlue'
                    checked={isAllChecked}
                    onChange={handleCheckAll}
                  />
                </div>
                <button className='mx-3 border-none bg-none dark:text-white' onClick={handleCheckAll}>
                  {t('cart:cart.select all')} ({extendedPurchases.length})
                </button>
                <button className='mx-3 border-none bg-none dark:text-white' onClick={handleDeleteManyPurchases}>
                  {t('cart:cart.delete')}
                </button>
              </div>

              <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
                <div>
                  <div className='flex items-center sm:justify-end'>
                    <div className='dark:text-white'>
                      {t('cart:cart.total')} ({checkedPurchasesCount} {t('cart:cart.item')}):
                    </div>
                    <div className='ml-2 text-2xl text-lightBlue'>₫{formatCurrency(totalCheckedPurchasePrice)}</div>
                  </div>
                  <div className='flex items-center text-sm sm:justify-end'>
                    <div className='text-gray-500'>{t('cart:cart.saved')}</div>
                    <div className='ml-6 text-lightBlue'>₫{formatCurrency(totalCheckedPurchaseSavingPrice)}</div>
                  </div>
                </div>
                <Button
                  className='mt-5 flex h-10 w-52 items-center justify-center bg-lightBlue text-sm uppercase text-white hover:bg-lightBlue/80 sm:ml-4 sm:mt-0'
                  onClick={handleBuyPurchases}
                  disabled={buyProductsMutation.isLoading}
                >
                  {t('cart:cart.check out')}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className='text-center'>
            <img src={noproduct} alt='no purchase' className='mx-auto h-24 w-24' />
            <div className='mt-5 font-bold text-gray-400 dark:text-white'>{t('cart:cart.shopping cart')}</div>
            <div className='mt-5 text-center'>
              <Link
                to={path.home}
                className='rounded-sm bg-lightBlue px-10 py-3 capitalize text-white transition-all hover:bg-lightBlue/80'
              >
                {t('cart:cart.go shopping now')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
