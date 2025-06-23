import React from 'react'

export default function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <div className="absolute top-4 right-4 flex items-center space-x-2">
      <span className="text-sm text-gray-700 dark:text-gray-300">☀️</span>
      
      <label htmlFor="theme-toggle" className="relative inline-flex items-center cursor-pointer">
        <input
          id="theme-toggle"
          type="checkbox"
          className="sr-only peer"
          checked={darkMode}
          onChange={() => setDarkMode(prev => !prev)}
        />
        <div
          className={`
            w-11 h-6 rounded-full peer
            bg-gray-300 peer-checked:bg-green-500
            peer-focus:ring-2 peer-focus:ring-green-500
            after:content-[''] after:absolute after:top-[2px] after:left-[2px]
            after:bg-white after:border-gray-300 after:border after:rounded-full
            after:h-5 after:w-5 after:transition-all
            peer-checked:after:translate-x-full peer-checked:after:border-white
          `}
        />
      </label>
      
      <span className="text-sm text-gray-700 dark:text-gray-300">🌙</span>
    </div>
  )
}