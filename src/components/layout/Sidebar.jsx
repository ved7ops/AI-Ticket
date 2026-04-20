import React from 'react';
import {
  BarChart3,
  CheckSquare,
  FileText,
  HardDrive,
  LayoutDashboard,
  Mail,
  PanelLeftClose,
  PanelRightClose,
  Settings2,
  Video,
  Zap,
} from 'lucide-react';
import { NavItem } from '../ui/NavItem';

export function Sidebar({
  currentUser,
  users,
  activeView,
  setActiveView,
  setCurrentUser,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}) {
  const isMobileDrawer = isMobileOpen;
  const compact = isCollapsed && !isMobileDrawer;
  const handleNavigate = (view) => {
    setActiveView(view);
    onCloseMobile();
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-30 h-screen bg-[#090E17] text-slate-300 flex flex-col shadow-2xl border-r border-white/5 transition-all duration-300 ease-out
        ${isMobileDrawer ? 'w-[50vw] min-w-[240px] max-w-[320px]' : compact ? 'w-[92px]' : 'w-[280px]'}
        ${isMobileDrawer ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
    >
      <div className={`border-b border-white/5 ${compact ? 'p-4' : 'p-6'} flex items-center justify-between gap-3 text-white font-bold tracking-tighter`}>
        <div className={`flex items-center gap-3 ${compact ? 'justify-center w-full' : ''}`}>
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <Zap size={24} />
          </div>
          {(!compact || isMobileDrawer) && <span className="text-2xl">Synapse OS</span>}
        </div>
        {isMobileDrawer ? (
          <button
            type="button"
            onClick={onCloseMobile}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-colors"
            aria-label="Close sidebar"
          >
            <PanelLeftClose size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden md:inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-colors"
            aria-label={compact ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {compact ? <PanelRightClose size={16} /> : <PanelLeftClose size={16} />}
          </button>
        )}
      </div>

      <div className={`border-b border-white/5 bg-white/5 ${compact ? 'p-3' : 'p-5'}`}>
        <select
          className={`w-full bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-white outline-none cursor-pointer ${compact ? 'p-2' : 'p-3'}`}
          value={currentUser.id}
          onChange={(event) => setCurrentUser(users.find((user) => user.id === event.target.value) || currentUser)}
          title={compact ? currentUser.name : undefined}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <nav className={`flex-1 overflow-y-auto ${compact ? 'p-2 space-y-2' : 'p-4 space-y-1'}`}>
        <NavItem compact={compact} active={activeView === 'dashboard'} onClick={() => handleNavigate('dashboard')} icon={<LayoutDashboard />} label="Dashboard" />
        <NavItem compact={compact} active={activeView === 'tasks'} onClick={() => handleNavigate('tasks')} icon={<CheckSquare />} label="Task Flow" />
        <NavItem compact={compact} active={activeView === 'inbox'} onClick={() => handleNavigate('inbox')} icon={<Mail />} label="AI Inbox" />
        <NavItem compact={compact} active={activeView === 'meetings'} onClick={() => handleNavigate('meetings')} icon={<Video />} label="Meetings" />

        {!compact && <div className="pt-6 pb-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest px-4">Workspace Tools</div>}
        <NavItem compact={compact} active={activeView === 'drive'} onClick={() => handleNavigate('drive')} icon={<HardDrive />} label="Knowledge Base" />
        <NavItem compact={compact} active={activeView === 'reports'} onClick={() => handleNavigate('reports')} icon={<FileText />} label="Auto Reports" />
        <NavItem compact={compact} active={activeView === 'analytics'} onClick={() => handleNavigate('analytics')} icon={<BarChart3 />} label="System Intel" />

        {currentUser.role === 'admin' && (
          <>
            {!compact && <div className="pt-6 pb-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest px-4">Administration</div>}
            <NavItem compact={compact} active={activeView === 'automations'} onClick={() => handleNavigate('automations')} icon={<Settings2 />} label="Pingbix Engine" />
          </>
        )}
      </nav>
    </aside>
  );
}
