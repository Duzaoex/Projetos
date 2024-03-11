import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/home';
import Carrinho from './Pages/Carrinho/carrinho';
import Layout from './components/Layout/Layout';
import CardDetails from './components/CardDetails/CardDetails';
import Checkout from './Pages/Checkout/checkout';
import { CartItem, CardType } from './types';

function App() {
  const [cartList, setCartList] = useState<CartItem[]>([]);

  const removeCartItem = (cartItem: CardType) => {
    const newCartItem = cartList.filter((item) => item.title !== cartItem.title);
    localStorage.setItem('Carrinho', JSON.stringify(newCartItem));
    setCartList(newCartItem);
  };
  const clearCart = () => {
    localStorage.setItem('Carrinho', JSON.stringify([]));
    setCartList([]);
  };

  const getCartListFromStorage = (listItem: CartItem[]) => {
    setCartList(listItem);
  };

  const updateCart = (prodName: CardType, op: string) => {
    const { title } = prodName;
    let newCartList = [];
    const cardItemExist = cartList
      .find((item) => item.title === title) !== undefined;

    if (!cardItemExist) {
      newCartList = [...cartList, { ...prodName, quantity: 1 }];
    } else {
      newCartList = cartList
        .map((item) => {
          if (item.title === title) {
            return { ...item,
              quantity: (op === 'add')
                ? item.quantity + 1 : item.quantity - 1 };
          }
          return item;
        });
    }

    localStorage.setItem('Carrinho', JSON.stringify(newCartList));
    setCartList(newCartList);
  };

  return (
    <Routes>
      <Route element={ <Layout /> }>
        <Route path="/" element={ <Home updateCart={ updateCart } /> } />
        <Route
          path="/carrinho"
          element={ <Carrinho
            cartList={ cartList }
            updateCart={ updateCart }
            getCartListFromStorage={ getCartListFromStorage }
            removeCartItem={ removeCartItem }
          /> }
        />
        <Route
          path="/detalhesProduto/:id"
          element={
            <CardDetails
              updateCart={ updateCart }
            />
}
        />
        <Route path="/checkout" element={ <Checkout clearCart={ clearCart } /> } />
      </Route>
      {/* <Route path="*" element={ <NotFound /> } /> */}
    </Routes>
  );
}

export default App;
