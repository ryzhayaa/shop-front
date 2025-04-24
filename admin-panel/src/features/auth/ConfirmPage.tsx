// src/features/auth/ConfirmPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "./AuthSlice";

export const ConfirmPage = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/v1/auth/confirm/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();
    if (data.token) {
      dispatch(setToken(data.token));
      localStorage.setItem("token", data.token); // сохраняем токен
      navigate("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        type="text"
        placeholder="Код подтверждения"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border p-2 mb-2"
      />
      <button type="submit" className="bg-green-500 text-white p-2">Подтвердить</button>
    </form>
  );
};
