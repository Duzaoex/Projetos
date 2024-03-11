import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header data-testid="header-component">
      <NavLink to="/">
        Home
      </NavLink>
      <NavLink to="/carrinho" data-testid="shopping-cart-button">
        Carrinho
      </NavLink>
      {/* <NavLink to="/profile" data-testid="link-to-profile">
        Profile
      </NavLink> */}
    </header>
  );
}

export default Header;
