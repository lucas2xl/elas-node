interface IUser {
  id: string;
  full_name: string;
  social_name: string;
  password: string;
  email: string;
  cpf: number;
  gender: string;
  phone: number;
  cep: number;
  address: string;
  complement: string;
  role?: IRole;
}

export enum IRole {
  victim = 0,
  police = 1,
}

export type ICreateUserRequest = Omit<IUser, 'id'>;
export type ICreateSessionsRequest = Pick<IUser, 'password' | 'email'>;
export type IGetUserRequest = Pick<IUser, 'id'>;
