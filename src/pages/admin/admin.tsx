import React, { FC, useEffect, useState } from 'react'
import './admin.scss'
import {
  Redirect, Route, Switch, useHistory,
} from 'react-router-dom'
import classNames from 'classnames'
import { Icons } from '../../common/Icons'
import { Users } from './components/users/users'

interface MenuElementProps {
  Icon?: any
  title: string
  path?: string
  menuReduced: boolean
}

export const MenuElement: FC<MenuElementProps> = ({
  title, path, Icon, menuReduced,
}) => {
  const history = useHistory()

  const handleClick = () => {
    path && history.push(path)
  }

  return (
    <div className="menu-element" onClick={handleClick}>
      {Icon
      && (
      <div>
        <Icon width={30} height={30} />
      </div>
      )}
      <div className={classNames('menu-element__title', { 'menu-element__title--hidden': menuReduced })}>
        {title}
      </div>
    </div>
  )
}

export const Menu = () => {
  const categories = [
    {
      title: 'Our Company',
    },
    {
      path: '/admin/users',
      title: 'пользователи',
      icon: Icons.Users,
    },
    {
      path: '',
      title: 'выйти',
      icon: Icons.Logout,
    },
  ]
  const menuReduceSize = 1100

  const [menuReduced, setMenuReduced] = useState(false)
  let prevWidth = window.innerWidth

  useEffect(() => {
    if (window.innerWidth < menuReduceSize) {
      setMenuReduced(true)
    } else {
      setMenuReduced(false)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleMenuClick = () => {
    setMenuReduced((prev) => !prev)
  }

  const handleResize = (e: any) => {
    if (e.target.innerWidth < menuReduceSize && prevWidth >= menuReduceSize) {
      setMenuReduced(true)
    } else if (e.target.innerWidth >= menuReduceSize && prevWidth < menuReduceSize) {
      setMenuReduced(false)
    }
    prevWidth = window.innerWidth
  }

  return (
    <div className={classNames('menu', {
      'menu--reduced': menuReduced,
    })}
    >
      {categories.map((category) => (
        <MenuElement path={category.path} title={category.title} Icon={category.icon} menuReduced={menuReduced} />
      ))}
      <div
        className={classNames('menu__icon', {
          'menu__icon--reduced': menuReduced,
        })}
        onClick={handleMenuClick}
      >
        <Icons.Menu width={40} height={40} />
      </div>
    </div>
  )
}

export const Admin = () => (
  <div className="admin">
    <div className="admin__menu">
      <Menu />
    </div>
    <div className="admin__control-panel">
      <Switch>
        <Route path="/admin/users" component={Users} />
        <Redirect to="/admin" />
      </Switch>
    </div>
  </div>
)
