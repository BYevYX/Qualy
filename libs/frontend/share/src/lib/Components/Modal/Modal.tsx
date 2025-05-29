'use client';
import { motion, AnimatePresence } from 'motion/react';
import { FC, ReactNode } from 'react';
import { IoClose } from 'react-icons/io5';

import styles from './Modal.module.css';
import { Button } from '../Button/Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay"
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Закрытие по клику вне окна
        >
          <motion.article
            key="modal"
            className={styles.content}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()} // Чтобы клик по контенту не закрывал модалку
          >
            <Button
              variant="icon"
              aria-label="close modal"
              className={styles.close}
              onClick={onClose}
            >
              <IoClose />
            </Button>
            {children}
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
