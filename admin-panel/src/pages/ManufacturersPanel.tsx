import React, { useState } from "react";
import "./ManufacturersPanel.css";

const ManufacturersPanel = () => {
  const initialManufacturers = Array.from({ length: 5 }).map((_, idx) => ({
    id: idx + 1,
    name: `Производитель ${idx + 1}`,
    country: ["Италия", "Германия", "Франция", "Япония", "США"][idx % 5],
    count: Math.floor(Math.random() * 1000),
  }));

  const [manufacturers, setManufacturers] = useState(initialManufacturers);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newManufacturer, setNewManufacturer] = useState({
    name: "",
    country: "Италия",
    count: 0
  });
  const [isAdding, setIsAdding] = useState(false);

  // Фильтрация и сортировка
  const filteredManufacturers = manufacturers.filter(manufacturer =>
    manufacturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    manufacturer.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedManufacturers = [...filteredManufacturers].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "country") return a.country.localeCompare(b.country);
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
    if (newManufacturer.name && newManufacturer.country) {
      setManufacturers([...manufacturers, {
        ...newManufacturer,
        id: Math.max(...manufacturers.map(m => m.id)) + 1
      }]);
      setNewManufacturer({
        name: "",
        country: "Италия",
        count: 0
      });
      setIsAdding(false);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Удалить этого производителя?")) {
      setManufacturers(manufacturers.filter(manufacturer => manufacturer.id !== id));
    }
  };

  const handleInputChange = (id: number, field: string, value: string | number) => {
    setManufacturers(manufacturers.map(manufacturer =>
      manufacturer.id === id ? { ...manufacturer, [field]: value } : manufacturer
    ));
  };

  const handleNewManufacturerChange = (field: string, value: string | number) => {
    setNewManufacturer({ ...newManufacturer, [field]: value });
  };

  return (
    <div className="manufacturers-container">
      {/* Панель управления */}
      <div className="manufacturers-control-panel">
        <input
          type="text"
          placeholder="Поиск по названию или стране..."
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
          <option value="country">По стране</option>
          <option value="count">По количеству</option>
        </select>
      </div>

      {/* Шапка таблицы */}
      <div className="manufacturers-header">
        <span className="manufacturer-name">Название</span>
        <span className="manufacturer-country">Страна</span>
        <span className="manufacturer-count">Количество</span>
      </div>

      {/* Тело таблицы */}
      <div className="manufacturers-table">
        {/* Строка добавления нового производителя */}
        {isAdding && (
          <div className="manufacturer-row adding-row">
            <div className="manufacturer-name">
              <input
                type="text"
                value={newManufacturer.name}
                onChange={(e) => handleNewManufacturerChange("name", e.target.value)}
                placeholder="Название"
              />
            </div>
            <div className="manufacturer-country">
              <select
                value={newManufacturer.country}
                onChange={(e) => handleNewManufacturerChange("country", e.target.value)}
              >
                <option value="Италия">Италия</option>
                <option value="Германия">Германия</option>
                <option value="Франция">Франция</option>
                <option value="Япония">Япония</option>
                <option value="США">США</option>
              </select>
            </div>
            <div className="manufacturer-count">
              <input
                type="number"
                value={newManufacturer.count}
                onChange={(e) => handleNewManufacturerChange("count", parseInt(e.target.value) || 0)}
                placeholder="Количество"
              />
            </div>
            <div className="manufacturer-actions">
              <button className="action-btn save-btn" onClick={handleSaveNew}>
                ✓
              </button>
              <button className="action-btn cancel-btn" onClick={() => setIsAdding(false)}>
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Список производителей */}
        {sortedManufacturers.map((manufacturer) => (
          <div className="manufacturer-row" key={manufacturer.id}>
            {editingId === manufacturer.id ? (
              <>
                <div className="manufacturer-name">
                  <input
                    type="text"
                    value={manufacturer.name}
                    onChange={(e) => handleInputChange(manufacturer.id, "name", e.target.value)}
                  />
                </div>
                <div className="manufacturer-country">
                  <select
                    value={manufacturer.country}
                    onChange={(e) => handleInputChange(manufacturer.id, "country", e.target.value)}
                  >
                    <option value="Италия">Италия</option>
                    <option value="Германия">Германия</option>
                    <option value="Франция">Франция</option>
                    <option value="Япония">Япония</option>
                    <option value="США">США</option>
                  </select>
                </div>
                <div className="manufacturer-count">
                  <input
                    type="number"
                    value={manufacturer.count}
                    onChange={(e) => handleInputChange(manufacturer.id, "count", parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="manufacturer-actions">
                  <button className="action-btn save-btn" onClick={() => handleSave(manufacturer.id)}>
                    ✓
                  </button>
                  <button className="action-btn cancel-btn" onClick={() => setEditingId(null)}>
                    ✕
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="manufacturer-name">{manufacturer.name}</span>
                <span className="manufacturer-country">{manufacturer.country}</span>
                <span className="manufacturer-count">{manufacturer.count}</span>
                <div className="manufacturer-actions">
                  <button className="action-btn edit-btn" onClick={() => handleEdit(manufacturer.id)}>
                    ✎
                  </button>
                  <button className="action-btn delete-btn" onClick={() => handleDelete(manufacturer.id)}>
                    ✕
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Кнопки управления */}
      <div className="manufacturers-actions">
        <button className="action-btn add-btn" onClick={handleAddNew}>
          Добавить производителя
        </button>
      </div>
    </div>
  );
};

export default ManufacturersPanel;
