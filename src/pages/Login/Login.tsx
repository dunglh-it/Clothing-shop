import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import iconImage from 'src/assets/images/icon-signin.svg'
import logoLight from 'src/assets/images/logo-light.png'

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = handleSubmit((data) => {})

  return (
    <div className='bg-white'>
      <div className='grid h-screen grid-cols-1 lg:grid-cols-12'>
        <div className='flex flex-col items-center justify-center bg-gray-50 lg:col-span-6'>
          <img src={iconImage} alt='Sign Up' />
          <div className='lg:mt-12 lg:w-[412px] lg:text-center lg:text-lg lg:font-medium'>
            Giá trị thương hiệu cao cấp nhất, sản phẩm chất lượng cao và dịch vụ sáng tạo
          </div>
        </div>

        <div className='flex flex-col items-center justify-center lg:col-span-6'>
          <Link to='/'>
            <img src={logoLight} alt='Logo Light' className='h-8 w-[190px]' />
          </Link>

          <form className='mt-12 w-full text-center' onSubmit={onSubmit}>
            <div className='text-3xl font-medium'>Đăng nhập</div>

            <div className='mt-2 text-sm font-medium'>Chào mừng bạn quay lại đăng nhập. </div>

            <div className='mt-14'>
              <input
                type='email'
                name='email'
                className='w-[460px] rounded-lg border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                placeholder='Email'
              />
              <div className='mt-2 min-h-[1rem] text-sm text-red-600'></div>
            </div>

            <div className='mt-3'>
              <input
                type='password'
                name='password'
                autoComplete='on'
                className='w-[460px] rounded-lg border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                placeholder='Mật khẩu'
              />
              <div className='mt-2 min-h-[1rem] text-sm text-red-600'></div>
            </div>

            <div className='mt-9'>
              <button
                type='submit'
                className='text-md w-[460px] rounded-lg bg-yellow px-2 py-4 text-center font-medium uppercase text-black hover:bg-yellow/70'
              >
                Đăng nhập
              </button>
            </div>
            <div className='mt-8 flex items-center justify-center'>
              <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
              <Link className='ml-1 font-medium text-blue' to='/register'>
                Đăng ký
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
