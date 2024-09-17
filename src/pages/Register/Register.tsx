import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import iconImage from 'src/assets/images/icon-signin.svg'
import logoLight from 'src/assets/images/logo-light.png'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, Schema } from 'src/utils/rules'
import Input from 'src/components/Input'
import { registerAccount } from 'src/apis/auth.api'
import { useMutation } from '@tanstack/react-query'
import { omit, Omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ResponseApi } from 'src/types/utils.type'

type FormData = Schema

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
      },

      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data

          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

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

          <form className='mt-12 w-full text-center' onSubmit={onSubmit} noValidate>
            <div className='text-3xl font-medium'>Đăng ký</div>

            <div className='mt-2 text-sm font-medium'>Hãy tạo tài khoản của bạn và Mua sắm. </div>

            <Input
              name='email'
              register={register}
              type='email'
              className='mt-14'
              errorMessage={errors.email?.message}
              placeholder='Email'
            />

            <Input
              name='password'
              register={register}
              type='password'
              className='mt-3'
              errorMessage={errors.password?.message}
              placeholder='Mật khẩu'
              autoComplete='on'
            />

            <Input
              name='confirm_password'
              register={register}
              type='password'
              className='mt-3'
              errorMessage={errors.confirm_password?.message}
              placeholder='Nhập lại mật khẩu'
              autoComplete='on'
            />

            <div className='mt-9'>
              <button
                type='submit'
                className='text-md w-[460px] rounded-lg bg-yellow px-2 py-4 text-center font-medium uppercase text-black hover:bg-yellow/70'
              >
                Đăng ký
              </button>
            </div>
            <div className='mt-8 flex items-center justify-center'>
              <span className='text-gray-400'>Bạn đã có tài khoản?</span>
              <Link className='ml-1 font-medium text-blue' to='/login'>
                Đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
