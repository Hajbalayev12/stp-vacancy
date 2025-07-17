import { useEffect } from "react";
import styles from "./ErrorHandler.module.scss";

interface ErrorHandlerProps {
  message: string;
  onClose: () => void;
}

const ErrorHandler = ({ message, onClose }: ErrorHandlerProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={styles.toast}>
      <p>{message}</p>
      <button onClick={onClose}>&times;</button>
    </div>
  );
};

export default ErrorHandler;
