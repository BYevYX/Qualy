import { createContext } from 'react';

interface ModalContextType {
  showModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export default ModalContext;
