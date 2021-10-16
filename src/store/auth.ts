import { makeAutoObservable } from 'mobx'
import { IUser } from '../models/user'
import { AuthService } from '../services/auth'

export class AuthStore {
  user: IUser = {} as IUser

  isAuth: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  static async fetchUsers() {
    try {
      await AuthService.fetchUsers()
    } catch (e) {
      console.log(e)
    }
  }

  setUser(user: IUser) {
    this.user = user
  }

  setIsAuth(isAuth: boolean) {
    this.isAuth = isAuth
  }

  async login(login: string, password: string): Promise<void> {
    try {
      const response = await AuthService.login(login, password)
      localStorage.setItem('accessToken', response.data.accessToken)
      this.setIsAuth(true)
      this.setUser(response.data.user)
    } catch (e) {
      console.log(e)
    }
  }

  async checkAuth(): Promise<void> {
    try {
      const response = await AuthService.refresh()
      localStorage.setItem('accessToken', response.data.accessToken)
      this.setIsAuth(true)
    } catch (e) {
      console.log(e)
    }
  }

  async registration(login: string, password: string): Promise<void> {
    try {
      const response = await AuthService.registration(login, password)
      localStorage.setItem('accessToken', response.data.accessToken)
      this.setIsAuth(true)
      this.setUser(response.data.user)
    } catch (e) {
      console.log(e)
    }
  }

  async logout() {
    try {
      await AuthService.logout()
      localStorage.removeItem('accessToken')
      this.setIsAuth(false)
      this.setUser({} as IUser)
    } catch (e) {
      console.log(e)
    }
  }
}
