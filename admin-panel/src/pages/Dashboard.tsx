import React, { useState } from 'react';
import UserPanel  from './UserPanel';
import ProductPanel  from './ProductPanel';
import Category  from './Category';
import ManufacturersPanel  from './ManufacturersPanel';
import PaymentPanel  from './PaymentPanel';
import DeliveryPanel  from './DeliveryPanel';
import NewsPanel  from './NewsPanel';

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import './Dashboard.css';

type ChartDataItem = {
  name: string;
  registrations: number;
  shops: number;
};

const data: ChartDataItem[] = [
  { name: 'Янв', registrations: 30, shops: 20 },
  { name: 'Фев', registrations: 45, shops: 25 },
  { name: 'Мар', registrations: 60, shops: 35 },
  { name: 'Апр', registrations: 50, shops: 30 },
  { name: 'Май', registrations: 70, shops: 40 },
];

const menuItems = [
  'Главная',
  'Пользователи',
  'Товары',
  'Категории',
  'Производители',
  'Методы оплаты',
  'Способы доставки',
  'Новости'
];

export const Dashboard: React.FC = () => {
  const [activePage, setActivePage] = useState('Главная');

  const renderContent = () => {
    switch (activePage) {
      case 'Главная':
        return (
          <>
            <div className="content-row">
              <section className="stats-card">
                <h3>ОБЩАЯ СТАТИСТИКА</h3>
                <div className="divider" />
                <div className="stat-item">
  <div className="icon">
    <img src="/public/img/icons8-магазин-48 2.svg" alt="Магазины" className="icon-img" />
  </div>
  <div className="stat-text">
    15 активных<br />10 неактивных
  </div>
</div>
<div className="divider" />
<div className="stat-item">
  <div className="icon">
    <img src="/public/img/icons8-текст-48 1.svg" alt="Новые магазины" className="icon-img" />
  </div>
  <div className="stat-text">11 новых магазинов</div>
</div>
              </section>

              <section className="growth-card">
                <h3>ГРАФИК РОСТА</h3>
                <div className="divider" />
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={data}>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" stroke="#000" />
                    <YAxis stroke="#000" />
                    <Tooltip />
                    <Legend verticalAlign="top" />
                    <Line type="monotone" dataKey="registrations" stroke="#FF005E" name="Регистрации" strokeWidth={2} />
                    <Line type="monotone" dataKey="shops" stroke="#FF7BA3" name="Новых магазинов" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </section>
            </div>

            <section className="actions-card">
              <h3>ПОСЛЕДНИЕ ДЕЙСТВИЯ</h3>
              <div className="action-item">
  <div className="icon">
    <img src="/public/img/icons8-магазин-48 2.svg" alt="Новый магазин" className="icon-img" />
  </div>
  <div>Новый магазин: Магазин Название</div>
</div>
<div className="divider-full" />
<div className="action-item">
  <div className="icon">
    <img src="/public/img/icons8-проблема-48 1.svg" alt="Проблема" className="icon-img" />
  </div>
  <div>Проблема: Магазин Название</div>
</div>
<div className="divider-full" />
<div className="action-item">
  <div className="icon">
    <img src="/public/img/icons8-поддержка-48 1.svg" alt="Обращения" className="icon-img" />
  </div>
  <div>Обращения: Магазин Название</div>
</div>
            </section>
          </>
        );

      case 'Пользователи':
        return <UserPanel />;


      case 'Товары':
        return <ProductPanel />;

      case 'Категории':
        return <Category />;

      case 'Производители':
        return <ManufacturersPanel />;

      case 'Методы оплаты':
        return <PaymentPanel />;
      
      case 'Способы доставки':
        return <DeliveryPanel />;

      case 'Новости':
        return <NewsPanel />;

      default:
        return <div className="page-placeholder">Раздел «{activePage}» в разработке</div>;
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <div className="logo-container">
          <img src="/img/logo.svg" alt="Логотип" className="logo-img" />
        </div>

        <aside className="left-panel">
          <nav className="menu">
            {menuItems.map((item) => (
              <div
                key={item}
                className={`menu-item ${activePage === item ? 'active' : ''}`}
                onClick={() => setActivePage(item)}
              >
                {item}
              </div>
            ))}
          </nav>
        </aside>

        <main className="right-panel">{renderContent()}</main>
      </div>
    </div>
  );
};
