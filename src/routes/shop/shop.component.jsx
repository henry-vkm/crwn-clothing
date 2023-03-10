import { useContext } from "react";
import { ProductsContext } from "../../context/products.context";
import ProductCard from "../../components/product-card/product-card.component";
import './shop.styles.scss';

const Shop = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className='products-card-container'>
      {
        products.map((product) => {
          return (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          )
        })
      }
    </div>
  )
}

export default Shop;