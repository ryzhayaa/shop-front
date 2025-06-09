import React, { useState } from "react";
import "./UserPanel.css";

const UserPanel = () => {
  const initialUsers = Array.from({ length: 5 }).map((_, idx) => ({
    id: idx + 1,
    name: `Пользователь ${idx + 1}`,
    email: `user${idx + 1}@mail.com`,
    store: `Магазин ${idx % 3 + 1}`,
    status: idx % 2 === 0 ? "Активный" : "Неактивный",
  }));

  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    store: "",
    status: "Активный"
  });
  const [isAdding, setIsAdding] = useState(false);

  // Фильтрация и сортировка
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "status") return a.status.localeCompare(b.status);
    return 0;
  });

  // Обработчики действий
  const handleEdit = (id: number) => {
    setEditingId(id);
    setIsAdding(false);
  };

  const handleSave = (id: number) => {
    setEditingId(null);
    setIsAdding(false);
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
  };

  const handleSaveNew = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, {
        ...newUser,
        id: Math.max(...users.map(u => u.id)) + 1
      }]);
      setNewUser({
        name: "",
        email: "",
        store: "",
        status: "Активный"
      });
      setIsAdding(false);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Удалить этого пользователя?")) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleInputChange = (id: number, field: string, value: string) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, [field]: value } : user
    ));
  };

  const handleNewUserChange = (field: string, value: string) => {
    setNewUser({ ...newUser, [field]: value });
  };

  return (
    <div className="users-container">
      {/* Панель управления */}
      <div className="users-control-panel">
        <input
          type="text"
          placeholder="Поиск по имени или email..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Без сортировки</option>
          <option value="name">По алфавиту</option>
          <option value="status">По статусу</option>
        </select>
      </div>

      {/* Шапка таблицы */}
      <div className="users-header">
        <span className="user-name">Имя</span>
        <span className="user-email">Почта</span>
        <span className="user-store">Магазин</span>
        <span className="user-status">Статус</span>
      </div>

      {/* Тело таблицы */}
      <div className="users-table">
        {/* Строка добавления нового пользователя */}
        {isAdding && (
          <div className="user-row adding-row">
            <div className="user-name">
              <input
                type="text"
                value={newUser.name}
                onChange={(e) => handleNewUserChange("name", e.target.value)}
                placeholder="Имя"
              />
            </div>
            <div className="user-email">
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => handleNewUserChange("email", e.target.value)}
                placeholder="Email"
              />
            </div>
            <div className="user-store">
              <input
                type="text"
                value={newUser.store}
                onChange={(e) => handleNewUserChange("store", e.target.value)}
                placeholder="Магазин"
              />
            </div>
            <div className="user-status">
              <select
                value={newUser.status}
                onChange={(e) => handleNewUserChange("status", e.target.value)}
              >
                <option value="Активный">Активный</option>
                <option value="Неактивный">Неактивный</option>
              </select>
            </div>
            <div className="user-actions">
              <button className="action-btn save-btn" onClick={handleSaveNew}>
                ✓
              </button>
              <button className="action-btn cancel-btn" onClick={() => setIsAdding(false)}>
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Список пользователей */}
        {sortedUsers.map((user) => (
          <div className="user-row" key={user.id}>
            {editingId === user.id ? (
              <>
                <div className="user-name">
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => handleInputChange(user.id, "name", e.target.value)}
                  />
                </div>
                <div className="user-email">
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => handleInputChange(user.id, "email", e.target.value)}
                  />
                </div>
                <div className="user-store">
                  <input
                    type="text"
                    value={user.store}
                    onChange={(e) => handleInputChange(user.id, "store", e.target.value)}
                  />
                </div>
                <div className="user-status">
                  <select
                    value={user.status}
                    onChange={(e) => handleInputChange(user.id, "status", e.target.value)}
                  >
                    <option value="Активный">Активный</option>
                    <option value="Неактивный">Неактивный</option>
                  </select>
                </div>
                <div className="user-actions">
                  <button className="action-btn save-btn" onClick={() => handleSave(user.id)}>
                    ✓
                  </button>
                  <button className="action-btn cancel-btn" onClick={() => setEditingId(null)}>
                    ✕
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="user-name">{user.name}</span>
                <span className="user-email">{user.email}</span>
                <span className="user-store">{user.store}</span>
                <span className="user-status">{user.status}</span>
                <div className="user-actions">
                  <button className="action-btn edit-btn" onClick={() => handleEdit(user.id)}>
                    ✎
                  </button>
                  <button className="action-btn delete-btn" onClick={() => handleDelete(user.id)}>
                    ✕
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Кнопки управления */}
      <div className="users-actions">
        <button className="action-btn add-btn" onClick={handleAddNew}>
          Добавить пользователя
        </button>
      </div>
    </div>
  );
};

export default UserPanel;