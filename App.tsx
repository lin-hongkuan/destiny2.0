
import React, { useState } from 'react';
import Header from './components/Header';
import FortuneForm from './components/FortuneForm';
import ResultDisplay from './components/ResultDisplay';
import ChatWidget from './components/ChatWidget';
import { generateFortune } from './services/geminiService';
import { UserProfile, ReadingResult, FortuneType } from './types';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReadingResult | null>(null);
  const [activeType, setActiveType] = useState<FortuneType>(FortuneType.BAZI);

  const handleFormSubmit = async (profile: UserProfile, question?: string) => {
    setLoading(true);
    try {
      const fortune = await generateFortune(profile, activeType, question);
      setResult(fortune);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (type: FortuneType) => {
    setActiveType(type);
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header onSelectType={switchMode} activeType={activeType} />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Hero/Intro */}
          <div className="lg:col-span-5 space-y-8">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${activeType === FortuneType.ROMANCE ? 'bg-pink-500/10 border-pink-500/20 text-pink-500' : 'bg-amber-500/10 border-amber-500/20 text-amber-500'} border text-xs font-bold uppercase tracking-widest animate-pulse`}>
              <i className="fa-solid fa-wand-magic-sparkles"></i> DeepSeek-V3 巅峰算力
            </div>
            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              探索你的 <br />
              <span className={`${activeType === FortuneType.ROMANCE ? 'text-pink-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]' : 'text-amber-500 gold-glow'} transition-all duration-500`}>
                {activeType === FortuneType.BAZI ? '八字命局' : 
                 activeType === FortuneType.DAILY ? '今日运势' : 
                 activeType === FortuneType.ICHING ? '周易占断' : 
                 activeType === FortuneType.ROMANCE ? '姻缘合婚' : '命运轨迹'}
              </span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              {activeType === FortuneType.BAZI && "深度解析生辰八字，揭秘五行平衡与人生起伏。"}
              {activeType === FortuneType.DAILY && "把握时机，洞察今日吉凶，开启顺遂的一天。"}
              {activeType === FortuneType.ICHING && "易经乾坤，针对心中所问，指引迷途之津。"}
              {activeType === FortuneType.ROMANCE && "千里姻缘一线牵。解析宿命情缘，找寻你的真命天子/天女。"}
              {!Object.values(FortuneType).includes(activeType) && "天启星盘利用顶尖深度神经网络模型，揭开未来的神秘面纱。"}
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <i className={`fa-solid ${activeType === FortuneType.ROMANCE ? 'fa-heart text-pink-500' : 'fa-infinity text-amber-500'} mb-2 block`}></i>
                <h4 className="font-bold text-amber-100 text-sm">{activeType === FortuneType.ROMANCE ? '情缘推演' : '无限推演'}</h4>
                <p className="text-slate-500 text-xs mt-1">{activeType === FortuneType.ROMANCE ? '洞悉桃花开落' : '模拟数万次天命走势'}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <i className="fa-solid fa-shield-halved text-amber-500 mb-2 block"></i>
                <h4 className="font-bold text-amber-100 text-sm">极速解析</h4>
                <p className="text-slate-500 text-xs mt-1">秒级获取命理洞察</p>
              </div>
            </div>

            <div className="hidden lg:block pt-12">
               <div className="relative w-64 h-64 mx-auto animate-float">
                  <div className={`absolute inset-0 rounded-full border ${activeType === FortuneType.ROMANCE ? 'border-pink-500/10' : 'border-amber-500/10'} rotate-45`}></div>
                  <div className={`absolute inset-4 rounded-full border ${activeType === FortuneType.ROMANCE ? 'border-pink-500/20' : 'border-amber-500/20'} -rotate-12`}></div>
                  <div className={`absolute inset-8 rounded-full border ${activeType === FortuneType.ROMANCE ? 'border-pink-500/40' : 'border-amber-500/40'} rotate-90`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <i className={`fa-solid ${activeType === FortuneType.ICHING ? 'fa-yin-yang' : activeType === FortuneType.ROMANCE ? 'fa-heart' : 'fa-sun'} text-6xl ${activeType === FortuneType.ROMANCE ? 'text-pink-500/40' : 'text-amber-500/40'}`}></i>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Column: Form or Results */}
          <div className="lg:col-span-7">
            {result ? (
              <ResultDisplay result={result} onReset={() => setResult(null)} />
            ) : (
              <FortuneForm onSubmit={handleFormSubmit} loading={loading} activeType={activeType} />
            )}
          </div>
        </div>

        {/* Feature Grid */}
        <section className="mt-24 py-12 border-t border-slate-800">
           <h3 className="text-center text-slate-500 uppercase tracking-[0.3em] text-sm mb-12">服务范围</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { type: FortuneType.BAZI, icon: 'calendar-day', title: '八字详批', desc: '深度解析个人命局、五行喜忌。' },
                { type: FortuneType.ROMANCE, icon: 'heart', title: '姻缘合婚', desc: '宿命情缘，解析桃花与婚姻时机。' },
                { type: FortuneType.DAILY, icon: 'sun', title: '每日运势', desc: '基于流日变化，预判财富与机遇。' },
                { type: FortuneType.ICHING, icon: 'yin-yang', title: '周易预测', desc: '针对具体事项，六十四卦指点迷津。' },
                { type: 'CHAT', icon: 'comment-dots', title: '灵犀对话', desc: '与命理大师在线交流，解答困惑。' },
              ].map((item, i) => (
                <div 
                  key={i} 
                  onClick={() => item.type === 'CHAT' ? document.getElementById('chat-trigger')?.click() : switchMode(item.type as FortuneType)}
                  className={`group p-6 rounded-2xl bg-slate-900/20 border transition-all text-center cursor-pointer ${activeType === item.type ? (item.type === FortuneType.ROMANCE ? 'border-pink-500 shadow-[0_0_15px_rgba(244,63,94,0.2)]' : 'border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]') : 'border-transparent hover:border-amber-500/30'}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors ${activeType === item.type ? (item.type === FortuneType.ROMANCE ? 'bg-pink-600' : 'bg-amber-600') : 'bg-slate-800 group-hover:bg-amber-600'}`}>
                    <i className={`fa-solid fa-${item.icon} ${activeType === item.type ? 'text-slate-900' : 'text-amber-500 group-hover:text-slate-900'}`}></i>
                  </div>
                  <h4 className="font-bold text-amber-100 mb-2">{item.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </section>
      </main>

      <footer className="border-t border-slate-900 py-12 px-4 text-center">
        <p className="text-slate-600 text-sm">
          © 2024 天启星盘 · Powered by SiliconFlow DeepSeek AI. 仅供娱乐参考。
        </p>
      </footer>

      <ChatWidget />
    </div>
  );
};

export default App;