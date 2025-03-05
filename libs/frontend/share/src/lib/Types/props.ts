import type { InputHTMLAttributes, ReactNode } from 'react';
import type { StringSchema } from 'yup';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputStyle?: 'underline' | 'withGlow' | 'common';
  error?: string | null;
}

export interface MegaFormContentProps {
  formError: { error?: string } | null | undefined;
  validationSchemas: Record<string, StringSchema<string>>;
  inputRender: ReactNode | (() => ReactNode);
  submitButtonRender: (props: {
    disabled: boolean;
    isFormErrorDisplay: boolean;
  }) => ReactNode;
}
