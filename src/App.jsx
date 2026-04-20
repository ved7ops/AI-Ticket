import React, { useEffect, useState } from 'react';
import { useWorkspace } from './hooks/useWorkspace';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { NotificationStack } from './components/ui/NotificationStack';
import { PingbixQueue } from './components/ui/PingbixQueue';
import { DashboardView } from './features/dashboard/DashboardView';
import { TaskTrackerView } from './features/tasks/TaskTrackerView';
import { InboxView } from './features/inbox/InboxView';
import { MeetingsView } from './features/meetings/MeetingsView';
import { SmartDriveView } from './features/drive/SmartDriveView';
import { ReportsView } from './features/reports/ReportsView';
import { AutomationsView } from './features/automations/AutomationsView';
import { AnalyticsView } from './features/analytics/AnalyticsView';

export default function App() {
  const workspace = useWorkspace();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 flex overflow-hidden selection:bg-indigo-100">
      {isMobileSidebarOpen && (
        <button
          type="button"
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 z-20 bg-slate-950/60 backdrop-blur-[2px] md:hidden"
          aria-label="Close sidebar overlay"
        />
      )}
      <Sidebar
        currentUser={workspace.currentUser}
        users={workspace.users}
        activeView={workspace.activeView}
        setActiveView={workspace.setActiveView}
        setCurrentUser={workspace.setCurrentUser}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className={`flex-1 min-w-0 flex flex-col h-screen relative transition-[margin] duration-300 ease-out ${isSidebarCollapsed ? 'md:ml-[92px]' : 'md:ml-[280px]'}`}>
        <Header
          currentUser={workspace.currentUser}
          onToggleSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        <NotificationStack notifications={workspace.notifications} />
        <PingbixQueue pingbixQueue={workspace.pingbixQueue} />

        <main className="flex-1 w-full min-w-0 p-4 md:p-10 overflow-y-auto overflow-x-hidden">
          {workspace.activeView === 'dashboard' && (
            <DashboardView
              currentUser={workspace.currentUser}
              tasks={workspace.tasks}
              pingbixLogs={workspace.pingbixLogs}
              automations={workspace.automations}
              simulateIncomingEmail={workspace.simulateIncomingEmail}
              updateTaskStatus={workspace.updateTaskStatus}
            />
          )}
          {workspace.activeView === 'tasks' && (
            <TaskTrackerView users={workspace.users} tasks={workspace.tasks} createTask={workspace.createTask} updateTaskStatus={workspace.updateTaskStatus} currentUser={workspace.currentUser} />
          )}
          {workspace.activeView === 'inbox' && <InboxView emailThreads={workspace.emailThreads} setEmailThreads={workspace.setEmailThreads} notify={workspace.notify} />}
          {workspace.activeView === 'meetings' && <MeetingsView meetings={workspace.meetings} setMeetings={workspace.setMeetings} notify={workspace.notify} />}
          {workspace.activeView === 'drive' && <SmartDriveView files={workspace.files} notify={workspace.notify} />}
          {workspace.activeView === 'reports' && <ReportsView notify={workspace.notify} />}
          {workspace.activeView === 'automations' && <AutomationsView automations={workspace.automations} />}
          {workspace.activeView === 'analytics' && <AnalyticsView />}
        </main>
      </div>
    </div>
  );
}
