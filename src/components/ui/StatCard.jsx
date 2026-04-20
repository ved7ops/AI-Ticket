import React from 'react';

export function StatCard({ label, value, color, icon }) {
  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200 flex items-center justify-between gap-4 min-w-0 group cursor-default hover:shadow-md transition-all">
      <div className="min-w-0">
        <div className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">{label}</div>
        <div className="font-black text-2xl md:text-3xl text-slate-800 truncate">{value}</div>
      </div>
      <div className={`w-12 h-12 rounded-xl ${color} text-white flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>{icon}</div>
    </div>
  );
}
