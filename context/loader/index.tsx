'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface LoaderContextType {
    loaderFinished: boolean;
    setLoaderFinished: (value: boolean) => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function LoaderProvider({ children }: { children: ReactNode }) {
    const [loaderFinished, setLoaderFinished] = useState(false);

    return (
        <LoaderContext.Provider value={{ loaderFinished, setLoaderFinished }}>
            {children}
        </LoaderContext.Provider>
    );
}

export function useLoader() {
    const context = useContext(LoaderContext);
    if (!context) {
        throw new Error('useLoader must be used within LoaderProvider');
    }
    return context;
}