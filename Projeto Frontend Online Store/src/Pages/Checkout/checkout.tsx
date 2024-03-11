import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../../types';

type CheckoutProps = {
  clearCart: () => void;
};

function Checkout(prop: CheckoutProps) {
  const { clearCart } = prop;
  const [cartList, setCartList] = useState<CartItem[]>([]);
  const [invalidFields, setInvalidFields] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requiredFields = [
      'fullname',
      'email',
      'cpf',
      'phone',
      'cep',
      'address',
    ];
    const formData = new FormData(event.currentTarget);

    const hasEmptyField = requiredFields.some((field) => !formData.get(field));

    if (hasEmptyField || !selectedPayment) {
      setInvalidFields(true);
    } else {
      setInvalidFields(false);

      // Lógica para enviar o formulário ou fazer outras ações
      // ...
      clearCart();
      navigate('/');
    }
  };

  useEffect(() => {
    const listStorage = localStorage.getItem('Carrinho');
    if (listStorage) {
      setCartList(JSON.parse(listStorage));
    }
  }, []);

  return (
    <>
      <ul>
        {cartList.map((cartItem) => (
          <li key={ cartItem.id }>
            <img src={ cartItem.thumbnail } alt="" />
            <span data-testid="shopping-cart-product-name">
              {cartItem.title}
            </span>
            {' - '}
            <span data-testid="shopping-cart-product-quantity">
              Qtd:
              {' '}
              {cartItem.quantity}
            </span>
            <p>
              R$
              {' '}
              {(cartItem.price * cartItem.quantity).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
      <p>
        Total: R$
        {' '}
        {cartList
          .reduce(
            (total, cartItem) => total + cartItem.price * cartItem.quantity,
            0,
          )
          .toFixed(2)}
      </p>
      {invalidFields && <p data-testid="error-msg">Campos inválidos</p>}
      <form onSubmit={ (event) => handleSubmit(event) }>
        <label htmlFor="name">
          <input
            placeholder="Nome"
            name="fullname"
            data-testid="checkout-fullname"
          />
        </label>
        <label htmlFor="email">
          <input
            placeholder="E-mail"
            name="email"
            data-testid="checkout-email"
          />
        </label>
        <label htmlFor="cpf">
          <input placeholder="CPF" name="cpf" data-testid="checkout-cpf" />
        </label>
        <label htmlFor="phone">
          <input
            placeholder="Telefone"
            name="phone"
            data-testid="checkout-phone"
          />
        </label>
        <label htmlFor="cep">
          <input placeholder="CEP" name="cep" data-testid="checkout-cep" />
        </label>
        <label htmlFor="address">
          <input
            placeholder="Endereço"
            name="address"
            data-testid="checkout-address"
          />
        </label>
        <label htmlFor="boleto">
          Boleto
          <input
            name="pagamento"
            type="radio"
            id="boleto"
            data-testid="ticket-payment"
            checked={ selectedPayment === 'boleto' }
            onChange={ () => setSelectedPayment('boleto') }
          />
        </label>
        <label htmlFor="mastercard">
          MasterCard
          <input
            name="pagamento"
            type="radio"
            id="mastercard"
            data-testid="master-payment"
            checked={ selectedPayment === 'MasterCard' }
            onChange={ () => setSelectedPayment('MasterCard') }
          />
        </label>
        <label htmlFor="Visa">
          Visa
          <input
            name="pagamento"
            type="radio"
            id="Visa"
            data-testid="visa-payment"
            checked={ selectedPayment === 'Visa' }
            onChange={ () => setSelectedPayment('Visa') }
          />
        </label>
        <label htmlFor="Elo">
          Elo
          <input
            name="pagamento"
            type="radio"
            id="Elo"
            data-testid="elo-payment"
            checked={ selectedPayment === 'Elo' }
            onChange={ () => setSelectedPayment('Elo') }
          />
        </label>
        <button type="submit" data-testid="checkout-btn">
          Finalizar Compra
        </button>
      </form>
    </>
  );
}

export default Checkout;
