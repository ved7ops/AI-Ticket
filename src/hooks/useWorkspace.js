import { useState } from 'react';
import {
  INITIAL_AUTOMATIONS,
  INITIAL_EMAIL_THREADS,
  INITIAL_FILES,
  INITIAL_MEETINGS,
  INITIAL_TASKS,
  INITIAL_USERS,
} from '../data/seed';

const createId = (prefix) => `${prefix}${Date.now()}`;

export function useWorkspace() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState(INITIAL_USERS[0]);
  const [activeView, setActiveView] = useState('dashboard');
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [files] = useState(INITIAL_FILES);
  const [emailThreads, setEmailThreads] = useState(INITIAL_EMAIL_THREADS);
  const [automations] = useState(INITIAL_AUTOMATIONS);
  const [meetings, setMeetings] = useState(INITIAL_MEETINGS);
  const [notifications, setNotifications] = useState([]);
  const [pingbixQueue, setPingbixQueue] = useState([]);
  const [pingbixLogs, setPingbixLogs] = useState([]);

  const notify = (msg, type = 'info') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    }, 5000);
  };

  const triggerPingbixMessage = (userId, templateName, payload) => {
    const user = users.find((candidate) => candidate.id === userId);
    if (!user || !user.integrations.pingbix) return;

    let messageText = '';
    if (templateName === 'task_assigned') {
      messageText = `🔔 *New Task Assigned*\n*Task:* ${payload.title}\n*Due:* ${payload.deadline}\n*Priority:* ${payload.priority}\n\n_Powered by Pingbix API_`;
    } else if (templateName === 'task_completed') {
      messageText = `✅ *Task Completed*\n*Task:* ${payload.title}\n*Completed by:* ${payload.assigneeName}\n\n_Powered by Pingbix API_`;
    } else if (templateName === 'email_alert') {
      messageText = `📧 *Important Email Arrived*\n*Subject:* ${payload.subject}\n*From:* ${payload.from}\n*AI Note:* Requires your attention.\n\n_Powered by Pingbix API_`;
    } else {
      messageText = payload.text || 'New Notification Arrived.';
    }

    const id = Date.now();
    const logEntry = {
      id,
      user: user.name,
      phone: user.phone,
      message: messageText,
      timestamp: new Date().toLocaleTimeString(),
      status: 'Delivered',
    };

    setPingbixLogs((prev) => [logEntry, ...prev]);
    setPingbixQueue((prev) => [...prev, logEntry]);
    setTimeout(() => {
      setPingbixQueue((prev) => prev.filter((entry) => entry.id !== id));
    }, 8000);
  };

  const createTask = (taskObj) => {
    const newTask = { id: createId('t'), ...taskObj };
    setTasks((prev) => [...prev, newTask]);

    const automationEnabled = automations.find((rule) => rule.trigger === 'task_assigned' && rule.active);
    if (automationEnabled) {
      triggerPingbixMessage(taskObj.assignee, 'task_assigned', newTask);
    }

    const assignedUser = users.find((candidate) => candidate.id === taskObj.assignee);
    notify(`Task assigned to ${assignedUser?.name || 'team member'}`, 'success');
  };

  const updateTaskStatus = (taskId, newStatus) => {
    const task = tasks.find((candidate) => candidate.id === taskId);
    if (!task) return;

    setTasks((prev) => prev.map((candidate) => (candidate.id === taskId ? { ...candidate, status: newStatus } : candidate)));

    if (newStatus === 'completed' && automations.find((rule) => rule.trigger === 'task_completed' && rule.active)) {
      const assigneeName = users.find((candidate) => candidate.id === task.assignee)?.name;
      triggerPingbixMessage(task.creator, 'task_completed', { ...task, assigneeName });
    }
  };

  const simulateIncomingEmail = () => {
    const id = createId('th');
    const newThread = {
      id,
      subject: 'URGENT: Production Server Down',
      participants: ['client_ops@enterprise.com', 'alex@synapse.ai'],
      messages: [
        {
          id: createId('m'),
          sender: 'client_ops@enterprise.com',
          isMe: false,
          text: 'The main API gateway is returning 502 errors. We need an engineer on this immediately.',
          time: new Date().toLocaleTimeString(),
        },
      ],
      analyzed: false,
      aiSummary: null,
    };

    setEmailThreads((prev) => [newThread, ...prev]);
    notify('New urgent email received.', 'warning');

    if (automations.find((rule) => rule.trigger === 'urgent_email_received' && rule.active)) {
      triggerPingbixMessage('u2', 'email_alert', { subject: newThread.subject, from: newThread.participants[0] });
    }
  };

  return {
    users,
    setUsers,
    currentUser,
    setCurrentUser,
    activeView,
    setActiveView,
    tasks,
    files,
    emailThreads,
    setEmailThreads,
    automations,
    meetings,
    setMeetings,
    notifications,
    pingbixQueue,
    pingbixLogs,
    notify,
    createTask,
    updateTaskStatus,
    simulateIncomingEmail,
  };
}

