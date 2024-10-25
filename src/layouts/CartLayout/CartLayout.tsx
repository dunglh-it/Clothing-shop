import CartHeader from 'src/components/CartHeader'
import Footer from 'src/components/Footer'
import ScrollToTopButton from 'src/components/ScrollToTopButton/ScrollToTopButton'

interface Props {
  children?: React.ReactNode
}
export default function CartLayout({ children }: Props) {
  return (
    <div>
      <div>
        <CartHeader />
        {children}
        <Footer />
        <ScrollToTopButton />
      </div>
    </div>
  )
}
