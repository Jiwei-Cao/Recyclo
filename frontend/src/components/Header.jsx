import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <header className="absolute top-4 left-4 z-50 flex space-x-6">
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
    </header>
  );
}