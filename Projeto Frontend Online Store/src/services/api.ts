import { ApiResponse } from './apiTypes';

export async function getCategories() {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const data = await response.json();
  return data;
}

type StringParam = string;

export async function getProductsFromCategoryAndQuery(
  categoryId: StringParam,
  query: StringParam,
): Promise<ApiResponse> {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getProductById(productId: StringParam): Promise<ApiResponse> { // Corrigir o tipo de retorno aqui
  const url = `https://api.mercadolibre.com/items/${productId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
