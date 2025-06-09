import React from "react";
import "./NewsPanel.css";

const NewsPanel = () => {
  const newsItems = [
    {
      id: 1,
      title: "ДОБАВЛЕН НОВЫЙ СПОСОБ ОПЛАТЫ",
      content: "Текст новости о новом способе оплаты. Здесь будет подробное описание нового функционала, который стал доступен пользователям нашего сервиса. Мы постоянно работаем над улучшением сервиса и добавляем новые возможности для вашего удобства."
    },
    {
      id: 2,
      title: "ДОБАВЛЕН НОВЫЙ СПОСОБ ДОСТАВКИ",
      content: "Текст новости о новом способе доставки. Теперь вы можете получать свои заказы еще быстрее и удобнее. Мы расширили сеть пунктов выдачи и добавили новые варианты доставки, чтобы вы могли выбрать наиболее подходящий для вас вариант."
    }
  ];

  return (
    <div className="news-container">
      <h1 className="news-title">НОВОСТИ</h1>
      
      {newsItems.map((news) => (
        <div key={news.id} className="news-item">
          <div className="news-header">
            {news.title}
          </div>
          <div className="news-content-wrapper">
            <div className="news-content">
              {news.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsPanel;
