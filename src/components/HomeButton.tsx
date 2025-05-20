import React from 'react';
import styles from './HomeButton.module.css';

interface HomeButtonProps {
  children: React.ReactNode;
  className?: string;
}

const HomeButton: React.FC<HomeButtonProps> = ({ children, className }) => {
  return (
    <div className={`${styles.wrapper} ${className ?? ''}`}>
      <div>
        <svg style={{position: 'absolute', width: 0, height: 0}}>
          <filter width="300%" x="-100%" height="300%" y="-100%" id="unopaq">
            <feColorMatrix values="1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 9 0" />
          </filter>
          <filter width="300%" x="-100%" height="300%" y="-100%" id="unopaq2">
            <feColorMatrix values="1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 3 0" />
          </filter>
          <filter width="300%" x="-100%" height="300%" y="-100%" id="unopaq3">
            <feColorMatrix values="1 0 0 0.2 0
            0 1 0 0.2 0
            0 0 1 0.2 0
            0 0 0 2 0" />
          </filter>
        </svg>
        <div className={styles.backdrop} />
        <div className={styles.buttonContainer}>
          <div className={`${styles.spin} ${styles.spinBlur}`} />
          <div className={`${styles.spin} ${styles.spinIntense}`} />
          <div className={styles.backdrop} />
          <div className={styles.buttonBorder}>
            <div className={`${styles.spin} ${styles.spinInside}`} />
            <div className={styles.button}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeButton;
