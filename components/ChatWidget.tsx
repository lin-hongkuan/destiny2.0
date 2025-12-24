
import React, { useState, useRef, useEffect } from 'react';
import { chatWithMaster } from '../services/geminiService';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: '阁下安好。我是星元阁的命理主理人，若有困惑，不妨直言。' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await chatWithMaster(userMsg, messages);
      setMessages(prev => [...prev, { role: 'bot', text: response || '天机不可泄露，请稍后再问。' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: '连接星脉失败，请检查网络。' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen && (
        <div className="bg-slate-900 border border-amber-500/30 w-80 md:w-96 h-[500px] rounded-2xl shadow-2xl flex flex-col mb-4 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-300">
          <div className="bg-gradient-to-r from-amber-900 to-slate-900 p-4 border-b border-amber-500/20 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-user-tie text-slate-900 text-sm"></i>
              </div>
              <span className="font-bold text-amber-100">灵犀命理大师</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-amber-500/50 hover:text-amber-500">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                  m.role === 'user' 
                  ? 'bg-amber-600 text-slate-950' 
                  : 'bg-slate-800 text-slate-200 border border-slate-700'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 px-4 py-2 rounded-2xl text-xs text-amber-500 animate-pulse">
                  正在卜算...
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-amber-500/20 bg-slate-950">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="提问，如：今年财运如何？"
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                className="bg-amber-600 hover:bg-amber-500 text-slate-950 w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        id="chat-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-amber-600 hover:bg-amber-500 rounded-full shadow-[0_0_20px_rgba(217,119,6,0.4)] flex items-center justify-center text-slate-950 text-2xl transition-transform hover:scale-110 active:scale-95"
      >
        <i className={isOpen ? 'fa-solid fa-comment-slash' : 'fa-solid fa-comment-dots'}></i>
      </button>
    </div>
  );
};

export default ChatWidget;
