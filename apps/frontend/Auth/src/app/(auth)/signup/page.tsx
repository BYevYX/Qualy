import Form from 'next/form';
import { FC } from 'react';

import SignupFormContent from 'src/widjets/signup/ui/SignupFormContent';

const Signup: FC = () => {
  return (
    <Form action={'action'} className="flex flex-col gap-15">
      <SignupFormContent />
    </Form>
  );
};

export default Signup;
