import React, { useEffect, useState } from 'react'
import { IProduct } from '../../models/product'
import { ProductService } from '../../services/product'
import { Icons } from '../../common/Icons'
import './product-list.scss'

export const ProductList = () => {
  const [productList, setProductList] = useState<IProduct[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    ProductService.getProductList()
      .then((response) => {
        setProductList(response.data)
        setIsLoading(false)
      })
  }, [])

  return (
    <div className="product-list">
      {!isLoading
        ? (
          <>
            {productList.map((product) => (
              <Product
                product={{
                  name: product.name,
                  id: product.id,
                }}
              />
            ))}
          </>
        ) : (
          <div><Icons.Spinner width={40} height={40} /></div>
        )}
    </div>
  )
}

interface ProductProps {
  product: Partial<IProduct>
}

export const Product: React.FC<ProductProps> = ({ product }) => (
  <div className="product">
    <div className="product__name">
      <span className="product__title">name:&nbsp;</span>
      <span>{product.name}</span>
    </div>
    <div className="product__actions">
      <div className="product__trash" onClick={() => ProductService.deleteProduct(product.id || '')}>
        <Icons.Trash width={16} height={16} />
      </div>
    </div>
  </div>
)
