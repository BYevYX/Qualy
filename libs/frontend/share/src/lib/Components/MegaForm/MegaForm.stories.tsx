import type { Meta, StoryObj } from '@storybook/react';
import { string } from 'yup';

import { MegaForm } from './MegaForm';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

type MegaFormAndTexts = React.ComponentProps<typeof MegaForm> & {
  errorText: string;
  successText: string;
  stateType: string;
};

const meta: Meta<MegaFormAndTexts> = {
  component: MegaForm,
  argTypes: {
    stateType: {
      control: 'select',
      options: ['success', 'error', 'null'],
    },
    errorText: {
      control: 'text',
    },
    successText: {
      control: 'text',
    },
  },
};
export default meta;

export const MegaFormStory: StoryObj<MegaFormAndTexts> = {
  name: 'MegaForm',
  args: {
    stateType: 'null',
    errorText: 'Works only if stateType = "error"',
    successText: 'Works only if stateType = "success"',
    fieldsRender: (
      <Input
        inputStyle="underline"
        name="input"
        placeholder="some Input email"
      />
    ),
    submitButtonRender: () => <Button type="submit">Some Button</Button>,
    validationSchemas: { input: string().email() },
  },
  render: ({
    stateType,
    errorText,
    successText,
    fieldsRender,
    submitButtonRender,
    validationSchemas,
  }) => {
    const text = stateType === 'success' ? successText : errorText;
    const state = stateType !== 'null' ? { [stateType]: text } : null;
    return (
      <div>
        <h3 style={{ color: 'white' }}>Mega Form</h3>
        <MegaForm
          state={state}
          action={() => console.log('submit')}
          fieldsRender={fieldsRender}
          submitButtonRender={submitButtonRender}
          validationSchemas={validationSchemas}
        />
      </div>
    );
  },
};
