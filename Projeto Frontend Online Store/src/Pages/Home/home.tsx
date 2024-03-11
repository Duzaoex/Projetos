import React, { useState } from 'react';
import { getProductsFromCategoryAndQuery } from '../../services/api';
import Sidebar from '../../components/Sidebar/sidebar';
import Card from '../../components/Card/card';
import { CardType } from '../../types';

type HomeProps = {
  updateCart: (prodName: CardType, op: string) => void
};

function Home(props: HomeProps) {
  const { updateCart } = props;
  const [inputValue, setInputValue] = useState('');
  const [listProduct, setListProduct] = useState<CardType[]>([]);

  const filterByCategory = async (categoryID: string) => {
    const list = await getProductsFromCategoryAndQuery(categoryID, '');
    console.log(list.results);

    setListProduct(list.results);
  };

  function handleChange(event:React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const list = await getProductsFromCategoryAndQuery('', inputValue);
    setListProduct(list.results);
  }

  return (
    <>
      <div>
        <form onSubmit={ (event) => handleSubmit(event) }>
          <input
            onChange={ (event) => handleChange(event) }
            data-testid="query-input"
            type="text"
            value={ inputValue }
          />
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          <button data-testid="query-button">Pesquisar</button>
        </form>
      </div>
      <div>
        {listProduct.length > 0 ? (listProduct.map(({ id, title, price, thumbnail }) => (
          <li key={ id }>
            <Card
              id={ id }
              title={ title }
              thumbnail={ thumbnail }
              price={ price }
              updateCart={ updateCart }
            />
          </li>
        ))) : <p>Nenhum produto foi encontrado</p>}
      </div>
      <Sidebar filterByCategory={ filterByCategory } />
    </>
  );
}

export default Home;
