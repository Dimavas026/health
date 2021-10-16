import { AxiosResponse } from 'axios'
import { api } from '../api'
import { IUser } from '../models/user'

export class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return api.post<{ email: string; password: string }, AxiosResponse<AuthResponse>>('/login', { email, password })
  }

  static async logout(): Promise<AxiosResponse> {
    return api.get('/logout')
  }

  static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return api.post<{ email: string; password: string }, AxiosResponse<AuthResponse>>('/registration', { email, password })
  }

  static async refresh(): Promise<AxiosResponse<AuthResponse>> {
    return api.get<any>('/refresh')
  }

  static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return api.get<IUser[]>('/users')
  }
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: IUser
}
