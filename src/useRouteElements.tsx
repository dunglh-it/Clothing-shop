import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Home from './pages/Home'
import RegisterLayout from './layouts/RegisterLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import MainLayout from './layouts/MainLayout/MainLayout'
import Profile from './pages/Profile'
import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
import path from './constants/path'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import CartLayout from './layouts/CartLayout'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },

        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },

    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        },

        {
          path: path.product,
          element: (
            <MainLayout>
              <ProductList />
            </MainLayout>
          )
        },

        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        }
      ]
    },

    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },

    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      )
    }
  ])

  return routeElements
}
