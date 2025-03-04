export type SignupFieldsType =
  | 'email'
  | 'password'
  | 'verifyPassword'
  | 'username';
export type signupDataForServer = Record<
  Exclude<SignupFieldsType, 'verifyPassword'>,
  string
>;
