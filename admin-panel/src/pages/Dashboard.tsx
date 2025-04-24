// src/pages/Dashboard.tsx
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token"); // Удаляем токен
    navigate("/login"); // Перенаправляем на страницу логина
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Hello, Dashboard!</h1>
      <Button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white"
      >
        Выйти
      </Button>
    </div>
  );
};

export default Dashboard;
