import Product from './Product';

export interface CartEntry {
  productId: number | string;
  quantity: number;
};

export const mergeCart = (cart1: CartEntry[], cart2: CartEntry[]): CartEntry[] => {
  const cart = [...cart1];
  cart2.forEach(entry => {
    const index = cart.findIndex(e => e.productId === entry.productId);
    if (index >= 0) {
      cart[index] = { productId: cart[index].productId, quantity: cart[index].quantity + entry.quantity };
    } else {
      cart.push(entry);
    }
  });
  return cart.filter(entry => entry.quantity > 0);
};

export const joinProducts = (cart: CartEntry[], products: Product[]): { product: Product, quantity: number }[] => {
  const result: { product: Product, quantity: number }[] = [];
  cart.forEach(entry => {
    const product = products.find(product => product.id === entry.productId);
    if (product) {
      result.push({ product, quantity: entry.quantity });
    }
  });
  return result;
};
