import React, { useState } from "react";
import "./PaymentPanel.css";

const PaymentPanel = () => {
  const initialPayments = Array.from({ length: 5 }).map((_, idx) => ({
    id: idx + 1,
    shop: `Магазин ${idx + 1}`,
    paymentMethods: ["Яндекс ПЭЙ, ЮMoney", "ЮMoney", "Яндекс ПЭЙ"][idx % 3],
  }));

  const [payments, setPayments] = useState(initialPayments);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newPayment, setNewPayment] = useState({
    shop: "",
    paymentMethods: "Яндекс ПЭЙ, ЮMoney"
  });
  const [isAdding, setIsAdding] = useState(false);

  // Фильтрация и сортировка
  const filteredPayments = payments.filter(payment =>
    payment.shop.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.paymentMethods.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPayments = [...filteredPayments].sort((a, b) => {
    if (sortBy === "shop") return a.shop.localeCompare(b.shop);
    if (sortBy === "paymentMethods") return a.paymentMethods.localeCompare(b.paymentMethods);
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
    if (newPayment.shop && newPayment.paymentMethods) {
      setPayments([...payments, {
        ...newPayment,
        id: Math.max(...payments.map(p => p.id)) + 1
      }]);
      setNewPayment({
        shop: "",
        paymentMethods: "Яндекс ПЭЙ, ЮMoney"
      });
      setIsAdding(false);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Удалить эту запись?")) {
      setPayments(payments.filter(payment => payment.id !== id));
    }
  };

  const handleInputChange = (id: number, field: string, value: string) => {
    setPayments(payments.map(payment =>
      payment.id === id ? { ...payment, [field]: value } : payment
    ));
  };

  const handleNewPaymentChange = (field: string, value: string) => {
    setNewPayment({ ...newPayment, [field]: value });
  };

  return (
    <div className="payments-container">
      {/* Панель управления */}
      <div className="payments-control-panel">
        <input
          type="text"
          placeholder="Поиск по магазину или способу оплаты..."
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
          <option value="paymentMethods">По способу оплаты</option>
        </select>
      </div>

      {/* Шапка таблицы */}
      <div className="payments-header">
        <span className="payment-shop">Название магазина</span>
        <span className="payment-methods">Способ оплаты</span>
      </div>

      {/* Тело таблицы */}
      <div className="payments-table">
        {/* Строка добавления нового платежа */}
        {isAdding && (
          <div className="payment-row adding-row">
            <div className="payment-shop">
              <input
                type="text"
                value={newPayment.shop}
                onChange={(e) => handleNewPaymentChange("shop", e.target.value)}
                placeholder="Магазин"
              />
            </div>
            <div className="payment-methods">
              <select
                value={newPayment.paymentMethods}
                onChange={(e) => handleNewPaymentChange("paymentMethods", e.target.value)}
              >
                <option value="Яндекс ПЭЙ, ЮMoney">Яндекс ПЭЙ, ЮMoney</option>
                <option value="Яндекс ПЭЙ">Яндекс ПЭЙ</option>
                <option value="ЮMoney">ЮMoney</option>
              </select>
            </div>
            <div className="payment-actions">
              <button className="action-btn save-btn" onClick={handleSaveNew}>
                ✓
              </button>
              <button className="action-btn cancel-btn" onClick={() => setIsAdding(false)}>
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Список платежей */}
        {sortedPayments.map((payment) => (
          <div className="payment-row" key={payment.id}>
            {editingId === payment.id ? (
              <>
                <div className="payment-shop">
                  <input
                    type="text"
                    value={payment.shop}
                    onChange={(e) => handleInputChange(payment.id, "shop", e.target.value)}
                  />
                </div>
                <div className="payment-methods">
                  <select
                    value={payment.paymentMethods}
                    onChange={(e) => handleInputChange(payment.id, "paymentMethods", e.target.value)}
                  >
                    <option value="Яндекс ПЭЙ, ЮMoney">Яндекс ПЭЙ, ЮMoney</option>
                    <option value="Яндекс ПЭЙ">Яндекс ПЭЙ</option>
                    <option value="ЮMoney">ЮMoney</option>
                  </select>
                </div>
                <div className="payment-actions">
                  <button className="action-btn save-btn" onClick={() => handleSave(payment.id)}>
                    ✓
                  </button>
                  <button className="action-btn cancel-btn" onClick={() => setEditingId(null)}>
                    ✕
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="payment-shop">{payment.shop}</span>
                <span className="payment-methods">{payment.paymentMethods}</span>
                <div className="payment-actions">
                  <button className="action-btn edit-btn" onClick={() => handleEdit(payment.id)}>
                    ✎
                  </button>
                  <button className="action-btn delete-btn" onClick={() => handleDelete(payment.id)}>
                    ✕
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Кнопки управления */}
      <div className="payments-actions">
        <button className="action-btn add-btn" onClick={handleAddNew}>
          Добавить запись
        </button>
      </div>
    </div>
  );
};

export default PaymentPanel;
