import { AxiosResponse } from 'axios'
import { api } from '../api'
import { IUser } from '../models/user'
import { IRoles } from '../models/roles'

export class UserService {
  static async getUsers(): Promise<AxiosResponse<IUser[]>> {
    return api.get<IUser[]>('/getUsers')
  }

  static async deleteUser(id: string): Promise<AxiosResponse<IUser>> {
    return api.delete<IUser>(`/user/${id}`)
  }

  static async getRoles(): Promise<AxiosResponse<IRoles[]>> {
    return api.get<IRoles[]>('/getRoles')
  }

  static async getUser(id: string): Promise<AxiosResponse<IUser>> {
    return api.get<IUser>(`user/${id}`)
  }

  static async patchUser(id: string, email: string, roles: string[]): Promise<AxiosResponse<IUser>> {
    return api.patch<IUser>(`user/${id}/${email}/${roles}`)
  }
}
