// src/types/toast.types.ts
import { ToastContextType } from '../context/toast';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastConfig {
    duration?: number;
    position?: {
        vertical: 'top' | 'bottom';
        horizontal: 'left' | 'center' | 'right';
    };
    maxToasts?: number;
}

export interface ToastPromiseOptions<T> {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((error: any) => string);
}

// src/utils/toastPromise.ts

export async function toastPromise<T>(
    promise: Promise<T>,
    toast: ToastContextType,
    options: {
        loading: string;
        success: string | ((data: T) => string);
        error: string | ((error: any) => string);
    }
): Promise<T> {
    const loadingId = `loading-${Date.now()}`;

    // Show loading toast
    toast.showToast(options.loading, 'info', {
        duration: 0,
        title: 'Loading...'
    });

    try {
        const result = await promise;

        // Remove loading toast
        toast.showToast(
            typeof options.success === 'function'
                ? options.success(result)
                : options.success,
            'success',
            { duration: 3000 }
        );

        return result;
    } catch (error) {
        toast.showToast(
            typeof options.error === 'function'
                ? options.error(error)
                : options.error,
            'error',
            { duration: 5000 }
        );
        throw error;
    }
}