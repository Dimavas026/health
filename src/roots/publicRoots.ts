import { IRoot } from './root'
import { Home } from '../pages/home/home'
import { Login } from '../pages/login/login'

export const publicRoutes: IRoot[] = [
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
