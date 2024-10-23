import Product from './components/Product/Product'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import { ProductListConfig } from 'src/types/product.type'
import categoryApi from 'src/apis/category.api'
import AsideFilter from './components/AsideFilter'
import SortProductList from './components/SortProductList'
import useQueryConfig from 'src/hooks/useQueryConfig'

export default function ProductList() {
  const queryConfig = useQueryConfig()

  const { data: productData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },

    keepPreviousData: true
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  return (
    <div className='bg-gray-100 py-6 dark:bg-blackSecond'>
      <div className='container'>
        {productData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-4 md:col-span-2'>
              <AsideFilter queryConfig={queryConfig} categories={categoriesData?.data.data || []} />
            </div>

            <div className='col-span-8 md:col-span-10'>
              <SortProductList queryConfig={queryConfig} pageSize={productData.data.data.pagination.page_size} />

              <div className='mt-6 grid grid-cols-2 gap-2 shadow-md md:grid-cols-4 md:gap-4 lg:grid-cols-5'>
                {productData.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>

              <Pagination queryConfig={queryConfig} pageSize={productData.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
