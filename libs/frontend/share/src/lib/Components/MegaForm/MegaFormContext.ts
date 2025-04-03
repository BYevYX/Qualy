import { createContext, Dispatch, SetStateAction } from 'react';
import { StringSchema } from 'yup';

import { ErrorsRecord } from '../../Types/contexts';

interface MegaFormContextType {
  fieldsErrors: ErrorsRecord;
  setFieldsErrors: Dispatch<SetStateAction<ErrorsRecord>>;
  fields: Record<string, string>;
  setFields: Dispatch<SetStateAction<Record<string, string>>>;
  validationSchemas: Record<string, StringSchema<string | undefined>>;
}

export const MegaFormContext = createContext<MegaFormContextType | null>(null);
