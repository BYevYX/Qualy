import { createContext, useContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';

import { AuthErrors } from '../../common/model/types';

type AuthErrorsContextType = [AuthErrors, Dispatch<SetStateAction<AuthErrors>>];

const AuthErrorsContext = createContext<AuthErrorsContextType>([
  {},
  () => null,
]);

export const useAuthErrors = () => {
  const errors = useContext(AuthErrorsContext);
  return errors;
};

export default AuthErrorsContext;
