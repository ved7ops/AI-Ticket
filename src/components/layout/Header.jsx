import React from 'react';
import { Search } from 'lucide-react';

export function Header({ currentUser }) {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-10">
      <div className="flex items-center gap-3 bg-slate-100 border border-slate-200 px-5 py-2.5 rounded-2xl w-96 focus-within:bg-white focus-within:border-indigo-500 transition-all">
        <Search size={16} className="text-slate-400" />
        <input type="text" placeholder="AI Command Search..." className="bg-transparent border-none outline-none text-xs w-full text-slate-700 font-bold" />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 p-1.5 pr-4 bg-white border border-slate-200 rounded-full shadow-sm">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">{currentUser.name.charAt(0)}</div>
          <div className="text-xs font-bold hidden md:block">{currentUser.name}</div>
        </div>
      </div>
    </header>
  );
}

