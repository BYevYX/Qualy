export type SignupFields = 'email' | 'password' | 'verifyPassword' | 'username';
export type signupDataForServer = Record<
  Exclude<SignupFields, 'verifyPassword'>,
  string
>;
