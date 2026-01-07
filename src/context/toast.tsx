// src/providers/ToastProvider.tsx
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Snackbar, Alert, AlertColor, SnackbarCloseReason } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

export interface ToastMessage {
    id: string;
    message: string;
    type: AlertColor;
    duration?: number;
    title?: string;
    action?: ReactNode;
}

export interface ToastContextType {
    showToast: (message: string, type?: AlertColor, options?: ToastOptions) => void;
    showSuccess: (message: string, options?: ToastOptions) => void;
    showError: (message: string, options?: ToastOptions) => void;
    showWarning: (message: string, options?: ToastOptions) => void;
    showInfo: (message: string, options?: ToastOptions) => void;
    removeToast: (id: string) => void;
    clearAll: () => void;
}

interface ToastOptions {
    duration?: number;
    title?: string;
    action?: ReactNode;
    position?: {
        vertical: 'top' | 'bottom';
        horizontal: 'left' | 'center' | 'right';
    };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

interface ToastProviderProps {
    children: ReactNode;
    defaultDuration?: number;
    maxToasts?: number;
    defaultPosition?: {
        vertical: 'top' | 'bottom';
        horizontal: 'left' | 'center' | 'right';
    };
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
    children,
    defaultDuration = 6000,
    maxToasts = 3,
    defaultPosition = { vertical: 'top', horizontal: 'right' },
}) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);
    const [position] = useState(defaultPosition);

    const showToast = useCallback((
        message: string,
        type: AlertColor = 'info',
        options: ToastOptions = {}
    ) => {
        const id = uuidv4();
        const newToast: ToastMessage = {
            id,
            message,
            type,
            duration: options.duration || defaultDuration,
            title: options.title,
            action: options.action,
        };

        setToasts(prev => {
            const updated = [newToast, ...prev];
            return updated.slice(0, maxToasts);
        });

        // Auto-remove toast after duration
        if (options.duration !== 0) {
            setTimeout(() => {
                removeToast(id);
            }, options.duration || defaultDuration);
        }
    }, [defaultDuration, maxToasts]);

    const showSuccess = useCallback((message: string, options?: ToastOptions) => {
        showToast(message, 'success', options);
    }, [showToast]);

    const showError = useCallback((message: string, options?: ToastOptions) => {
        showToast(message, 'error', options);
    }, [showToast]);

    const showWarning = useCallback((message: string, options?: ToastOptions) => {
        showToast(message, 'warning', options);
    }, [showToast]);

    const showInfo = useCallback((message: string, options?: ToastOptions) => {
        showToast(message, 'info', options);
    }, [showToast]);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const clearAll = useCallback(() => {
        setToasts([]);
    }, []);

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason: SnackbarCloseReason,
        id: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        removeToast(id);
    };

    const getAlertTitle = (type: AlertColor, customTitle?: string): string => {
        if (customTitle) return customTitle;

        switch (type) {
            case 'success': return 'Success';
            case 'error': return 'Error';
            case 'warning': return 'Warning';
            case 'info': return 'Information';
            default: return '';
        }
    };

    const getSnackbarOffset = (index: number) => {
        const baseOffset = 24;
        const gap = 72;
        return baseOffset + index * gap;
    };
    return (
        <ToastContext.Provider
            value={{
                showToast,
                showSuccess,
                showError,
                showWarning,
                showInfo,
                removeToast,
                clearAll,
            }}
        >
            {children}

            {/* Render all toasts */}
            {toasts.map((toast, index) => (
                <>
                    <Snackbar
                        key={toast.id}
                        open={true}
                        autoHideDuration={toast.duration}
                        onClose={(event, reason) => handleClose(event, reason, toast.id)}
                        anchorOrigin={position}
                        style={{
                            top: `${getSnackbarOffset(index)}px`
                        }}
                    >
                        <Alert
                            elevation={6}
                            variant="filled"
                            onClose={() => removeToast(toast.id)}
                            severity={toast.type}
                            sx={{
                                width: '100%',
                                maxWidth: 400,
                                '& .MuiAlert-message': {
                                    width: '100%',
                                },
                            }}
                            action={toast.action}
                        >
                            {toast.title && (
                                <div style={{ fontWeight: 'bold', marginBottom: 4 }}>
                                    {getAlertTitle(toast.type, toast.title)}
                                </div>
                            )}
                            {toast.message}
                        </Alert>
                    </Snackbar>
                </>
            ))}
        </ToastContext.Provider>
    );
};