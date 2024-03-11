import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CarrinhoProp } from '../../types';
import CartList from '../../components/cartList/CartList';

function Carrinho(props: CarrinhoProp) {
  const { cartList, updateCart, removeCartItem, getCartListFromStorage } = props;

  useEffect(() => {
    const listStorage = localStorage.getItem('Carrinho');
    if (cartList.length === 0 && listStorage) {
      getCartListFromStorage(JSON.parse(listStorage));
    }
  });

  return (
    <div>
      {cartList.length === 0
        ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        : <CartList
            cartList={ cartList }
            updateCart={ updateCart }
            removeCartItem={ removeCartItem }
            getCartListFromStorage={ getCartListFromStorage }
        />}
      <Link data-testid="checkout-products" to="/checkout">Finalizar Compra</Link>
    </div>
  );
}

export default Carrinho;
