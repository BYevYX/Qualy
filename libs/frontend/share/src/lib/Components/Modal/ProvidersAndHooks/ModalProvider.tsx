'use client';
import type { FC, PropsWithChildren } from 'react';
import { useCallback, useState } from 'react';

import { Modal } from '../Modal';
import ModalContext from './ModalContext';

export const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [content, setContent] = useState<React.ReactNode>(null);

  const showModal = useCallback(
    (content: React.ReactNode) => setContent(content),
    [],
  );

  const closeModal = useCallback(() => setContent(null), []);

  return (
    <ModalContext value={{ showModal, closeModal }}>
      {children}
      <Modal isOpen={!!content} onClose={closeModal}>
        {content}
      </Modal>
    </ModalContext>
  );
};
