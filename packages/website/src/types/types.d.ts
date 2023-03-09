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
