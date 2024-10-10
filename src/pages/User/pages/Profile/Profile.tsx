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
        <div className='truncate pt-3 capitalize dark:text-gray-400 sm:w-[20%] sm:text-right'>
          {t('my account info.name')}
        </div>
        <div className='sm:w-[80%] sm:pl-5'>
          <Input
            classNameInput='w-full rounded-sm border border-gray-300 dark:text-gray-400 dark:bg-blackSecond dark:border-transparent px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
            register={register}
            name='name'
            placeholder={t('my account info.name')}
            errorMessage={errors.name?.message}
          />
        </div>
      </div>
      <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
        <div className='truncate pt-3 capitalize dark:text-gray-400 sm:w-[20%] sm:text-right'>
          {t('my account info.phone number')}
        </div>
        <div className='sm:w-[80%] sm:pl-5'>
          <Controller
            control={control}
            name='phone'
            render={({ field }) => (
              <InputNumber
                classNameInput='dark:bg-blackSecond dark:border-transparent w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm dark:text-gray-400'
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
    <div className='rounded-md bg-white px-2 pb-10 shadow-md dark:bg-blackPrimary md:px-7 md:pb-20'>
      <Helmet>
        <title>{t('profile info.my account')} | Clothing Shop</title>
        <meta name='description' content='Thông tin tài khoản của bạn' />
      </Helmet>

      <div className='border-b border-b-gray-200 py-6 dark:border-b-gray-400'>
        <h1 className='text-lg font-medium capitalize text-gray-900 dark:text-white'>
          {t('my account info.my profile')}
        </h1>
        <div className='mt-1 text-sm text-gray-700 dark:text-gray-500'>
          {t('my account info.manage profile information')}
        </div>
      </div>

      <FormProvider {...methods}>
        <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
          <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
            <div className='flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize dark:text-gray-400 sm:w-[20%] sm:text-right'>Email</div>

              <div className='sm:w-[80%] sm:pl-5'>
                <div className='rounded-sm px-3 py-2 pt-3 text-gray-700 dark:bg-blackSecond dark:text-gray-400'>
                  {profile?.email}
                </div>
              </div>
            </div>

            <Info />

            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize dark:text-gray-400 sm:w-[20%] sm:text-right'>
                {t('my account info.address')}
              </div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 dark:bg-blackSecond dark:text-gray-400 dark:border-blackSecond focus:shadow-sm'
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
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
              <div className='sm:w-[80%] sm:pl-5'>
                <Button
                  className='flex h-9 items-center rounded-sm bg-lightBlue px-5 text-center text-sm text-white hover:bg-lightBlue/80'
                  type='submit'
                >
                  {t('save')}
                </Button>
              </div>
            </div>
          </div>
          <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200 dark:md:border-l-gray-400'>
            <div className='flex flex-col items-center'>
              <div className='my-5 h-24 w-24'>
                <img
                  src={previewImage || getAvatarUrl(avatar)}
                  alt=''
                  className='h-full w-full rounded-full object-cover'
                />
              </div>

              <InputFile onChange={handleChangeFile} />

              <div className='mt-3 text-gray-400'>
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
