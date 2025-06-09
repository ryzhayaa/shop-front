import React, { useState } from "react";
import "./ProductPanel.css";

const ProductPanel = () => {
  const initialProducts = Array.from({ length: 5 }).map((_, idx) => ({
    id: idx + 1,
    name: `Товар ${idx + 1}`,
    category: `Категория ${idx % 3 + 1}`,
    price: (1000 + idx * 500).toFixed(2),
    status: idx % 2 === 0 ? "В наличии" : "Нет в наличии",
    updatedAt: new Date().toISOString().split("T")[0],
  }));

  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    status: "В наличии",
    updatedAt: new Date().toISOString().split("T")[0],
  });
  const [isAdding, setIsAdding] = useState(false);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "status") return a.status.localeCompare(b.status);
    return 0;
  });

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
    if (newProduct.name && newProduct.category && newProduct.price) {
      setProducts([
        ...products,
        {
          ...newProduct,
          id: Math.max(...products.map(p => p.id)) + 1,
          updatedAt: new Date().toISOString().split("T")[0],
        },
      ]);
      setNewProduct({
        name: "",
        category: "",
        price: "",
        status: "В наличии",
        updatedAt: new Date().toISOString().split("T")[0],
      });
      setIsAdding(false);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Удалить этот товар?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleInputChange = (id: number, field: string, value: string) => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, [field]: value, updatedAt: new Date().toISOString().split("T")[0] } : p
    ));
  };

  const handleNewProductChange = (field: string, value: string) => {
    setNewProduct({ ...newProduct, [field]: value });
  };

  return (
    <div className="users-container">
      <div className="users-control-panel">
        <input
          type="text"
          placeholder="Поиск по названию..."
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
          <option value="status">По статусу</option>
        </select>
      </div>

      <div className="users-header">
        <span className="user-name">Название</span>
        <span className="user-email">Категория</span>
        <span className="user-store">Цена</span>
        <span className="user-status">Статус</span>
        <span className="user-status">Обновлено</span>
      </div>

      <div className="users-table">
        {isAdding && (
          <div className="user-row adding-row">
            <div className="user-name">
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => handleNewProductChange("name", e.target.value)}
                placeholder="Название"
              />
            </div>
            <div className="user-email">
              <input
                type="text"
                value={newProduct.category}
                onChange={(e) => handleNewProductChange("category", e.target.value)}
                placeholder="Категория"
              />
            </div>
            <div className="user-store">
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) => handleNewProductChange("price", e.target.value)}
                placeholder="Цена"
              />
            </div>
            <div className="user-status">
              <select
                value={newProduct.status}
                onChange={(e) => handleNewProductChange("status", e.target.value)}
              >
                <option value="В наличии">В наличии</option>
                <option value="Нет в наличии">Нет в наличии</option>
              </select>
            </div>
            <div className="user-status">{newProduct.updatedAt}</div>
            <div className="user-actions">
              <button className="action-btn save-btn" onClick={handleSaveNew}>✓</button>
              <button className="action-btn cancel-btn" onClick={() => setIsAdding(false)}>✕</button>
            </div>
          </div>
        )}

        {sortedProducts.map((product) => (
          <div className="user-row" key={product.id}>
            {editingId === product.id ? (
              <>
                <div className="user-name">
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => handleInputChange(product.id, "name", e.target.value)}
                  />
                </div>
                <div className="user-email">
                  <input
                    type="text"
                    value={product.category}
                    onChange={(e) => handleInputChange(product.id, "category", e.target.value)}
                  />
                </div>
                <div className="user-store">
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) => handleInputChange(product.id, "price", e.target.value)}
                  />
                </div>
                <div className="user-status">
                  <select
                    value={product.status}
                    onChange={(e) => handleInputChange(product.id, "status", e.target.value)}
                  >
                    <option value="В наличии">В наличии</option>
                    <option value="Нет в наличии">Нет в наличии</option>
                  </select>
                </div>
                <div className="user-status">{product.updatedAt}</div>
                <div className="user-actions">
                  <button className="action-btn save-btn" onClick={() => handleSave(product.id)}>✓</button>
                  <button className="action-btn cancel-btn" onClick={() => setEditingId(null)}>✕</button>
                </div>
              </>
            ) : (
              <>
                <span className="user-name">{product.name}</span>
                <span className="user-email">{product.category}</span>
                <span className="user-store">{product.price} ₽</span>
                <span className="user-status">{product.status}</span>
                <span className="user-status">{product.updatedAt}</span>
                <div className="user-actions">
                  <button className="action-btn edit-btn" onClick={() => handleEdit(product.id)}>✎</button>
                  <button className="action-btn delete-btn" onClick={() => handleDelete(product.id)}>✕</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="users-actions">
        <button className="action-btn add-btn" onClick={handleAddNew}>
          Добавить товар
        </button>
      </div>
    </div>
  );
};

export default ProductPanel;
