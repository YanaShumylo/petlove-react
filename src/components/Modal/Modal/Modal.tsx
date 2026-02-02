import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import css from './Modal.module.css';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const modalRoot = document.body;

export default function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          type="button"
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>

        {children}
      </div>
    </div>,
    modalRoot
  );
}