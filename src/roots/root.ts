import { ComponentType } from 'react'

export interface Root {
  path: string
  component: ComponentType
  exact: boolean
}
