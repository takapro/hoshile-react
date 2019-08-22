import User from './User';
import Product from './Product';

export interface OrderHead {
  id: number | string;
  userId: number | string;
  createDate: string;
  user: User;
  details: OrderDetail[];
}

export interface OrderDetail {
  id: number | string;
  orderId: number | string;
  productId: number | string;
  quantity: number | string;
  product: Product;
}
