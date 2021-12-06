import React, { useEffect } from 'react'
import Select from 'react-select'
import { Input } from '../admin/components/input/input'
import './dish-form.scss'
import { ProductService } from '../../services/product'
import { IProduct } from '../../models/product'
import { customStyles } from '../admin/components/users/edit/edit'

export const DishForm = () => {
  const [productList, setProductList] = React.useState<IProduct[]>([])
  const [selectedProductName, setSelectedProductName] = React.useState('')
  const [name, setName] = React.useState('')

  useEffect(() => {
    ProductService.getProductList().then((response) => {
      setProductList(response.data)
    })
  }, [])

  return (
    <div className="product-form">
      <form className="product-form__form" onSubmit={() => null}>
        <div>
          <label htmlFor="name">
            Name
            <Input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        </div>
        <div>
          <Select
            value={
              {
                value: selectedProductName,
                label: selectedProductName,
              }
            }
            styles={customStyles}
            onChange={(value) => setSelectedProductName(value?.label || '')}
            options={
              productList.map((product) => ({
                value: product.name || '',
                label: product.name || '',
              }))
            }
          />
        </div>
      </form>
    </div>
  )
}
