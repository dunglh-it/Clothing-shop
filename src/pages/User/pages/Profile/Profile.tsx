import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Fragment, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import userApi from 'src/apis/user.api'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { userSchema, UserSchema } from 'src/utils/rules'
import DateSelect from '../../components/DateSelect'
import Button from 'src/components/Button'
import { AppContext } from 'src/contexts/app.context'
import { setProfileToLS } from 'src/utils/auth'
import { toast } from 'react-toastify'
import { getAvatarUrl, isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import InputFile from 'src/components/InputFile'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

function Info() {
  const { t } = useTranslation(['profile'])

  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<FormData>()

  return (
    <Fragment>
      <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
        <div className='mb-2 truncate pt-0 text-xs capitalize dark:text-gray-400 sm:w-[20%] sm:text-right md:mb-0 md:pt-1 md:text-sm lg:pt-3 lg:text-base'>
          {t('my account info.name')}
        </div>
        <div className='sm:w-[80%] sm:pl-5'>
          <Input
            classNameInput='w-full rounded-sm border border-gray-300 dark:text-gray-400 dark:bg-blackSecond dark:border-transparent px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm text-xs md:text-sm lg:text-base'
            register={register}
            name='name'
            placeholder={t('my account info.name')}
            errorMessage={errors.name?.message}
          />
        </div>
      </div>
      <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
        <div className='md:pt-1text-xs mb-2 truncate pt-0 capitalize dark:text-gray-400 sm:w-[20%] sm:text-right md:mb-0 md:text-sm lg:pt-3 lg:text-base'>
          {t('my account info.phone number')}
        </div>
        <div className='sm:w-[80%] sm:pl-5'>
          <Controller
            control={control}
            name='phone'
            render={({ field }) => (
              <InputNumber
                classNameInput='dark:bg-blackSecond dark:border-transparent w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm dark:text-gray-400 text-xs md:text-sm lg:text-base'
                placeholder={t('my account info.phone number')}
                errorMessage={errors.phone?.message}
                {...field}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
    </Fragment>
  )
}

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>

type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}

const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])

export default function Profile() {
  const { t } = useTranslation(['profile'])

  const { setProfile } = useContext(AppContext)

  const [file, setFile] = useState<File>()
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })

  const profile = profileData?.data.data
  const updateProfileMutation = useMutation(userApi.updateProfile)

  const uploadAvatarMutaion = useMutation(userApi.uploadAvatar)

  const methods = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },

    resolver: yupResolver(profileSchema)
  })

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError
  } = methods

  const avatar = watch('avatar')

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadRes = await uploadAvatarMutaion.mutateAsync(form)
        avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      setProfile(res.data.data)
      setProfileToLS(res.data.data)
      refetch()
      toast.success(res.data.message)
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  return (
    <div className='rounded-md bg-white px-5 pb-10 shadow-md dark:bg-blackPrimary md:px-4 md:pb-20 lg:px-7'>
      <Helmet>
        <title>{t('profile info.my account')} | Clothing Shop</title>
        <meta name='description' content='Thông tin tài khoản của bạn' />
      </Helmet>

      <div className='border-b border-b-gray-200 py-4 dark:border-b-gray-400 md:px-0 md:py-5 lg:py-6'>
        <h1 className='text-sm font-medium capitalize text-gray-900 dark:text-white md:text-base lg:text-lg'>
          {t('my account info.my profile')}
        </h1>
        <div className='mt-1 text-[10px] text-gray-700 dark:text-gray-500 md:text-sm lg:text-sm'>
          {t('my account info.manage profile information')}
        </div>
      </div>

      <FormProvider {...methods}>
        <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
          <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
            <div className='flex flex-col flex-wrap sm:flex-row'>
              <div className='md:pt-1text-xs mb-2 truncate pt-0 capitalize dark:text-gray-400 sm:w-[20%] sm:text-right md:mb-0 md:text-sm lg:pt-3 lg:text-base'>
                Email
              </div>

              <div className='sm:w-[80%] sm:pl-5'>
                <div className='rounded-sm border px-3 py-2 pt-1 text-xs text-gray-700 dark:bg-blackSecond dark:text-gray-400 md:text-sm lg:text-base'>
                  {profile?.email}
                </div>
              </div>
            </div>

            <Info />

            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='mb-2 truncate pt-0 text-xs capitalize dark:text-gray-400 sm:w-[20%] sm:text-right md:mb-0 md:pt-1  md:text-sm lg:pt-3 lg:text-base'>
                {t('my account info.address')}
              </div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 dark:bg-blackSecond dark:text-gray-400 dark:border-blackSecond focus:shadow-sm text-xs md:text-sm lg:text-base'
                  register={register}
                  name='address'
                  placeholder={t('my account info.address')}
                  errorMessage={errors.address?.message}
                />
              </div>
            </div>

            <Controller
              control={control}
              name='date_of_birth'
              render={({ field }) => (
                <DateSelect
                  errorMessage={errors.date_of_birth?.message}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-1 capitalize sm:w-[20%] sm:text-right md:pt-2 lg:pt-3' />
              <div className='sm:w-[80%] sm:pl-5'>
                <Button
                  className='flex h-9 items-center rounded-sm bg-lightBlue px-5 text-center text-[10px] text-white hover:bg-lightBlue/80 md:text-xs lg:text-sm'
                  type='submit'
                >
                  {t('save')}
                </Button>
              </div>
            </div>
          </div>
          <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200 dark:md:border-l-gray-400'>
            <div className='flex flex-col items-center'>
              <div className='md:h-22 md:w-22 my-3 h-20 w-20 md:my-4 lg:my-5 lg:h-24 lg:w-24'>
                <img
                  src={previewImage || getAvatarUrl(avatar)}
                  alt=''
                  className='h-full w-full rounded-full object-cover'
                />
              </div>

              <InputFile onChange={handleChangeFile} />

              <div className='mt-3 text-xs text-gray-400 md:text-sm lg:text-base'>
                <div>{t('my account info.file size')} 1 MB</div>
                <div>{t('my account info.file extension')}:.JPEG, .PNG</div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
