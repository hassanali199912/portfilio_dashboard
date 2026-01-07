// src/hooks/useToastActions.ts
import { useToast } from '../context/toast';

export const useToastActions = () => {
    const toast = useToast();

    const showSuccess = (message: string) => toast.showSuccess(message);
    const showError = (message: string) => toast.showError(message);
    const showWarning = (message: string) => toast.showWarning(message);
    const showInfo = (message: string) => toast.showInfo(message);
    const showLoading = (message: string) => {
        const id = `loading-${Date.now()}`;
        toast.showToast(message, 'info', {
            duration: 0, // Persistent until manually closed
            title: 'Loading...'
        });
        return () => toast.removeToast(id);
    };

    return {
        showSuccess,
        showError,
        showWarning,
        showInfo,
        showLoading,
        clearAll: toast.clearAll,
    };
};