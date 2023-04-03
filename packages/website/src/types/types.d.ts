type Data = {
  email: string;
  password: string;
  username: string;
};

type User = {
  email: string;
  isActivated: string;
  username: string;
  id: string;
};

type Cart = {
  _id?: string;
  product?: string;
  quantity?: number;

};

type CartResponse = {
  user: string;
  products: Cart[];
};

type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

type Person = {
  _id: string;
  name: string;
  occupation: string;
  photo: string;
};
type Product = {
  _id?: string;
  title?: string;
  description?: string;
  price?: number;
  photo?: string;
};
