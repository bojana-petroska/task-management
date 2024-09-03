import { useState } from 'react';
import { v4 } from 'uuid';
import { EVENTS } from '../config/event';
import { socket } from '../config/default'

interface Task {
  id: string;
  title: string;
  description: string;
}

interface TaskManagerProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskManager: React.FC<TaskManagerProps> = ({ tasks, setTasks }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const addTask = () => {
    if (title && description) {
      const newTask: Task = {
        id: v4(),
        title,
        description,
      };
      socket.emit(EVENTS.CLIENT.ADD_TASK, newTask);
      setTitle('');
      setDescription('');
    }
  };

  const deleteTask = (id: string) => {
    socket.emit(EVENTS.CLIENT.DELETE_TASK, id);
    console.log('task deleted');
  };

  return (
    <div>
      <h2>task management:</h2>
      <input
        type="text"
        placeholder="add task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="add task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={addTask}>save</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => deleteTask(task.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
