import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { CartContext } from '../../context/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);

  const navigate = useNavigate();

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {
          cartItems.map((cartItem) => {
            return (
              <CartItem cartItem={cartItem}/>
            )
          })
        }
      </div>
      <Button onClick={() => navigate('/checkout')}>Go to Checkout</Button>
    </div>
  )
}

export default CartDropdown;