export interface UserInterface {
  id: number;
  email: string;
}

export interface UserAuthInterface {
  token: string;
  username: UserInterface;
}