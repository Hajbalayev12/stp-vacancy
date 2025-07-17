import React, { createContext, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastContextProps {
  showError: (msg: string) => void;
  showSuccess: (msg: string) => void;
}

const ToastContext = createContext<ToastContextProps>({
  showError: () => {},
  showSuccess: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const showError = (msg: string) => {
    toast.error(msg);
  };

  const showSuccess = (msg: string) => {
    toast.success(msg);
  };

  return (
    <ToastContext.Provider value={{ showError, showSuccess }}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </ToastContext.Provider>
  );
};
