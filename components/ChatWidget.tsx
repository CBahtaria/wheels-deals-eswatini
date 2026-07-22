'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

type Message = { role: 'user' | 'assistant'; content: string }

const QUICK_PROMPTS = [
  'Show me cars under SZL 150,000',
  'What SUVs do you have?',
  'How does finance work?',
  'I want to sell my car',
]

function Bubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold mr-2 shrink-0 mt-0.5"
          style={{ background: 'var(--gold)', color: '#06090f' }}>T</div>
      )}
      <div
        className="max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
        style={{
          background: isUser ? 'var(--blue-2)' : 'var(--bg-card-2)',
          color: isUser ? 'white' : 'var(--text)',
          borderRadius: isUser ? '18px 18px 4px 18px' : '4px 18px 18px 18px',
        }}
      >
        {msg.content}
      </div>
    </motion.div>
  )
}

export function ChatWidget() {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Sawubona! I'm Thandi 👋 Your Wheels & Deals assistant. I can help you find a car, estimate finance, or answer any questions. What are you looking for?" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function send(text: string) {
    if (!text.trim() || loading) return
    const userMsg: Message = { role: 'user', content: text.trim() }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.content ?? 'Sorry, something went wrong. Please WhatsApp us at +268 7910 6129.' }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Network error. Please WhatsApp us at +268 7910 6129 🙏' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Chat bubble trigger */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-[100px] right-6 z-[998] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
        style={{ background: 'var(--gold)', color: '#06090f' }}
        whileHover={reduced ? {} : { scale: 1.08 }}
        whileTap={reduced ? {} : { scale: 0.95 }}
        aria-label="Open chat assistant"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
            <path d="M6 18L18 6M6 6l12 12"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
            <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
          </svg>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduced ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
            transition={reduced ? { duration: 0.1 } : { type: 'spring', damping: 26, stiffness: 280 }}
            className="fixed bottom-[172px] right-6 z-[997] w-[340px] md:w-[380px] rounded-2xl overflow-hidden flex flex-col"
            style={{
              maxHeight: '70vh',
              background: 'var(--bg-card)',
              border: '1px solid rgba(244,185,66,0.2)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 shrink-0"
              style={{ background: 'var(--bg-card-2)', borderBottom: '1px solid var(--border)' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                style={{ background: 'var(--gold)', color: '#06090f' }}>T</div>
              <div>
                <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>Thandi</p>
                <p className="text-[10px]" style={{ color: 'var(--green)' }}>● Online · Car Assistant</p>
              </div>
              <a href="https://wa.me/26879106129" target="_blank" rel="noopener noreferrer"
                className="ml-auto text-[10px] px-2.5 py-1 rounded-full font-semibold"
                style={{ background: '#25d366', color: 'white' }}>
                WhatsApp
              </a>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4" style={{ minHeight: '200px' }}>
              {messages.map((m, i) => <Bubble key={i} msg={m} />)}
              {loading && (
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold mr-2 shrink-0"
                    style={{ background: 'var(--gold)', color: '#06090f' }}>T</div>
                  <div className="flex gap-1 px-3.5 py-2.5 rounded-2xl" style={{ background: 'var(--bg-card-2)', borderRadius: '4px 18px 18px 18px' }}>
                    {[0,1,2].map(i => (
                      <motion.span key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--text-subtle)' }}
                        animate={reduced ? { opacity: 1 } : { opacity: [0.3, 1, 0.3] }}
                        transition={reduced ? {} : { repeat: Infinity, duration: 1, delay: i * 0.2 }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Quick prompts */}
            {messages.length < 3 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {QUICK_PROMPTS.map(p => (
                  <button key={p} onClick={() => send(p)}
                    className="text-[10px] px-3 py-1.5 rounded-full transition-colors min-h-[32px]"
                    style={{ background: 'var(--bg-card-2)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 shrink-0" style={{ borderTop: '1px solid var(--border)' }}>
              <form onSubmit={e => { e.preventDefault(); send(input) }} className="flex gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask about a car..."
                  className="flex-1 px-3 py-2 rounded-xl text-sm placeholder:text-slate-600"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
                  disabled={loading}
                />
                <button type="submit" disabled={loading || !input.trim()}
                  className="w-9 h-9 rounded-xl flex items-center justify-center disabled:opacity-40"
                  style={{ background: 'var(--gold)', color: '#06090f' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
