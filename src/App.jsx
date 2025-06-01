import React, { useState, useEffect } from 'react'
import { Plus, Trash, Check, Pin } from 'lucide-react'

function App() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

useEffect(() => {
    let todoString = localStorage.getItem("tasks")
    if(todoString){
      let savedTasks = JSON.parse(todoString)
      setTasks(savedTasks)
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }, [tasks, isLoaded])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000)
    return () => clearInterval(timer);
  }, [])
  const formattedDate = currentTime.toLocaleDateString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const formattedTime = currentTime.toLocaleTimeString();



  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));

  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };
  const clearAllTasks =()=>{
    setTasks([])
  }

  
  return (
    <div>
      
    <div className='w-full h-screen flex justify-center items-center bg-cover bg-no-repeat relative'
      style={{ backgroundImage: `url('https://cdn.dribbble.com/userupload/9614848/file/original-1d1f12e724e6ad957308f40b6434cbfa.jpg?resize=1600x900&vertical=center')`, }}
      
    >
      
      <div className="absolute right-1 top-1 bottom-1 w-full max-w-md rounded-xl backdrop-blur-sm bg-fuchsia-400/30">
        <div className="absolute w-full top-0 h-32 bg-violet-400 rounded">
          <div className="relative top-2 bottom-2 text-center text-2xl font-semibold text-gray-800">
            <span><Pin/></span>
            <span>To-Do List</span>
          </div>
          <div className='relative left-4 top-5 '>Date: {formattedDate}
            <span className='fixed right-2 text-sm font-semibold'>Completed : {tasks.filter(t => t.completed).length}</span>
          </div>
          <div className='relative left-4 top-6'>Time: {formattedTime}
            <span className='fixed right-2 text-sm font-semibold'>Remaining : {tasks.filter(t => !t.completed).length}</span>
          </div>
        </div>
        <div className='absolute w-full pt-4 px-4 top-32'>
          <div className="flex items-center gap-2 mb-6 ">
            <input
              type="text"
              placeholder="Enter your task here..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyUp={handleKeyPress}
              className="flex-1 p-3 rounded-xl border border-gray-300 outline-none backdrop-blur-md bg-white placeholder-gray-600 text-gray-800"
            />
            <button className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
              onClick={addTask}
              title='Add a task'>
              <Plus size={20} />
            </button>
            <button className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600"
              onClick={clearAllTasks}
              title="Clear All Tasks">
              <Trash size={20} />
            </button>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {tasks.map((taskItem) => (
              <div key={taskItem.id}
                className={`flex items-center gap-3 p-3 rounded-lg  ${taskItem.completed
                    ? 'bg-green-100/50 '
                    : 'bg-white/60'
                  }`}
              >
                <button
                  onClick={() => toggleTask(taskItem.id)}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${taskItem.completed
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-400 hover:border-green-400'
                    }`}
                >
                  {taskItem.completed && <Check size={14} />}
                </button>

                <span
                  className={`flex-1 text-gray-800 ${taskItem.completed ? 'line-through opacity-60' : ''
                    }`}
                >
                  {taskItem.text}
                </span>

                <button
                  onClick={() => deleteTask(taskItem.id)}
                  className="flex-shrink-0 p-1 text-red-500 hover:text-red-700 rounded transition-colors"
                >
                  <Trash size={16} />
                </button>
              </div>
              ))}
            </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default App