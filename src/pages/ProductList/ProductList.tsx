import useQueryParams from 'src/hooks/useQueryParams'
import AsideFilter from '../AsideFilter'
import Product from '../Product/Product'
import SortProductList from '../SortProductList'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import { useState } from 'react'
import Pagination from 'src/components/Pagination'

export default function ProductList() {
  const queryParams = useQueryParams()
  const [page, setPage] = useState(1)

  const { data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => {
      return productApi.getProducts(queryParams)
    }
  })

  return (
    <div className='bg-gray-50/50 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-2'>
            <AsideFilter />
          </div>

          <div className='col-span-10'>
            <SortProductList />

            <div className='mt-6 grid grid-cols-5 gap-4 shadow-md'>
              {data &&
                data.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
            </div>

            <Pagination page={page} setPage={setPage} pageSize={7} />
          </div>
        </div>
      </div>
    </div>
  )
}
