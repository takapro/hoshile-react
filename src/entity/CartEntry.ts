import Product from './Product';

export interface CartEntry {
  productId: number | string;
  quantity: number;
}

export interface DetailEntry {
  product: Product;
  quantity: number | string;
}

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

export const joinProducts = (cart: CartEntry[], products: Product[]): DetailEntry[] => {
  const result: DetailEntry[] = [];
  cart.forEach(entry => {
    const product = products.find(product => product.id === entry.productId);
    if (product) {
      result.push({ product, quantity: entry.quantity });
    }
  });
  return result;
};

export const calcPrice = (detail: DetailEntry): number => {
  return parseFloat(detail.product.price as string) * parseInt(detail.quantity as string);
};

export const calcTotalPrice = (details: DetailEntry[]): number => {
  return details.reduce((acc, each) => acc + calcPrice(each), 0);
};
