


import React, { useState } from 'react';

function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [editTaskValue, setEditTaskValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
      setCurrentPage(Math.ceil((tasks.length + 1) / tasksPerPage));
    }
  };

  const startEditTask = (index) => {
    setEditTaskIndex(index);
    setEditTaskValue(tasks[index]);
  };

  const saveUpdatedTask = (index) => {
    const updatedTasks = tasks.map((task, i) => (i === index ? editTaskValue : task));
    setTasks(updatedTasks);
    cancelEditTask();
  };

  const cancelEditTask = () => {
    setEditTaskIndex(null);
    setEditTaskValue('');
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    if ((currentPage - 1) * tasksPerPage >= updatedTasks.length) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const nextPage = () => {
    if (currentPage < Math.ceil(tasks.length / tasksPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-10">
      <div className="bg-white p-8  rounded-lg shadow-lg w-full max-w-md transform transition duration-500 hover:scale-105">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Track the daily task here !</h1>
        <div className="mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter new task"
          />
          <button
            onClick={addTask}
            className="w-full bg-blue-500 text-white p-2 mt-4 rounded-full hover:bg-blue-600 transition duration-200 transform hover:scale-105"
          >
            Add New Task
          </button>
        </div>
        <ul>
          {currentTasks.map((task, index) => (
            <li
              key={indexOfFirstTask + index}
              className="p-2 mb-3 bg-gray-50 rounded-lg shadow-md flex justify-between items-center transform transition duration-200 hover:scale-105"
            >
              {editTaskIndex === indexOfFirstTask + index ? (
                <input
                  type="text"
                  value={editTaskValue}
                  onChange={(e) => setEditTaskValue(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                />
              ) : (
                <span className="flex-grow text-gray-800">{task}</span>
              )}
              <div className="flex space-x-1">
                {editTaskIndex === indexOfFirstTask + index ? (
                  <>
                    <button
                      onClick={() => saveUpdatedTask(indexOfFirstTask + index)}
                      className="bg-green-500 text-white p-1 rounded-full hover:bg-green-600 transition duration-200 transform hover:scale-105"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditTask}
                      className="bg-gray-500 text-white p-1 rounded-full hover:bg-gray-600 transition duration-200 transform hover:scale-105"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEditTask(indexOfFirstTask + index)}
                      className="bg-yellow-500 text-white p-1 rounded-full hover:bg-yellow-600 transition duration-200 transform hover:scale-105"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deleteTask(indexOfFirstTask + index)}
                      className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition duration-200 transform hover:scale-105"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`p-1 rounded-full ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500'} text-white hover:bg-blue-600 transition duration-200 transform hover:scale-105`}
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === Math.ceil(tasks.length / tasksPerPage)}
            className={`p-1 rounded-full ${currentPage === Math.ceil(tasks.length / tasksPerPage) ? 'bg-gray-300' : 'bg-blue-500'} text-white hover:bg-blue-600 transition duration-200 transform hover:scale-105`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskApp;
