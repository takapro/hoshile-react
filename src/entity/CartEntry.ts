import Product from './Product';

export interface CartEntry {
  productId: number;
  quantity: number;
}

export interface LooseEntry {
  productId: number | string;
  quantity: number | string;
}

export interface DetailEntry {
  product: Product;
  quantity: number | string;
}

export const mergeCart = (cart1: CartEntry[], cart2: LooseEntry[]): CartEntry[] => {
  const cart = [...cart1];
  cart2.forEach(entry => {
    if (entry.productId && entry.quantity) {
      const productId = parseInt(entry.productId as string);
      const quantity = parseInt(entry.quantity as string);
      const index = cart.findIndex(e => e.productId === productId);
      if (index >= 0) {
        cart[index] = { productId, quantity: cart[index].quantity + quantity };
      } else {
        cart.push({ productId, quantity });
      }
    }
  });
  return cart.filter(entry => entry.quantity > 0);
};

export const joinProducts = (cart: CartEntry[], products: Product[]): DetailEntry[] => {
  const result: DetailEntry[] = [];
  cart.forEach(entry => {
    const product = products.find(product => parseInt(product.id as string) === entry.productId);
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
