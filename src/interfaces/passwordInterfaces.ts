export type ICode = { value: string; id: string };
export type IGenerateCodeRequest = { email: string };
export type ICheckCodeRequest = { email: string; code: string };
export type IRecoverPasswordRequest = {
  email: string;
  newPassword: string;
  code: ICode;
};
