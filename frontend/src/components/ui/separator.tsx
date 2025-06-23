import React from 'react'

interface SeparatorProps {
    className?: string
}

export const Separator: React.FC<SeparatorProps> = ({ className = '' }) => {
    return (
        <hr
            className={`my-8 border-t ${
                // ajuste as cores conforme o seu tema
                'border-gray-200 dark:border-gray-700'
                } ${className}`}
        />
    )
}