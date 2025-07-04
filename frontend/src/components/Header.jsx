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
  const rightSectionClass = `flex items-center gap-6 pl-4 relative`

  const buttonClass = `
    text-2x1 font-bold hover:text-green-600 transition cursor-pointer 
  `

  const dropdownClass = `
    absolute right-0 top-16 mt-2 w-52 rounded-md shadow-lg z-50
    ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800 border border-gray-300"}
  `;

  const itemClass = `
    px-4 py-2 text-base hover:bg-green-500 hover:text-white cursor-pointer
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
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

        {token ? (
          <div onMouseEnter={() => setMenuOpen(true)} onMouseLeave={() => setMenuOpen(false)} className="relative"
          >
            <span className="text-2xl font-bold hover:text-green-600 transition">
              👤 {username}
            </span>

            {menuOpen && (
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
        ) : (
          <button className={buttonClass} onClick={() => navigate("/auth/login")}>
            🔐 Login
          </button>
        )}
      </div>
    </header>
  );
}