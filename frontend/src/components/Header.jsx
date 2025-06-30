import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Header( {darkMode, setDarkMode}) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const headerClass = `
    w-full px-4 py-2 flex items-center justify-between absolute top-0 left-0 z-50
  `

  const buttonClass = `
    text-lg font-bold hover:text-green-600 transition cursor-pointer 
  `

  return (
    <header className={headerClass}>
      <div className="flex space-x-6">
        <button
          className={buttonClass}
          onClick={() => navigate("/")}
        >
          🌱 Recyclo
        </button>
        <button
          className={buttonClass}
          onClick={() => navigate(token ? "/stats" : "/login")}
        >
          {token ? "📊 My Stats" : "🔑 Login"}
        </button>
        <button
          className={buttonClass}
          onClick={() => navigate("/leaderboard")}
        >
          🏆 Leaderboard
        </button>
      </div>

      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
    </header>
  );
}