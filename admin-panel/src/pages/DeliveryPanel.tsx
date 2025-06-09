import React, { useState } from "react";
import "./DeliveryPanel.css";

const DeliveryPanel = () => {
  const initialDeliveries = Array.from({ length: 5 }).map((_, idx) => ({
    id: idx + 1,
    shop: `Магазин ${idx + 1}`,
    deliveryMethods: ["Самовывоз, по адресу", "Самовывоз", "По адресу"][idx % 3],
  }));

  const [deliveries, setDeliveries] = useState(initialDeliveries);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newDelivery, setNewDelivery] = useState({
    shop: "",
    deliveryMethods: "Самовывоз, по адресу"
  });
  const [isAdding, setIsAdding] = useState(false);

  // Фильтрация и сортировка
  const filteredDeliveries = deliveries.filter(delivery =>
    delivery.shop.toLowerCase().includes(searchTerm.toLowerCase()) ||
    delivery.deliveryMethods.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedDeliveries = [...filteredDeliveries].sort((a, b) => {
    if (sortBy === "shop") return a.shop.localeCompare(b.shop);
    if (sortBy === "deliveryMethods") return a.deliveryMethods.localeCompare(b.deliveryMethods);
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
    if (newDelivery.shop && newDelivery.deliveryMethods) {
      setDeliveries([...deliveries, {
        ...newDelivery,
        id: Math.max(...deliveries.map(d => d.id)) + 1
      }]);
      setNewDelivery({
        shop: "",
        deliveryMethods: "Самовывоз, по адресу"
      });
      setIsAdding(false);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Удалить эту запись?")) {
      setDeliveries(deliveries.filter(delivery => delivery.id !== id));
    }
  };

  const handleInputChange = (id: number, field: string, value: string) => {
    setDeliveries(deliveries.map(delivery =>
      delivery.id === id ? { ...delivery, [field]: value } : delivery
    ));
  };

  const handleNewDeliveryChange = (field: string, value: string) => {
    setNewDelivery({ ...newDelivery, [field]: value });
  };

  return (
    <div className="deliveries-container">
      {/* Панель управления */}
      <div className="deliveries-control-panel">
        <input
          type="text"
          placeholder="Поиск по магазину или способу доставки..."
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
          <option value="shop">По магазину</option>
          <option value="deliveryMethods">По способу доставки</option>
        </select>
      </div>

      {/* Шапка таблицы */}
      <div className="deliveries-header">
        <span className="delivery-shop">Название магазина</span>
        <span className="delivery-methods">Способ доставки</span>
      </div>

      {/* Тело таблицы */}
      <div className="deliveries-table">
        {/* Строка добавления новой доставки */}
        {isAdding && (
          <div className="delivery-row adding-row">
            <div className="delivery-shop">
              <input
                type="text"
                value={newDelivery.shop}
                onChange={(e) => handleNewDeliveryChange("shop", e.target.value)}
                placeholder="Магазин"
              />
            </div>
            <div className="delivery-methods">
              <select
                value={newDelivery.deliveryMethods}
                onChange={(e) => handleNewDeliveryChange("deliveryMethods", e.target.value)}
              >
                <option value="Самовывоз, по адресу">Самовывоз, по адресу</option>
                <option value="Самовывоз">Самовывоз</option>
                <option value="По адресу">По адресу</option>
              </select>
            </div>
            <div className="delivery-actions">
              <button className="action-btn save-btn" onClick={handleSaveNew}>
                ✓
              </button>
              <button className="action-btn cancel-btn" onClick={() => setIsAdding(false)}>
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Список доставок */}
        {sortedDeliveries.map((delivery) => (
          <div className="delivery-row" key={delivery.id}>
            {editingId === delivery.id ? (
              <>
                <div className="delivery-shop">
                  <input
                    type="text"
                    value={delivery.shop}
                    onChange={(e) => handleInputChange(delivery.id, "shop", e.target.value)}
                  />
                </div>
                <div className="delivery-methods">
                  <select
                    value={delivery.deliveryMethods}
                    onChange={(e) => handleInputChange(delivery.id, "deliveryMethods", e.target.value)}
                  >
                    <option value="Самовывоз, по адресу">Самовывоз, по адресу</option>
                    <option value="Самовывоз">Самовывоз</option>
                    <option value="По адресу">По адресу</option>
                  </select>
                </div>
                <div className="delivery-actions">
                  <button className="action-btn save-btn" onClick={() => handleSave(delivery.id)}>
                    ✓
                  </button>
                  <button className="action-btn cancel-btn" onClick={() => setEditingId(null)}>
                    ✕
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="delivery-shop">{delivery.shop}</span>
                <span className="delivery-methods">{delivery.deliveryMethods}</span>
                <div className="delivery-actions">
                  <button className="action-btn edit-btn" onClick={() => handleEdit(delivery.id)}>
                    ✎
                  </button>
                  <button className="action-btn delete-btn" onClick={() => handleDelete(delivery.id)}>
                    ✕
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Кнопки управления */}
      <div className="deliveries-actions">
        <button className="action-btn add-btn" onClick={handleAddNew}>
          Добавить запись
        </button>
      </div>
    </div>
  );
};

export default DeliveryPanel;
