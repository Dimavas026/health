import React, { useEffect, useState } from 'react'
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom'
import { publicRoutes } from './roots/publicRoots'
import { useStores } from './store/root'

function App() {
  const { authStore } = useStores()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    authStore.checkAuth().then((_) => {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    })
  }, [authStore])

  return (
    <div>
      <BrowserRouter>
        {isLoading
          ? 'Загрузка...'
          : (
            <Switch>
              {publicRoutes.map((route) => (
                <Route path={route.path} exact={route.exact} component={route.component} />
              ))}
              <Redirect to="/" />
            </Switch>
          )}
      </BrowserRouter>
    </div>
  )
}

export default App
