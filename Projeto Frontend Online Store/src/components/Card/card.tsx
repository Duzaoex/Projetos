import { Link } from 'react-router-dom';
import { CardType } from '../../types';

type CardProps = {
  updateCart: (prodName: CardType, op: string) => void
} & CardType;

function Card({ title, thumbnail, price, id, updateCart }: CardProps) {
  return (
    <ul data-testid="product">
      <li>
        <Link
          data-testid="product-detail-link"
          to={ `/detalhesProduto/${id}` }
        >
          <img src={ thumbnail } alt={ title } />
          {' '}
        </Link>

      </li>
      <li>
        { title }
      </li>
      <li>
        R$
        {' '}
        { price }
      </li>
      <button
        data-testid="product-add-to-cart"
        onClick={ () => updateCart({ id, title, thumbnail, price }, 'add') }
      >
        Adicionar ao carrinho

      </button>
    </ul>
  );
}

export default Card;
