import { useRoutes } from 'react-router-dom'
import Home from './pages/Home'
import RegisterLayout from './layouts/RegisterLayout'
import Login from './pages/Login'
import Register from './pages/Register'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      index: true,
      element: <Home />
    },

    {
      path: '/login',
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },

    {
      path: '/register',
      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    }
  ])

  return routeElements
}
