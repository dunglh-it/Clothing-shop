export default function SortProductList() {
  return (
    <div className='rounded-sm bg-white px-3 py-4 shadow-md'>
      <div className='flex flex-wrap items-center justify-between gap-2 pl-5'>
        <div className='flex flex-wrap items-center gap-4'>
          <div>Sắp xếp theo:</div>

          <button className='h-8 rounded-sm bg-lightBlue px-4 text-center text-sm capitalize text-white hover:bg-lightBlue/80'>
            Phổ biến
          </button>

          <button className='h-8 rounded-sm bg-white px-4 text-center text-sm capitalize text-black shadow hover:bg-lightBlue hover:text-white'>
            Mới nhất
          </button>

          <button className='h-8 rounded-sm bg-white px-4 text-center text-sm capitalize text-black shadow hover:bg-lightBlue hover:text-white'>
            Bán chạy
          </button>

          <select
            className='h-8 cursor-pointer rounded-sm bg-white px-4 text-left text-sm capitalize text-black shadow outline-none hover:bg-lightBlue hover:text-white'
            defaultValue=''
          >
            <option value='' disabled>
              Giá
            </option>
            <option value='price:asc'>Giá: Thấp đến cao</option>
            <option value='price:desc'>Giá: Cao đến thấp</option>
          </select>
        </div>

        <div className='flex items-center justify-center'>
          <div>
            <span className='text-lightBlue'>1</span>
            <span>/2</span>
          </div>
          <div className='ml-2'>
            <button className='h-8 cursor-not-allowed rounded-bl-sm rounded-tl-sm bg-white/60 px-3 shadow hover:bg-lightBlue hover:text-white'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3 w-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </button>
            <button className='h-8 rounded-br-sm rounded-tr-sm bg-white px-3 shadow hover:bg-lightBlue hover:text-white'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3 w-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
