import type { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputStyle?: 'underline' | 'withGlow' | 'common';
  error?: string | null;
  label?: string;
}
