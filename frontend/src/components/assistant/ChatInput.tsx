'use client'

import React from 'react'
import { User, Bot, Send } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils' // se tiver um helper de classnames

type MessageProps = {
    text: string
    timestamp: Date
    role: 'user' | 'assistant'
}

export function ChatMessage({ text, timestamp, role }: MessageProps) {
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

type InputProps = {
    value: string
    onChange: (value: string) => void
    onSend: () => void
    isLoading?: boolean
}

export function ChatInput({ value, onChange, onSend, isLoading }: InputProps) {
    return (
        <div className="flex items-center gap-2 p-3 bg-white border rounded-xl shadow-sm w-full">
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Digite sua mensagem..."
                onKeyDown={(e) => e.key === 'Enter' && onSend()}
                disabled={isLoading}
                className="flex-1"
            />
            <Button
                onClick={onSend}
                disabled={isLoading}
                className="bg-mental-purple text-white hover:bg-mental-purple/90"
                size="icon"
            >
                <Send className="h-4 w-4" />
            </Button>
        </div>
    )
}