import { createContext, Dispatch, SetStateAction } from 'react';

import { FieldsAndErrorsRecord } from 'src/types';

interface MegaFormContextType {
  fieldsErrors: FieldsAndErrorsRecord;
  setFieldsErrors: Dispatch<SetStateAction<FieldsAndErrorsRecord>>;
  fields: FieldsAndErrorsRecord;
  setFields: Dispatch<SetStateAction<FieldsAndErrorsRecord>>;
}

export const MegaFormContext = createContext<MegaFormContextType | null>(null);
