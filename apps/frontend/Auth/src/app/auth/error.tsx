'use client';

import { useRouter } from 'next/navigation';
import { useState, type FC } from 'react';

import { Modal } from '@qualy/front-share/client';
import ErrorMessage from 'src/features/common/ui/ErrorMessaage';

interface ErrorFallbackProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorFallback: FC<ErrorFallbackProps> = ({ error, reset }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);

    setTimeout(() => {
      reset();
      router.back();
    }, 300);
  };

  console.error('Error ', error);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <h3>Unexpected Error!</h3>
      <ErrorMessage message={error.message} />
    </Modal>
  );
};

export default ErrorFallback;
