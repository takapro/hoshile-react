import Product from './Product';

export interface OrderHead {
  id: number;
  userId: number;
  createDate: string;

  details: OrderDetail[];
}

export interface OrderDetail {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;

  product: Product;
}
