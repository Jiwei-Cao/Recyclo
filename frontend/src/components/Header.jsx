import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const [menuOpen, setMenuOpen] = useState(false);

  const headerClass = `
    w-full px-8 py-4 flex items-center justify-between absolute top-0 left-0 z-50
  `

  const leftSectionClass = `flex items-center gap-12`
  const rightSectionClass = `flex items-center gap-2 relative`

  const buttonClass = `
    text-2xl font-bold hover:text-green-600 
    transition cursor-pointer 
  `

  const dropdownClass = `
    absolute right-0 top-full mt-1 w-52 rounded-md 
    shadow-lg z-50
    ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800 border border-gray-300"}
  `;

  const itemClass = `
    px-4 py-2 text-base hover:bg-green-500 
    hover:text-white cursor-pointer
  `;

  return (
    <header className={headerClass}>
      <div className={leftSectionClass}>
        <button className={buttonClass} onClick={() => navigate("/")}>
          🌱 Recyclo
        </button>

        <button className={buttonClass} onClick={() => navigate("/leaderboard")}>
          👑 Global Leaderboard
        </button>
      </div>

      <div className={rightSectionClass}>
        <div 
          className="relative mr-2"
          onMouseEnter={() => token && setMenuOpen(true)}
          onMouseLeave={() => token && setMenuOpen(false)}
        >
          <span className={`text-2xl font-bold hover:text-green-600 transition ${
              token ? "cursor-default" : "cursor-pointer"
            }`}
            onClick={() => !token && navigate("/auth/login")}
          >
            👤 {token ? username : "Login"}
          </span>

          {token && menuOpen && (
            <div className={dropdownClass}>
              <div
                className={itemClass}
                onClick={() => {
                  navigate("/stats");
                  setMenuOpen(false);
                }}
              >
                📊 User Stats
              </div>
              <div
                className={itemClass}
                onClick={() => {
                  localStorage.clear();
                  setMenuOpen(false);
                  navigate("/auth/login");
                }}
              >
                🚪 Sign Out
              </div>
            </div>
          )}
        </div>

        {/* Dark mode toggle */}
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </header>
  );
}