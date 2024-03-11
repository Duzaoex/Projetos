import React from 'react';
import { CarrinhoProp } from '../../types';

function CartList(props: CarrinhoProp) {
  const { cartList, updateCart, removeCartItem } = props;
  return (
    <ul>
      {cartList.map((cartItem) => (
        <li key={ cartItem.id }>
          <button
            data-testid="remove-product"
            onClick={ () => removeCartItem(cartItem) }
          >
            Remove

          </button>
          <img src={ cartItem.thumbnail } alt="" />
          <span data-testid="shopping-cart-product-name">{cartItem.title}</span>
          {' - '}
          <span data-testid="shopping-cart-product-quantity">
            <button
              data-testid="product-increase-quantity"
              onClick={ () => updateCart(cartItem, 'add') }
            >
              +

            </button>
            Qtd:
            {' '}
            {cartItem.quantity}
            <button
              data-testid="product-decrease-quantity"
              onClick={ () => updateCart(cartItem, 'sub') }
              disabled={ cartItem.quantity === 1 }
            >
              -

            </button>
          </span>
          <p>
            R$
            {' '}
            {(cartItem.price * cartItem.quantity).toFixed(2)}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default CartList;
