'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatMessage } from '@/components/assistant/ChatMessage'
import { ChatInput } from '@/components/assistant/ChatInput'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

// ✅ Tipo reutilizável para as mensagens do assistente
type Message = {
  role: 'user' | 'assistant'
  text: string
  timestamp: Date
}

export default function AssistantPage() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const bottomRef = useRef<HTMLDivElement | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, loading])

  const handleSend = () => {
    if (!input.trim()) return

    const newMessage: Message = {
      role: 'user',
      text: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInput('')
    setLoading(true)

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Essa é uma resposta simulada do assistente.',
          timestamp: new Date(),
        },
      ])
      setLoading(false)
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-[#f7f8fa] to-[#eef1f4] flex flex-col"
    >
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="p-4 bg-white shadow-md text-mental-purple font-bold text-xl flex items-center gap-4"
      >
        <button
          onClick={() => router.back()}
          className="text-zinc-500 hover:text-mental-purple transition"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span>Assistente Virtual</span>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-3xl mx-auto w-full"
      >
        <AnimatePresence>
          {messages.length === 0 && !loading ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-zinc-500 mt-10 text-base md:text-lg"
            >
              Olá! 👋<br />Sou seu assistente. Em que posso te ajudar hoje?
            </motion.div>
          ) : (
            messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
              >
                <ChatMessage {...msg} />
              </motion.div>
            ))
          )}

          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ChatMessage
                role="assistant"
                text="Digitando..."
                timestamp={new Date()}
              />
            </motion.div>
          )}
          <div ref={bottomRef} />
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white border-t p-2"
      >
        <div className="max-w-3xl mx-auto w-full">
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={handleSend}
            isLoading={loading}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}