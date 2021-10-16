import React from 'react'
import { AuthStore } from './auth'

class RootStore {
  authStore: AuthStore = {} as AuthStore

  constructor() {
    this.authStore = new AuthStore()
  }
}

const StoresContext = React.createContext(new RootStore())

export const useStores = () => React.useContext(StoresContext)
