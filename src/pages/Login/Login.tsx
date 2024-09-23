import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import iconImage from 'src/assets/images/icon-signin.svg'
import logoLight from 'src/assets/images/logo-light.png'
import { Omit } from 'lodash'
import { schema, Schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { authApi } from 'src/apis/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import Input from 'src/components/Input'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'

type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.login(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data

          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
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
            <div className='text-3xl font-medium'>Đăng nhập</div>

            <div className='mt-2 text-sm font-medium'>Chào mừng bạn quay lại đăng nhập. </div>

            <Input
              name='email'
              register={register}
              type='email'
              className='mt-14'
              classNameInput='w-[460px] outline-none border border-gray-300 focus:border-gray-500 rounded-lg focus:shadow-sm p-3'
              errorMessage={errors.email?.message}
              placeholder='Email'
            />

            <Input
              name='password'
              register={register}
              type='password'
              className='mt-3'
              classNameInput='w-[460px] outline-none border border-gray-300 focus:border-gray-500 rounded-lg focus:shadow-sm p-3'
              errorMessage={errors.password?.message}
              placeholder='Password'
              autoComplete='on'
            />

            <div className='mt-9 flex items-center justify-center'>
              <Button
                type='submit'
                className='text-md flex w-[460px] items-center justify-center rounded-lg bg-lightBlue px-2 py-4 text-center font-medium uppercase text-white hover:bg-lightBlue/70'
                isLoading={loginMutation.isLoading}
                disabled={loginMutation.isLoading}
              >
                Đăng nhập
              </Button>
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
