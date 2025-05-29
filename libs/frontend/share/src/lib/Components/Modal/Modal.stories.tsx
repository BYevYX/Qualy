import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';

import { Modal } from './Modal';

type ModalType = typeof Modal;

const meta: Meta<ModalType> = {
  component: Modal,
  argTypes: {
    isOpen: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },

  decorators: [
    (Story) => {
      const [args, updateArgs] = useArgs();

      const handleClose = () => {
        args.onClose?.();
        updateArgs({ isOpen: false });
      };

      return (
        <Modal isOpen={args.isOpen} onClose={handleClose}>
          <Story />
        </Modal>
      );
    },
  ],
};
export default meta;

export const ModalStory: StoryObj<ModalType> = {
  name: 'Modal',
  args: {
    isOpen: true,
    onClose: () => console.log('closed'),
  },
  render: () => (
    <>
      <h2>Hello, it&apos;s Modal</h2>
      <p>And some words</p>
    </>
  ),
};
