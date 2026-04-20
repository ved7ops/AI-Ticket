import React, { useState } from 'react';
import { FileText, RefreshCw, Zap } from 'lucide-react';
import { callGroq } from '../../services/groq';

export function ReportsView({ notify }) {
  const [text, setText] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleFormalize = async () => {
    setProcessing(true);
    const prompt = `Convert the following notes into a formal Markdown table for a weekly report. Table headers: Task, Detail, Status. Notes: ${text}`;
    const response = await callGroq(prompt, 'You are a professional report writer.');
    setText(response);
    setProcessing(false);
    notify('Notes transformed into formal report format.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-3">
        <FileText className="text-orange-500" /> AI Reporting
      </h1>
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Workspace Context / Rough Notes</label>
          <button onClick={() => setText('Worked on API bugs. Completed 2. Blocked on design.')} className="text-[10px] bg-slate-100 px-2 py-1 rounded font-bold text-slate-600">
            Load Draft
          </button>
        </div>
        <textarea value={text} onChange={(event) => setText(event.target.value)} className="w-full h-80 bg-slate-50 rounded-2xl p-6 border-2 border-slate-100 outline-none focus:border-indigo-500 font-mono text-xs mb-6 transition-all" placeholder="Jot down your progress..." />
        <div className="flex gap-4">
          <button onClick={handleFormalize} disabled={processing} className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition-all flex items-center justify-center gap-2">
            {processing ? <RefreshCw className="animate-spin" size={20} /> : <Zap size={20} />}
            {processing ? 'AI Formatting...' : 'Formalize with AI'}
          </button>
          <button onClick={() => notify('Report dispatched to stakeholders.', 'success')} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold">
            Send Report
          </button>
        </div>
      </div>
    </div>
  );
}

