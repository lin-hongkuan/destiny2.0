
import React from 'react';
import { ReadingResult } from '../types';

interface Props {
  result: ReadingResult;
  onReset: () => void;
}

const ResultDisplay: React.FC<Props> = ({ result, onReset }) => {
  return (
    <div className="space-y-8 pb-12">
      {/* 头部标题区 */}
      <div className="text-center space-y-4 mystic-card" style={{ animationDelay: '0s' }}>
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-amber-100 to-amber-500 py-2">
          {result.title}
        </h2>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto italic">
          &ldquo;{result.summary}&rdquo;
        </p>
      </div>

      {/* 核心指标卡片：采用 Staggered 延迟动画 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {result.aspects.map((aspect, idx) => (
          <div 
            key={idx} 
            className="bg-slate-900/40 border border-amber-500/10 rounded-2xl p-6 backdrop-blur-md group hover:border-amber-500/30 transition-all duration-500 mystic-card shadow-lg shadow-black/50"
            style={{ animationDelay: `${0.2 + idx * 0.15}s` }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <i className={`fa-solid fa-${aspect.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold text-amber-200">{aspect.label}</h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-amber-500 group-hover:gold-glow transition-all">{aspect.score}</span>
                <span className="text-xs text-amber-500/50 block">势能指数</span>
              </div>
            </div>
            
            {/* 进度条：增加动画感 */}
            <div className="h-2 w-full bg-slate-800 rounded-full mb-4 overflow-hidden relative">
              <div 
                className="h-full bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-500 transition-all duration-1000 ease-out relative" 
                style={{ width: `${aspect.score}%` }}
              >
                <div className="absolute inset-0 progress-shimmer"></div>
              </div>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
              {aspect.content}
            </p>
          </div>
        ))}
      </div>

      {/* 开运元素区 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mystic-card" style={{ animationDelay: '0.8s' }}>
        <div className="bg-amber-950/20 border border-amber-500/30 p-6 rounded-2xl text-center group hover:bg-amber-900/30 transition-colors">
          <span className="text-amber-500/60 text-xs uppercase tracking-widest block mb-2">开运色</span>
          <span className="text-amber-100 font-bold text-lg group-hover:text-amber-400 transition-colors">{result.luckyElements.color}</span>
        </div>
        <div className="bg-amber-950/20 border border-amber-500/30 p-6 rounded-2xl text-center group hover:bg-amber-900/30 transition-colors">
          <span className="text-amber-500/60 text-xs uppercase tracking-widest block mb-2">吉数</span>
          <span className="text-amber-100 font-bold text-lg group-hover:text-amber-400 transition-colors">{result.luckyElements.number}</span>
        </div>
        <div className="bg-amber-950/20 border border-amber-500/30 p-6 rounded-2xl text-center group hover:bg-amber-900/30 transition-colors">
          <span className="text-amber-500/60 text-xs uppercase tracking-widest block mb-2">贵人位</span>
          <span className="text-amber-100 font-bold text-lg group-hover:text-amber-400 transition-colors">{result.luckyElements.direction}</span>
        </div>
      </div>

      {/* 大师寄语 */}
      <div className="bg-slate-900/60 border border-amber-500/20 p-8 rounded-2xl relative overflow-hidden group mystic-card" style={{ animationDelay: '1s' }}>
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
          <i className="fa-solid fa-quote-right text-6xl text-amber-500"></i>
        </div>
        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-16 bg-amber-500/50 rounded-full"></div>
        <h4 className="text-amber-400 font-bold mb-4 flex items-center gap-2">
          <i className="fa-solid fa-lightbulb animate-pulse"></i> 大师寄语
        </h4>
        <p className="text-slate-300 text-lg leading-relaxed italic relative z-10">
          {result.advice}
        </p>
      </div>

      {/* 底部按钮 */}
      <div className="flex justify-center mystic-card" style={{ animationDelay: '1.2s' }}>
        <button
          onClick={onReset}
          className="group text-amber-500/60 hover:text-amber-400 text-sm flex items-center gap-2 transition-all py-4 hover:tracking-widest"
        >
          <i className="fa-solid fa-rotate-left group-hover:rotate-[-180deg] transition-transform duration-700"></i> 
          重新开启命盘
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;