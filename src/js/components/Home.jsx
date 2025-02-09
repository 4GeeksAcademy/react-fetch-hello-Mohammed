import React, { useState, useEffect } from 'react';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
        if (!response.ok) {
          throw new Error('Error al cargar las tareas');
        }
        const data = await response.json();
        const initialTasks = data.map(task => ({
          id: task.id,
          text: task.title,
        }));
        setTasks(initialTasks);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = (e) => {
    if (e.key === 'Enter' && newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="app">
      <h1>Lista de Tareas</h1>
      <div className="todo-list">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleAddTask}
          placeholder="Añade una tarea y presiona Enter"
        />

        {tasks.length === 0 ? (
          <p>No hay tareas, añadir tareas</p>
        ) : (
          <ul>
            {tasks.map(task => (
              <li
                key={task.id}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                {task.text}
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  style={{ marginLeft: '10px', display: 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.display = 'inline-block')}
                  onMouseLeave={(e) => (e.currentTarget.style.display = 'none')}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;