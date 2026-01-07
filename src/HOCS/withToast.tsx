// src/hocs/withToast.tsx
import React, { ComponentType } from 'react';
import { useToast, ToastContextType } from '../context/toast';

export function withToast<P extends object>(
    WrappedComponent: ComponentType<P & { toast: ToastContextType }>
) {
    return function ComponentWithToast(props: P) {
        const toast = useToast();
        return <WrappedComponent {...props} toast={toast} />;
    };
}