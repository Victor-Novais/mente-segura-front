// File: src/app/demo/collaborator/assistant/page.tsx
'use client';

import React, { useState } from 'react';
import DemoCollaboratorLayout from '../layout';
import { ChatInput } from '@/components/assistant/ChatInput';
import { ChatMessage } from '@/components/assistant/ChatMessage';

// Tipos para mensagens
type Message = {
    text: string;
    timestamp: Date;
    role: 'user' | 'assistant';
};

export default function DemoCollaboratorAssistantPage() {
    // Estado de chat com mensagens iniciais
    const [messages, setMessages] = useState<Message[]>([
        { text: 'Olá! Em que posso ajudar hoje?', timestamp: new Date(), role: 'assistant' },
        { text: 'Gostaria de saber mais sobre avaliações de risco.', timestamp: new Date(), role: 'user' },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = () => {
        if (!input.trim()) return;
        const userMsg: Message = { text: input.trim(), timestamp: new Date(), role: 'user' };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        // Simula resposta do assistente
        setTimeout(() => {
            const botMsg: Message = { text: 'Aqui está uma resposta de demonstração.', timestamp: new Date(), role: 'assistant' };
            setMessages((prev) => [...prev, botMsg]);
            setLoading(false);
        }, 1000);
    };

    return (

        <div className="relative flex-1 flex flex-col bg-gray-50 p-6">
            <h2 className="text-2xl font-semibold text-mental-purple mb-4">Assistente Virtual (Demo)</h2>

            {/* Área de mensagens */}
            <div className="flex-1 overflow-y-auto space-y-4 pb-24">
                {messages.map((msg, idx) => (
                    <ChatMessage key={idx} text={msg.text} timestamp={msg.timestamp} role={msg.role} />
                ))}
            </div>

            {/* Input fixo 20px acima do rodapé */}
            <div className="absolute bottom-5 left-6 right-6">
                <ChatInput
                    value={input}
                    onChange={setInput}
                    onSend={handleSend}
                    isLoading={loading}
                />
            </div>
        </div>

    );
}
