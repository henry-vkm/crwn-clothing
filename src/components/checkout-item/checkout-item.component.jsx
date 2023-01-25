import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
  const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);

  const { name, imageUrl, price, quantity } = cartItem;

  const clearItemFromCartHandler = () => clearItemFromCart(cartItem);
  const addItemToCartHandler = () => addItemToCart(cartItem);
  const removeItemFromCartHandler = () => removeItemFromCart(cartItem);

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={removeItemFromCartHandler}>&#10094;</div>
        <div className='value'>{quantity}</div>
        <div className='arrow' onClick={addItemToCartHandler}>&#10095;</div>
      </span>
      <span className='price'>{price}</span>
      <span className='remove-button' onClick={clearItemFromCartHandler}>&#10005;</span>
    </div>
  );
}

export default CheckoutItem;