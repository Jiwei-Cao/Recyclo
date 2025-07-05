import React from 'react'

function ThemeToggle({ darkMode, setDarkMode }) {
  const wrapperClasses = `flex items-center space-x-2`

  const iconClasses = `
    text-2xl transition-colors duration-300
    ${darkMode ? 'text-gray-300' : 'text-gray-600'}
  `

  const inputClasses = `sr-only peer`

  const trackBase = `
    w-11 h-6 rounded-full peer
    bg-gray-300 peer-checked:bg-green-500
    peer-focus:ring-2 peer-focus:ring-green-500
  `

  const thumbBase = `
    after:content-[''] after:absolute after:top-[2px] after:left-[2px]
    after:bg-white after:border-gray-300 after:border after:rounded-full
    after:h-5 after:w-5 after:transition-all
    peer-checked:after:translate-x-full peer-checked:after:border-white
  `

  const switchClasses = `${trackBase} ${thumbBase}`

  return (
    <div className={wrapperClasses}>
      <span className={iconClasses}>☀️</span>

      <label htmlFor="theme-toggle" className="relative inline-flex items-center cursor-pointer">
        <input
          id="theme-toggle"
          type="checkbox"
          className={inputClasses}
          checked={darkMode}
          onChange={() => setDarkMode(prev => !prev)}
        />
        <div className={switchClasses} />
      </label>

      <span className={iconClasses}>🌙</span>
    </div>
  )
};

export default ThemeToggle;