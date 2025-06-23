'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ChecklistModalContextType {
    open: boolean;
    setOpen: (open: boolean) => void;
    checklistCompleted: boolean;
    setChecklistCompleted: (completed: boolean) => void;
}

const ChecklistModalContext = createContext<ChecklistModalContextType | undefined>(undefined);

export const ChecklistModalProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [checklistCompleted, setChecklistCompleted] = useState(false);

    return (
        <ChecklistModalContext.Provider
            value={{ open, setOpen, checklistCompleted, setChecklistCompleted }}
        >
            {children}
        </ChecklistModalContext.Provider>
    );
};

export const useChecklistModal = () => {
    const context = useContext(ChecklistModalContext);
    if (!context) {
        throw new Error('useChecklistModal must be used within ChecklistModalProvider');
    }
    return context;
};
