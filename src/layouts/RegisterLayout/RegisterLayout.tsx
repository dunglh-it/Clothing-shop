import { memo } from 'react'
import { Outlet } from 'react-router-dom'

interface Props {
  children?: React.ReactNode
}

function RegisterLayoutInner({ children }: Props) {
  return (
    <div>
      {children}
      <Outlet />
    </div>
  )
}

const RegisterLayout = memo(RegisterLayoutInner)

export default RegisterLayout
