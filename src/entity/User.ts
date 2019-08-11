interface User {
  id: number | string;
  name: string;
  email?: string;
  password?: string;
  shoppingCart?: string;
  isAdmin?: boolean | string;
};

export default User;
