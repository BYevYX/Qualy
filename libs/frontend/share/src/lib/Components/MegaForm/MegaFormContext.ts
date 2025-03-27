import { createContext, Dispatch, SetStateAction } from 'react';

import { FieldsAndErrorsRecord } from '../../Types/contexts';

interface MegaFormContextType {
  fieldsErrors: FieldsAndErrorsRecord;
  setFieldsErrors: Dispatch<SetStateAction<FieldsAndErrorsRecord>>;
  fields: FieldsAndErrorsRecord;
  setFields: Dispatch<SetStateAction<FieldsAndErrorsRecord>>;
}

export const MegaFormContext = createContext<MegaFormContextType | null>(null);
