import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
import ScrollToTopButton from 'src/components/ScrollToTopButton/ScrollToTopButton'

interface Props {
  children?: React.ReactNode
}

function MainLayoutInner({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
      <Outlet />
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}

const MainLayout = memo(MainLayoutInner)

export default MainLayout
