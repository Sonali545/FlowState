import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ToastData } from '../types';
import { XIcon, SparklesIcon, TrophyIcon, WifiIcon } from './icons';

interface ToastProps {
  toast: ToastData;
  onClose: () => void;
}

const toastIcons = {
    xp: <SparklesIcon className="w-5 h-5 text-yellow-500" />,
    badge: <TrophyIcon className="w-5 h-5 text-yellow-500" />,
    levelup: <TrophyIcon className="w-5 h-5 text-green-500" />,
    info: <SparklesIcon className="w-5 h-5 text-blue-500" />,
    webhook: <WifiIcon className="w-5 h-5 text-indigo-500" />,
};

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className="max-w-md w-full bg-primary shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5"
    >
      <div className="flex-1 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            {toast.icon ? <span className="text-xl">{toast.icon}</span> : toastIcons[toast.type]}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-primary">{toast.message}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-primary">
        <button
          onClick={onClose}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-secondary hover:text-primary focus:outline-none focus:ring-2 ring-accent"
        >
         <XIcon className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default Toast;