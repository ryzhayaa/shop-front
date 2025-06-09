import React, { useState } from "react";
import "./Category.css";

const Category = () => {
  const initialCategories = Array.from({ length: 5 }).map((_, idx) => ({
    id: idx + 1,
    name: `Категория ${idx + 1}`,
    type: idx % 2 === 0 ? "Мебель" : "Электроника",
    count: Math.floor(Math.random() * 1000),
  }));

  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    type: "Мебель",
    count: 0
  });
  const [isAdding, setIsAdding] = useState(false);

  // Фильтрация и сортировка
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "type") return a.type.localeCompare(b.type);
    if (sortBy === "count") return a.count - b.count;
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
    if (newCategory.name && newCategory.type) {
      setCategories([...categories, {
        ...newCategory,
        id: Math.max(...categories.map(c => c.id)) + 1
      }]);
      setNewCategory({
        name: "",
        type: "Мебель",
        count: 0
      });
      setIsAdding(false);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Удалить эту категорию?")) {
      setCategories(categories.filter(category => category.id !== id));
    }
  };

  const handleInputChange = (id: number, field: string, value: string | number) => {
    setCategories(categories.map(category =>
      category.id === id ? { ...category, [field]: value } : category
    ));
  };

  const handleNewCategoryChange = (field: string, value: string | number) => {
    setNewCategory({ ...newCategory, [field]: value });
  };

  return (
    <div className="categories-container">
      {/* Панель управления */}
      <div className="categories-control-panel">
        <input
          type="text"
          placeholder="Поиск по названию или категории..."
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
          <option value="name">По названию</option>
          <option value="type">По категории</option>
          <option value="count">По количеству</option>
        </select>
      </div>

      {/* Шапка таблицы */}
      <div className="categories-header">
        <span className="category-name">Название</span>
        <span className="category-type">Категория</span>
        <span className="category-count">Количество</span>
      </div>

      {/* Тело таблицы */}
      <div className="categories-table">
        {/* Строка добавления новой категории */}
        {isAdding && (
          <div className="category-row adding-row">
            <div className="category-name">
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) => handleNewCategoryChange("name", e.target.value)}
                placeholder="Название"
              />
            </div>
            <div className="category-type">
              <select
                value={newCategory.type}
                onChange={(e) => handleNewCategoryChange("type", e.target.value)}
              >
                <option value="Мебель">Мебель</option>
                <option value="Электроника">Электроника</option>
                <option value="Одежда">Одежда</option>
                <option value="Продукты">Продукты</option>
              </select>
            </div>
            <div className="category-count">
              <input
                type="number"
                value={newCategory.count}
                onChange={(e) => handleNewCategoryChange("count", parseInt(e.target.value) || 0)}
                placeholder="Количество"
              />
            </div>
            <div className="category-actions">
              <button className="action-btn save-btn" onClick={handleSaveNew}>
                ✓
              </button>
              <button className="action-btn cancel-btn" onClick={() => setIsAdding(false)}>
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Список категорий */}
        {sortedCategories.map((category) => (
          <div className="category-row" key={category.id}>
            {editingId === category.id ? (
              <>
                <div className="category-name">
                  <input
                    type="text"
                    value={category.name}
                    onChange={(e) => handleInputChange(category.id, "name", e.target.value)}
                  />
                </div>
                <div className="category-type">
                  <select
                    value={category.type}
                    onChange={(e) => handleInputChange(category.id, "type", e.target.value)}
                  >
                    <option value="Мебель">Мебель</option>
                    <option value="Электроника">Электроника</option>
                    <option value="Одежда">Одежда</option>
                    <option value="Продукты">Продукты</option>
                  </select>
                </div>
                <div className="category-count">
                  <input
                    type="number"
                    value={category.count}
                    onChange={(e) => handleInputChange(category.id, "count", parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="category-actions">
                  <button className="action-btn save-btn" onClick={() => handleSave(category.id)}>
                    ✓
                  </button>
                  <button className="action-btn cancel-btn" onClick={() => setEditingId(null)}>
                    ✕
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="category-name">{category.name}</span>
                <span className="category-type">{category.type}</span>
                <span className="category-count">{category.count}</span>
                <div className="category-actions">
                  <button className="action-btn edit-btn" onClick={() => handleEdit(category.id)}>
                    ✎
                  </button>
                  <button className="action-btn delete-btn" onClick={() => handleDelete(category.id)}>
                    ✕
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Кнопки управления */}
      <div className="categories-actions">
        <button className="action-btn add-btn" onClick={handleAddNew}>
          Добавить категорию
        </button>
      </div>
    </div>
  );
};

export default Category;
