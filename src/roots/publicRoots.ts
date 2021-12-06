import { IRoot } from './root'
import { Home } from '../pages/home/home'
import { Login } from '../pages/login/login'
import { ProductForm } from '../pages/product-form/product-form'
import { ProductList } from '../pages/product-list/product-list'
import { DishForm } from '../pages/dish-form/dish-form'
// import { Admin } from '../pages/admin/admin'

export const publicRoutes: IRoot[] = [
  {
    path: '/login',
    exact: true,
    component: Login,
  },
]

export const privateRoutes: IRoot[] = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/product/create',
    exact: true,
    component: ProductForm,
  },
  {
    path: '/product/list',
    exact: true,
    component: ProductList,
  },
  {
    path: '/dish/create',
    exact: true,
    component: DishForm,
  },
  // {
  //   path: '/admin',
  //   exact: true,
  //   component: Admin,
  // },
]
