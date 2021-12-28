export type ICode = { value: string; id: string };
export type IGenerateCodeRequest = { email: string };
export type IRecoverPasswordRequest = {
  email: string;
  code: ICode;
  newPassword: string;
};
