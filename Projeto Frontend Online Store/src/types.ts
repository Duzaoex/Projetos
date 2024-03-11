export type CategoryResponse = {
  id: string,
  name: string,
};

export type CardType = {
  title: string,
  thumbnail: string,
  price: number,
  id : string,
};

export type CartItem = {
  quantity: number
} & CardType;

export type CarrinhoProp = {
  updateCart: (prodName: CardType, op: string) => void,
  removeCartItem: (cartItem: CardType) => void,
  getCartListFromStorage: (listItem: CartItem[]) => void,
  cartList: CartItem[]
};
