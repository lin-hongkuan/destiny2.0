
import React from 'react';
import { FortuneType } from '../types';

interface HeaderProps {
  onSelectType: (type: FortuneType) => void;
  activeType: FortuneType;
}

const Header: React.FC<HeaderProps> = ({ onSelectType, activeType }) => {
  return (
    <header className="border-b border-amber-500/20 py-6 px-4 md:px-12 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectType(FortuneType.BAZI)}>
          <div className="w-10 h-10 bg-gradient-to-tr from-amber-600 to-yellow-300 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.4)]">
            <i className="fa-solid fa-moon text-slate-900 text-xl"></i>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-500 tracking-wider">
              天启星盘 <span className="text-xs font-normal text-amber-500/60 ml-2 uppercase tracking-widest">Celestial Destiny</span>
            </h1>
          </div>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <button 
            onClick={() => onSelectType(FortuneType.BAZI)}
            className={`transition-colors ${activeType === FortuneType.BAZI ? 'text-amber-400 border-b border-amber-400' : 'text-slate-300 hover:text-amber-400'}`}
          >
            八字排盘
          </button>
          <button 
            onClick={() => onSelectType(FortuneType.ROMANCE)}
            className={`transition-colors ${activeType === FortuneType.ROMANCE ? 'text-pink-400 border-b border-pink-400' : 'text-slate-300 hover:text-pink-400'}`}
          >
            姻缘合婚
          </button>
          <button 
            onClick={() => onSelectType(FortuneType.DAILY)}
            className={`transition-colors ${activeType === FortuneType.DAILY ? 'text-amber-400 border-b border-amber-400' : 'text-slate-300 hover:text-amber-400'}`}
          >
            每日运势
          </button>
          <button 
            onClick={() => onSelectType(FortuneType.ICHING)}
            className={`transition-colors ${activeType === FortuneType.ICHING ? 'text-amber-400 border-b border-amber-400' : 'text-slate-300 hover:text-amber-400'}`}
          >
            周易预测
          </button>
          <button 
            onClick={() => document.getElementById('chat-trigger')?.click()}
            className="text-slate-300 hover:text-amber-400 transition-colors"
          >
            灵犀对话
          </button>
        </nav>
        <button className="md:hidden text-amber-400">
          <i className="fa-solid fa-bars text-2xl"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
