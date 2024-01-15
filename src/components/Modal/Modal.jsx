import React, { useEffect } from 'react';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ closeModal, largeImgUrl }) => {
  useEffect(() => {
    const onKeyDown = e => {
      onEscModalClose(e);
    };
    const onEscModalClose = e => {
      e.key === 'Escape' && closeModal('');
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [closeModal]);

  const handleModalClose = e => {
    e.target === e.currentTarget && closeModal('');
  };

  return createPortal(
    <div className={styles.Overlay} onClick={handleModalClose}>
      <div className={styles.Modal}>
        <img className={styles.ModalImg} src={largeImgUrl} alt="" />
      </div>
    </div>,
    modalRoot
  );
};
