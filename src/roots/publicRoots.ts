import { Root } from './root'
import { Home } from '../pages/home/home'
import { Login } from '../pages/login/login'

export const publicRoutes: Root[] = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/login',
    exact: false,
    component: Login,
  },
]
