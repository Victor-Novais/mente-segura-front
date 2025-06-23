'use client'

import React from 'react'
import { User, Bot } from 'lucide-react'
import { cn } from '@/lib/utils' // se tiver um helper de classnames

type Props = {
    text: string
    timestamp: Date
    role: 'user' | 'assistant'
}

export function ChatMessage({ text, timestamp, role }: Props) {
    const isUser = role === 'user'

    return (
        <div
            className={cn(
                'flex items-end gap-2 w-full',
                isUser ? 'justify-end' : 'justify-start'
            )}
        >
            {!isUser && (
                <div className="flex-shrink-0 w-8 h-8 bg-mental-purple text-white rounded-full flex items-center justify-center text-sm font-bold">
                    <Bot size={16} />
                </div>
            )}

            <div
                className={cn(
                    'p-3 md:p-4 rounded-2xl text-sm md:text-base whitespace-pre-wrap shadow-sm max-w-[85%] md:max-w-md',
                    isUser
                        ? 'bg-mental-purple text-white self-end'
                        : 'bg-white text-zinc-800 border'
                )}
            >
                {text}
                <div className="text-[10px] mt-1 text-zinc-400 text-right">
                    {timestamp.toLocaleTimeString()}
                </div>
            </div>

            {isUser && (
                <div className="flex-shrink-0 w-8 h-8 bg-zinc-300 text-zinc-800 rounded-full flex items-center justify-center text-sm font-bold">
                    <User size={16} />
                </div>
            )}
        </div>
    )
}