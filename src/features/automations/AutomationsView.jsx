import React from 'react';
import { GitMerge, MessageCircle, Settings2 } from 'lucide-react';

export function AutomationsView({ automations }) {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-3">
        <Settings2 className="text-slate-600" /> Pingbix Engine
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 text-sm mb-4 uppercase tracking-widest border-b pb-2">Rule Stack</h3>
          {automations.map((rule) => (
            <div key={rule.id} className="p-5 bg-white rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${rule.active ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                  <GitMerge size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800">{rule.name}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 font-mono">IF {rule.trigger} THEN {rule.action}</p>
                </div>
              </div>
              <div className={`w-10 h-5 rounded-full relative transition-all cursor-pointer ${rule.active ? 'bg-[#25D366]' : 'bg-slate-300'}`}>
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${rule.active ? 'right-1' : 'left-1'}`} />
              </div>
            </div>
          ))}
        </div>
        <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-2xl h-fit">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#25D366] p-2 rounded-xl text-white">
              <MessageCircle size={24} />
            </div>
            <div>
              <h3 className="font-bold">Pingbix WA Gateway</h3>
              <p className="text-xs text-slate-400">Enterprise Messaging v4.2</p>
            </div>
          </div>
          <div className="space-y-4 mb-8">
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
              <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase">API Health</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]" /> <span className="text-sm font-bold">Stable (0.2s lat)</span>
              </div>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
              <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase">Messaging Quota</div>
              <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                <div className="w-[12%] h-full bg-[#25D366]" />
              </div>
              <div className="text-[10px] text-slate-400 mt-2">1,245 / 10,000 requests used</div>
            </div>
          </div>
          <button className="w-full py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition-all">Configure API Webhooks</button>
        </div>
      </div>
    </div>
  );
}

