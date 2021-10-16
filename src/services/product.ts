import { AxiosResponse } from 'axios'
import { api } from '../api'
import { IProduct } from '../models/product'
import { stringifyObject } from '../utils/stringifyObject'

const baseUrl = 'http://52.14.120.53:9091/api/web/products'
export class ProductService {
  static async getProduct(id: string): Promise<AxiosResponse<IProduct>> {
    return api.get<IProduct>(`${baseUrl}/${id}`)
  }

  static async deleteProduct(id: string) {
    return api.delete<any>(`${baseUrl}/${id}`)
  }

  static async patchProduct(id: string, args: Record<string, string>) {
    const parameters = stringifyObject(args)
    return api.patch<any>(`${baseUrl}/${id}?${parameters}`)
  }

  static async getProductList(): Promise<AxiosResponse<IProduct[]>> {
    return api.get<IProduct[]>(`${baseUrl}/list`)
  }
}
