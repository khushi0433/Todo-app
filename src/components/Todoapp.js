import React, { useState } from 'react';
import bgDark from '../assets/design/images/bg-desktop-dark.jpg';
import bgLight from '../assets/design/images/bg-desktop-light.jpg';
import iconCross from '../assets/design/images/icon-cross.svg';
import iconMoon from '../assets/design/images/icon-moon.svg';
import iconSun from '../assets/design/images/icon-sun.svg';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(true);

  const handleToggle = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen relative`}>
      {/* Background Image */}
      <div className="fixed top-0 left-0 w-full h-60 md:h-80 -z-10">
        <img
          src={darkMode ? bgDark : bgLight}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto pt-20 px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-[0.3em] text-white">TODO</h1>
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="text-white"
          >
            <img 
              src={darkMode ? iconSun : iconMoon} 
              alt={darkMode ? "Light Mode" : "Dark Mode"} 
              className="w-6 h-6"
            />
          </button>
        </div>

        {/* Input */}
        <div className={`${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-800'} rounded-md px-5 py-4 flex items-center shadow-lg mb-6`}>
          <div className="w-6 h-6 rounded-full border border-gray-600 mr-4"></div>
          <input
            type="text"
            placeholder="Create a new todo..."
            className="bg-transparent w-full outline-none placeholder-gray-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && input.trim()) {
                setTodos([...todos, { text: input.trim(), completed: false }]);
                setInput('');
              }
            }}
          />
        </div>

        {/* Todo List */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-md shadow-lg overflow-hidden`}>
          <div className="divide-y divide-gray-700">
            {filteredTodos.map((todo, index) => (
              <TodoItem
                key={index}
                text={todo.text}
                completed={todo.completed}
                onToggle={() => handleToggle(index)}
                onDelete={() => handleDelete(index)}
                darkMode={darkMode}
              />
            ))}
          </div>

          {/* Footer */}
          <div className="px-5 py-4 flex justify-between items-center text-sm text-gray-500">
            <span>{todos.filter(t => !t.completed).length} items left</span>
            <div className="hidden md:flex space-x-4">
              <FilterButton current={filter} value="all" onClick={() => setFilter('all')} darkMode={darkMode} />
              <FilterButton current={filter} value="active" onClick={() => setFilter('active')} darkMode={darkMode} />
              <FilterButton current={filter} value="completed" onClick={() => setFilter('completed')} darkMode={darkMode} />
            </div>
            <button onClick={handleClearCompleted} className="hover:text-gray-300">Clear Completed</button>
          </div>
        </div>

        {/* Mobile Filter */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} md:hidden rounded-md shadow-lg mt-4 px-5 py-4 flex justify-center space-x-4 text-sm text-gray-500`}>
          <FilterButton current={filter} value="all" onClick={() => setFilter('all')} darkMode={darkMode} />
          <FilterButton current={filter} value="active" onClick={() => setFilter('active')} darkMode={darkMode} />
          <FilterButton current={filter} value="completed" onClick={() => setFilter('completed')} darkMode={darkMode} />
        </div>

        {/* Drag Hint */}
        <p className="text-center text-gray-600 mt-10 text-sm">
          Drag and drop to reorder list
        </p>

        {/* Footer Attribution */}
        <footer className="text-center text-xs mt-6 text-gray-500">
          Challenge by{' '}
          <a
            href="https://www.frontendmentor.io/profile/khushi0433"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-400"
          >
            Frontend Mentor
          </a>
          . Coded by{' '}
          <a
            href="#"
            className="underline hover:text-blue-400"
          >
            khushi.k
          </a>
          .
        </footer>
      </div>
    </div>
  );
};

const TodoItem = ({ text, completed, onToggle, onDelete, darkMode }) => (
  <div className="px-5 py-4 flex items-center group">
    <div
      onClick={onToggle}
      className={`w-6 h-6 rounded-full border flex items-center justify-center mr-4 flex-shrink-0 cursor-pointer 
        ${completed ? 'bg-gradient-to-br from-blue-500 to-purple-500 border-none' : darkMode ? 'border-gray-600' : 'border-gray-300'} group-hover:border-blue-500`}
    >
      {completed && (
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
          <path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6" />
        </svg>
      )}
    </div>
    <span className={`${completed ? 'line-through text-gray-500' : darkMode ? 'text-gray-300' : 'text-gray-800'} group-hover:text-gray-100`}>
      {text}
    </span>
    <button onClick={onDelete} className="ml-auto opacity-0 group-hover:opacity-100">
      <img src={iconCross} alt="Delete" className="w-4 h-4" />
    </button>
  </div>
);

const FilterButton = ({ current, value, onClick, darkMode }) => (
  <button
    onClick={onClick}
    className={`capitalize ${current === value ? 'text-blue-400' : darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-500 hover:text-gray-800'}`}
  >
    {value}
  </button>
);

export default TodoApp;
