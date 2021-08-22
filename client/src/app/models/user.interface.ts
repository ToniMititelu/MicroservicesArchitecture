export interface UserRegister {
  username?: string;
  email?: string;
  password_1?: string;
  password_2?: string;
  role?: string;
}

export interface UserLogIn {
  email?: string;
  password?: string;
}

export interface User {
  _id?: string;
  id?: string;
  userName: string;
  email: string;
  role: string;
  phone: string;
}
