import React from 'react'
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom'
import { publicRoutes } from './roots/publicRoots'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          {publicRoutes.map((route) => (
            <Route path={route.path} exact={route.exact} component={route.component} />
          ))}
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
