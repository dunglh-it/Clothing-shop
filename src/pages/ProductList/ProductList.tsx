import AsideFilter from '../AsideFilter'
import Product from '../Product/Product'
import SortProductList from '../SortProductList'

export default function ProductList() {
  return (
    <div className='bg-gray-50/50 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-2'>
            <AsideFilter />
          </div>

          <div className='col-span-10'>
            <SortProductList />

            <div className='mt-6 grid grid-cols-6'>
              {Array(30)
                .fill(0)
                .map((_, index) => (
                  <div className='col-span-1' key={index}>
                    <Product />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
