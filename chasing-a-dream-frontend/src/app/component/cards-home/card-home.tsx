"use client";  // Client component olarak işaretliyoruz
import { useRouter } from "next/navigation";  // app dizini için

import React from "react";
 
import styles from "./card.module.css";

interface CardData {
  id: number;
  image: string;
  title: string;
  text: string;
  buttonText: string;
}

const cardData: CardData[] = [
  { id: 1, image: "https://i.imgur.com/EVU4Gxi.jpeg", title: "Kart Başlık 1", text: "Bu bir açıklama metnidir.", buttonText: "Daha Fazla" },
  { id: 2, image: "https://i.imgur.com/EVU4Gxi.jpeg", title: "Kart Başlık 2", text: "İkinci kart için açıklama metni.", buttonText: "Detaylar" },
  { id: 3, image: "https://i.imgur.com/EVU4Gxi.jpeg", title: "Kart Başlık 3", text: "Üçüncü kart açıklaması.", buttonText: "Keşfet" },
  { id: 4, image: "https://i.imgur.com/EVU4Gxi.jpeg", title: "Kart Başlık 4", text: "Dördüncü kart açıklaması.", buttonText: "Devam Et" },
  { id: 5, image: "https://i.imgur.com/EVU4Gxi.jpeg", title: "Kart Başlık 5", text: "Beşinci kart açıklaması.", buttonText: "Oku" },
  { id: 6, image: "https://i.imgur.com/EVU4Gxi.jpeg", title: "Kart Başlık 6", text: "Altıncı kart açıklaması.", buttonText: "Başla" },
];

const Cards: React.FC = () => {
  const router = useRouter();

  // En güncel 6 kartı seçiyoruz
  const visibleCards = [...cardData].sort((a, b) => b.id - a.id).slice(0, 6);

  return (
    <div className={styles.cardContainer}>
      {visibleCards.map((data) => (
        <div key={data.id} className={styles.card}>
          <img src={data.image} alt={data.title} />
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{data.title}</h3>
            <p className={styles.cardText}>{data.text}</p>
            <button
              className={styles.cardButton}
              onClick={() => router.push("/posts")}  // Yönlendirme yapıyoruz
            >
              {data.buttonText}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
