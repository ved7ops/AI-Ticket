import React from 'react';
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 flex overflow-hidden selection:bg-indigo-100">
      <Sidebar
        currentUser={workspace.currentUser}
        users={workspace.users}
        activeView={workspace.activeView}
        setActiveView={workspace.setActiveView}
        setCurrentUser={workspace.setCurrentUser}
      />

      <div className="flex-1 ml-[280px] flex flex-col h-screen relative">
        <Header currentUser={workspace.currentUser} />

        <NotificationStack notifications={workspace.notifications} />
        <PingbixQueue pingbixQueue={workspace.pingbixQueue} />

        <main className="flex-1 p-10 overflow-y-auto">
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
