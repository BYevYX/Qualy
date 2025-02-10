import Form, { type FormProps } from 'next/form';
import { useActionState } from 'react';

const MegaForm = ({ children, action, ...props }: FormProps) => {
//   const [state, actionState, pending] = useActionState(action);

  return (
    <Form action={action} {...props}>
      {children}
    </Form>
  );
};
