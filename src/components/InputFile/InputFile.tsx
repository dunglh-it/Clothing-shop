import { Fragment, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import config from 'src/constants/config'
interface Props {
  onChange?: (file?: File) => void
}
export default function InputFile({ onChange }: Props) {
  const { t } = useTranslation(['profile'])

  const fileInputRef = useRef<HTMLInputElement>(null)
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    if (fileFromLocal && (fileFromLocal.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))) {
      toast.error(
        `${t('profile:my account info.file size')} 1MB. ${t('profile:my account info.file extension')}: .JPEG, .PNG`,
        {
          position: 'top-center'
        }
      )
    } else {
      onChange && onChange(fileFromLocal)
    }
  }
  const handleUpload = () => {
    fileInputRef.current?.click()
  }
  return (
    <Fragment>
      <input
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        ref={fileInputRef}
        onChange={onFileChange}
        onClick={(event) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(event.target as any).value = null
        }}
      />
      <button
        className='flex h-6 items-center justify-end rounded-sm border bg-white px-4 text-[10px] text-gray-600 shadow-sm dark:bg-blackSecond dark:text-gray-400 md:h-8 md:px-5 md:text-xs lg:h-10 lg:px-6 lg:text-sm'
        type='button'
        onClick={handleUpload}
      >
        {t('my account info.select image')}
      </button>
    </Fragment>
  )
}
