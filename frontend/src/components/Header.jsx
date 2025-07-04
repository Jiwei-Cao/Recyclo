import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header( {darkMode, setDarkMode}) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const [menuOpen, setMenuOpen] = useState(false);

  const headerClass = `
    w-full px-4 py-2 flex items-center justify-between absolute top-0 left-0 z-50
  `

  const buttonClass = `
    text-lg font-bold hover:text-green-600 transition cursor-pointer 
  `

  const dropdownClass = `
    absolute right-2 top-12 mt-2 w-48 rounded-md shadow-lg z-50
    ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800 border border-gray-300"}
  `;

  const itemClass = `
    px-4 py-2 text-sm hover:bg-green-500 hover:text-white cursor-pointer
  `;

  return (
    <header className={headerClass}>
      <div className="flex space-x-6">
        <button className={buttonClass} onClick={() => navigate("/")}>
          🌱 Recyclo
        </button>

        <button className={buttonClass} onClick={() => navigate("/leaderboard")}>
          👑 
        </button>
      </div>

      <div className="flex items-center gap-4 relative">
        {token ? (
          <button className={buttonClass} onClick={() => setMenuOpen(!menuOpen)}>
            👤 {username}
          </button>
        ) : (
          <button className={buttonClass} onClick={() => navigate("/auth/login")}>
            🔐 Login
          </button>
        )}

        {menuOpen && token && (
          <div className={dropdownClass}>
            <div className={itemClass} onClick={() => { navigate("/stats"); setMenuOpen(false); }}>
              📊 User Stats
            </div>
            <div className={itemClass} onClick={() => { navigate("/settings"); setMenuOpen(false); }}>
              ⚙️ Account Settings
            </div>
            <div className={itemClass} onClick={() => {
              localStorage.clear();
              setMenuOpen(false);
              navigate("/auth/login");
            }}>
              🚪 Sign Out
            </div>
          </div>
        )}

        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </header>
  );
}