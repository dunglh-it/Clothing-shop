import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import iconImage from 'src/assets/images/icon-signin.svg'
import logoLight from 'src/assets/images/logo-light.png'
import logoDark from 'src/assets/images/logo-dark.png'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, Schema } from 'src/utils/rules'
import Input from 'src/components/Input'
import { authApi } from 'src/apis/auth.api'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

export default function Register() {
  const { t } = useTranslation(['account', 'profile'])

  const [isDarkMode, setIsDarkMode] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const getBodyMode = () => {
      return document.body.classList.contains('dark') ? 'dark' : 'light'
    }

    setIsDarkMode(getBodyMode())

    const observer = new MutationObserver(() => {
      setIsDarkMode(getBodyMode())
    })

    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },

      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
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
    <div className='bg-white dark:bg-blackSecond'>
      <Helmet>
        <title>{t('sign up')} | Clothing Shop</title>
        <meta name='description' content='Đăng ký để vào dự án Clothing Shop' />
      </Helmet>

      <div className='grid h-screen grid-cols-1 lg:grid-cols-12'>
        <div className='hidden flex-col items-center justify-center bg-gray-50 dark:bg-blackPrimary lg:col-span-6 lg:flex'>
          <img src={iconImage} alt='Sign Up' />
          <div className='dark:text-gray-500 lg:mt-12 lg:w-[412px] lg:text-center lg:text-lg lg:font-medium'>
            {t('login.brand value')}
          </div>
        </div>

        <div className='flex flex-col items-center justify-center lg:col-span-6'>
          <Link to='/'>
            {isDarkMode === 'dark' ? (
              <img src={logoDark} alt='Logo Dark' className='h-8 w-[190px] object-cover' />
            ) : (
              <img src={logoLight} alt='Logo Light' className='h-8 w-[190px] object-cover' />
            )}
          </Link>

          <form className='mt-12 w-[460px] max-w-full px-6 text-center' onSubmit={onSubmit} noValidate>
            <div className='text-3xl font-medium dark:text-gray-400'>{t('sign up')}</div>

            <div className='mb-6 mt-2 text-sm font-medium dark:text-gray-500'>{t('create shop')}.</div>

            <Input
              name='email'
              register={register}
              type='email'
              className='mt-14'
              classNameInput='w-full outline-none border dark:text-gray-400 dark:bg-transparent border-gray-300 focus:border-gray-500 rounded-lg focus:shadow-sm p-3 dark:text-white'
              errorMessage={errors.email?.message}
              placeholder='Email'
            />

            <Input
              name='password'
              register={register}
              type='password'
              className='mt-3'
              classNameInput='w-full outline-none border dark:bg-transparent border-gray-300 focus:border-gray-500 rounded-lg focus:shadow-sm p-3 dark:text-gray-400'
              classNameEye='absolute right-[10px] h-5 w-5 cursor-pointer top-[12px] dark:text-gray-400'
              errorMessage={errors.password?.message}
              placeholder={t('profile:password.pass')}
              autoComplete='on'
            />

            <Input
              name='confirm_password'
              register={register}
              type='password'
              className='mt-3'
              classNameInput='w-full outline-none border dark:bg-transparent border-gray-300 focus:border-gray-500 rounded-lg focus:shadow-sm p-3 dark:text-gray-400'
              classNameEye='absolute right-[10px] h-5 w-5 cursor-pointer top-[12px] dark:text-gray-400'
              errorMessage={errors.confirm_password?.message}
              placeholder={t('profile:password.re-enter the password')}
              autoComplete='on'
            />

            <div className='mt-9 flex items-center justify-center'>
              <Button
                type='submit'
                className='text-md flex w-full items-center justify-center rounded-lg bg-lightBlue px-2 py-4 text-center font-medium uppercase text-white hover:bg-lightBlue/70'
                isLoading={registerAccountMutation.isLoading}
                disabled={registerAccountMutation.isLoading}
              >
                {t('sign up')}
              </Button>
            </div>
            <div className='mt-8 flex items-center justify-center'>
              <span className='text-gray-400'>{t('account yet')}?</span>
              <Link className='ml-1 font-medium text-blue' to='/login'>
                {t('sign in')}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
