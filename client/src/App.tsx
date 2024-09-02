import React, { useEffect, useState } from 'react';
import './App.css';
import TaskManager from './components/TaskManager';
import { EVENTS } from './config/event';
import { socket } from './config/default'

interface Task {
  id: string;
  title: string;
  description: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    socket.on(EVENTS.SERVER.ADD_TASK, (newTask: Task[]) => {
      setTasks(newTask);
    });

    socket.on(EVENTS.SERVER.DELETE_TASK, (updatedTasks: Task[]) => {
      setTasks(updatedTasks);
    });

    return () => {
      socket.off(EVENTS.SERVER.ADD_TASK);
      socket.off(EVENTS.SERVER.DELETE_TASK);
    };
  }, []);

  return (
    <div>
      <TaskManager tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
