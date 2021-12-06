import React, { useState } from 'react'
import { IProduct } from '../../models/product'
import { ProductService } from '../../services/product'
import { Input } from '../admin/components/input/input'
import './product-form.scss'
import { Button } from '../admin/components/button/button'

export const ProductForm = () => {
  const [name, setName] = useState('')
  const [productWeight, setProductWeight] = useState('')
  const [proteinsWeight, setProteinsWeight] = useState('')
  const [fatsWeight, setFatsWeight] = useState('')
  const [carbohydratesWeight, setCarbohydratesWeight] = useState('')
  const handleSubmit = (e: any) => {
    e.preventDefault()
    const product: IProduct = {
      name,
      productWeight: parseInt(productWeight, 10),
      proteinsWeight: parseInt(proteinsWeight, 10),
      fatsWeight: parseInt(fatsWeight, 10),
      carbohydratesWeight: parseInt(carbohydratesWeight, 10),
    }
    ProductService.createProduct(product)
      .then((response) => console.log(response.data))
  }
  return (
    <div className="product-form">
      <form className="product-form__form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">
            Name
            <Input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        </div>
        <div>
          <label htmlFor="productWeight">
            Product Weight
            <Input
              type="text"
              name="productWeight"
              id="productWeight"
              value={productWeight}
              onChange={(e) => setProductWeight(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="proteinsWeight">
            Proteins Weight
            <Input
              type="text"
              name="proteinsWeight"
              id="proteinsWeight"
              value={proteinsWeight}
              onChange={(e) => setProteinsWeight(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="fatsWeight">
            Fats Weight
            <Input
              type="text"
              name="fatsWeight"
              id="fatsWeight"
              value={fatsWeight}
              onChange={(e) => setFatsWeight(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="carbohydratesWeight">
            CH Weight
            <Input
              type="text"
              name="carbohydratesWeight"
              value={carbohydratesWeight}
              id="carbohydratesWeight"
              onChange={(e) => setCarbohydratesWeight(e.target.value)}
            />
          </label>
        </div>
        <div className="product-form__button">
          <Button onClick={() => null} type="submit">
            Create
          </Button>
        </div>
      </form>
    </div>
  )
}
