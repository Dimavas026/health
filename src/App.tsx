import React, { useEffect, useState } from 'react'
import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom'
import { useObserver } from 'mobx-react'
import { privateRoutes, publicRoutes } from './roots/publicRoots'

import { useStores } from './store/root'
import './app.scss'
import { Admin } from './pages/admin/admin'
import { Header } from './components/header/header'

function App() {
  const { authStore } = useStores()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    authStore.checkAuth().then((_) => {
      setIsLoading(false)
    })
  }, [authStore])

  return useObserver(() => (
    <div>
      <BrowserRouter>
        <Header />
        {isLoading
          ? 'Загрузка...'
          : (
            <Switch>
              {authStore.isAuth
                ? (
                  <>
                    {privateRoutes.map((route) => (
                      <Route path={route.path} exact={route.exact} component={route.component} />
                    ))}
                    <Route path="/admin" component={Admin} />
                    {/* <Redirect to="/" /> */}
                  </>
                )
                : (
                  <>
                    {publicRoutes.map((route) => (
                      <Route path={route.path} exact={route.exact} component={route.component} />
                    ))}
                    {/* <Redirect to="/login" /> */}
                  </>
                )}
              {/* <Redirect to="/login" /> */}
            </Switch>
          )}
      </BrowserRouter>
    </div>
  ))
}

export default App

// todo
// авторизация
// кнопка скрытия меню
// responsive layout
// редактирование пользователя
