import React from 'react';
import { Activity, CheckSquare, Clock, GitMerge, MessageSquare, Zap } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';

const formatDate = (value) => new Date(value).toISOString().split('T')[0];

export function DashboardView({ currentUser, tasks, pingbixLogs, automations, simulateIncomingEmail, updateTaskStatus }) {
  const myTasks = tasks.filter((task) => task.assignee === currentUser.id);
  const completionRate = Math.round((myTasks.filter((task) => task.status === 'completed').length / (myTasks.length || 1)) * 100);

  return (
    <div className="max-w-screen-2xl mx-auto w-full space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">Workspace Dashboard</h1>
          <p className="text-slate-500 mt-1">Hello, {currentUser.name}. Here is your operational focus for today.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={simulateIncomingEmail} className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-sm">
            <MessageSquare size={16} /> Simulate Email
          </button>
          <div className="text-sm font-bold bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl border border-indigo-100 flex items-center gap-2">
            <Clock size={16} /> {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4">
        <StatCard label="My Open Tasks" value={myTasks.filter((task) => task.status !== 'completed').length} color="bg-indigo-600" icon={<CheckSquare size={20} />} />
        <StatCard label="Success Rate" value={`${completionRate}%`} color="bg-emerald-600" icon={<Activity size={20} />} />
        <StatCard label="Pingbix Alerts" value={pingbixLogs.length} color="bg-[#25D366]" icon={<MessageSquare size={20} />} />
        <StatCard label="Active Rules" value={automations.filter((automation) => automation.active).length} color="bg-purple-600" icon={<GitMerge size={20} />} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 min-w-0">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Clock className="text-indigo-500" /> Current Workload
          </h3>
          <div className="space-y-4">
            {myTasks.filter((task) => task.status !== 'completed').length === 0 ? (
              <div className="p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400 font-medium">
                Workspace clear. No pending tasks.
              </div>
            ) : (
              myTasks
                .filter((task) => task.status !== 'completed')
                .map((task) => (
                  <div key={task.id} className="p-4 border border-slate-100 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-50/30 hover:bg-slate-50 transition-all gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-slate-800">{task.title}</h4>
                        <span
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                            task.priority === 'urgent'
                              ? 'bg-red-100 text-red-700'
                              : task.priority === 'high'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 line-clamp-1">{task.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Due</div>
                        <div className={`text-sm font-bold ${task.deadline <= formatDate(new Date()) ? 'text-red-600' : 'text-slate-700'}`}>{task.deadline}</div>
                      </div>
                      <select
                        className="text-xs border border-slate-200 rounded-lg p-2 bg-white text-slate-700 font-bold cursor-pointer outline-none focus:border-indigo-500"
                        value={task.status}
                        onChange={(event) => updateTaskStatus(task.id, event.target.value)}
                      >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="review">Review</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        <div className="space-y-6 min-w-0">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <MessageSquare className="text-[#25D366]" /> Recent Notifications
            </h3>
            <div className="space-y-3">
              {pingbixLogs.length === 0 ? (
                <p className="text-sm text-slate-500 italic">No activity logs recorded.</p>
              ) : (
                pingbixLogs.slice(0, 3).map((log) => (
                  <div key={log.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-slate-700 truncate">{log.user}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{log.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2">{log.message.replace(/\*/g, '')}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl shadow-xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Zap size={80} />
            </div>
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-indigo-400">
              <Zap size={20} /> AI Status
            </h3>
            <p className="text-slate-400 text-xs mb-4">Synapse Core is optimizing your workflows across Drive, Mail, and automation rules.</p>
            <div className="space-y-2 text-xs font-bold uppercase tracking-widest text-slate-500">
              <div className="flex items-center justify-between">
                <span>Task Parser</span> <span className="text-emerald-400">Ready</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Rule Engine</span> <span className="text-emerald-400">Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
