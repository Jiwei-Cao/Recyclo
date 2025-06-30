import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Header( {darkMode, setDarkMode}) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <header className="w-full px-4 py-2 flex items-center justify-between absolute top-0 left-0 z-50">
      <div className="flex space-x-6">
        <button
          className="text-lg font-bold hover:text-green-600 transition"
          onClick={() => navigate("/")}
        >
          🌱 Recyclo
        </button>
        <button
          className="text-lg hover:text-green-600 transition"
          onClick={() => navigate(token ? "/stats" : "/login")}
        >
          {token ? "📊 My Stats" : "🔑 Login"}
        </button>
        <button
          className="text-lg hover:text-green-600 transition"
          onClick={() => navigate("/leaderboard")}
        >
          🏆 Leaderboard
        </button>
      </div>

      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
    </header>
  );
}