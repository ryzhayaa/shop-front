// src/features/auth/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/v1/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Не удалось авторизоваться");
      }

      const data = await response.json();
      localStorage.setItem("access_token", data.access_token); // Сохраняем токен

      navigate("/dashboard"); // Перенаправляем на страницу dashboard
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message); // Показать ошибку
      } else {
        alert("Произошла неизвестная ошибка"); // Обработка неизвестной ошибки
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        type="email"
        placeholder="Ваш email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-2"
      />
      <input
        type="password"
        placeholder="Ваш пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Войти
      </button>
    </form>
  );
};
