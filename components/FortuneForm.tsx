
import React, { useState } from 'react';
import { UserProfile, FortuneType } from '../types';

interface Props {
  onSubmit: (profile: UserProfile, question?: string) => void;
  loading: boolean;
  activeType: FortuneType;
}

const FortuneForm: React.FC<Props> = ({ onSubmit, loading, activeType }) => {
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    birthDate: '',
    birthTime: '',
    gender: 'male',
    location: ''
  });
  const [question, setQuestion] = useState('');

  const getTitle = () => {
    switch(activeType) {
      case FortuneType.BAZI: return "建立您的星元档案";
      case FortuneType.DAILY: return "获取今日启示";
      case FortuneType.ICHING: return "诚心问卦周易";
      case FortuneType.ROMANCE: return "开启姻缘密卷";
      default: return "开启命理之旅";
    }
  };

  const getButtonColor = () => {
    if (activeType === FortuneType.ROMANCE) return "from-rose-600 to-pink-500 hover:from-rose-500 hover:to-pink-400";
    return "from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.birthDate) {
      alert("请填写姓名和出生日期");
      return;
    }
    onSubmit(formData, question);
  };

  return (
    <div className={`bg-slate-900/50 border ${activeType === FortuneType.ROMANCE ? 'border-pink-500/20' : 'border-amber-500/20'} rounded-2xl p-8 backdrop-blur-xl shadow-2xl transition-colors duration-500`}>
      <h2 className={`text-2xl font-bold mb-6 ${activeType === FortuneType.ROMANCE ? 'text-pink-200' : 'text-amber-200'} flex items-center gap-3`}>
        <i className={`fa-solid ${activeType === FortuneType.ICHING ? 'fa-yin-yang' : activeType === FortuneType.ROMANCE ? 'fa-heart' : 'fa-star-and-crescent'} ${activeType === FortuneType.ROMANCE ? 'text-pink-500' : 'text-amber-500'}`}></i>
        {getTitle()}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {activeType === FortuneType.ICHING && (
          <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
            <label className="text-sm text-amber-500/80 font-bold uppercase tracking-widest">所求之事 (Question)</label>
            <textarea
              className="w-full bg-slate-950/80 border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors h-24 resize-none"
              placeholder="请静心沉思，输入您想占卜的具体问题..."
              value={question}
              onChange={e => setQuestion(e.target.value)}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-slate-400">您的名号</label>
            <input
              type="text"
              className="w-full bg-slate-950/80 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
              placeholder="请输入姓名"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-400">性别</label>
            <select
              className="w-full bg-slate-950/80 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500"
              value={formData.gender}
              onChange={e => setFormData({ ...formData, gender: e.target.value as any })}
            >
              <option value="male">乾造 (男)</option>
              <option value="female">坤造 (女)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-400">生辰日期</label>
            <input
              type="date"
              className="w-full bg-slate-950/80 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500"
              value={formData.birthDate}
              onChange={e => setFormData({ ...formData, birthDate: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-400">生辰时刻 (可选)</label>
            <input
              type="time"
              className="w-full bg-slate-950/80 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500"
              value={formData.birthTime}
              onChange={e => setFormData({ ...formData, birthTime: e.target.value })}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-slate-400">出生地点</label>
          <input
            type="text"
            className="w-full bg-slate-950/80 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500"
            placeholder="城市名 (如: 北京)"
            value={formData.location}
            onChange={e => setFormData({ ...formData, location: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-gradient-to-r ${getButtonColor()} text-slate-950 font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(217,119,6,0.1)] flex items-center justify-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <><i className="fa-solid fa-spinner animate-spin"></i> 正在窥探天机...</>
          ) : (
            <><i className={`fa-solid ${activeType === FortuneType.ICHING ? 'fa-dice' : activeType === FortuneType.ROMANCE ? 'fa-heart-pulse' : 'fa-wand-sparkles'}`}></i> 开始{activeType === FortuneType.ICHING ? '占卜' : '分析'}</>
          )}
        </button>
      </form>
    </div>
  );
};

export default FortuneForm;
