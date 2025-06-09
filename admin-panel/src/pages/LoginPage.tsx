import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: запрос на бэкенд
    navigate("/dashboard");
  };

  return (
    <main className="container">
      <div className="form">
        <img className="logo" src="/img/logo.svg" alt="Logo" />

        <form className="form-fields" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Почта</label>
            <input 
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Пароль</label>
            <input 
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit">Войти</button>
        </form>
      </div>
    </main>
  );
};