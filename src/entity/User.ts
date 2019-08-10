interface User {
  id?: number;
  name: string;
  email?: string;
  password?: string;
  shoppingCart?: string;
  isAdmin?: boolean | string;
};

export default User;
