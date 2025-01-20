"use client";  // Bu dosyanın istemci tarafında çalıştırılacağını belirtir.

import React, { useState } from 'react';   
import styles from './Menu.module.css';  // CSS modüllerini stil olarak içe aktarıyoruz.

const Menu: React.FC = () => {
  // Menü açılıp kapanma durumunu tutmak için useState kullanıyoruz.
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Hangi alt menülerin açık olduğunu takip etmek için activeAccordion state'ini kullanıyoruz.
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  // Menü öğeleri ve alt öğelerini tanımlıyoruz. "Hizmetler" öğesinin altındaki alt menüler de burada.
  const menuItems = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Hakkımızda', path: '/about' },
    {
      name: 'Hizmetler',
      subItems: [
        { name: 'Web Tasarım', path: '/services/web-design' },
        { name: 'SEO', path: '/services/seo' },
      ],
    },
    { name: 'İletişim', path: '/contact' },
  ];

  // Menü açılıp kapanmasını sağlayan fonksiyon.
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Alt menülerin açılmasını sağlamak için, hangi menü öğesinin aktif olduğunu belirleyen fonksiyon.
  const toggleAccordion = (index: number) => {
    // Eğer tıklanan öğe zaten açıksa, kapatıyoruz. Aksi takdirde açıyoruz.
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className={styles.menuWrapper}>
      {/* Hamburger menü butonu. Menüyü açıp kapatmak için onClick fonksiyonunu bağlıyoruz. */}
      <div
        className={`${styles.hamburgerMenu} ${menuOpen ? styles.open : ''}`}  // Menü açıldığında 'open' sınıfı eklenir.
        onClick={toggleMenu}  // Butona tıklandığında toggleMenu fonksiyonu çağrılır.
        aria-label="Menüyü Aç/Kapat"  // Erişilebilirlik için açıklama.
      >
        <span></span>  {/* Hamburger menüdeki çizgiler */}
        <span></span>
        <span></span>
      </div>

      {/* Menü öğeleri container'ı. Menü açıldığında 'show' sınıfı eklenir ve menü görünür. */}
      <div className={`${styles.menuContainer} ${menuOpen ? styles.show : ''}`}>
        {/* Menü liste öğeleri */}
        <ul className={styles.menuList}>
          {menuItems.map((item, index) => (
            <li key={index} className={styles.menuItem}>
              {/* Eğer öğede alt menüler varsa, accordion (açılabilir menü) işlevselliği ekliyoruz. */}
              <div
                className={`${styles.accordionToggle} ${
                  activeAccordion === index ? styles.active : ''
                }`}  // Aktif olan öğeye 'active' sınıfı ekliyoruz.
                onClick={() => item.subItems && toggleAccordion(index)}  // Alt menüsü olan öğelere tıklandığında açma/kapama işlemi yapılır.
              >
                <a href={item.path || '#'}>{item.name}</a>  {/* Menü öğesinin başlığına tıklanabilir bağlantı ekliyoruz. */}
              </div>

              {/* Eğer öğede alt menüler varsa, açılabilir içerik kısmı. */}
              {item.subItems && (
                <ul
                  className={`${styles.accordionContent} ${
                    activeAccordion === index ? styles.show : ''
                  }`}  // Aktif öğeye 'show' sınıfı ekliyoruz, böylece alt menü görünür hale geliyor.
                >
                  {/* Alt menü öğeleri */}
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <a href={subItem.path}>{subItem.name}</a>  {/* Alt menü öğeleri tıklanabilir. */}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;  // Menu bileşenini dışa aktarıyoruz.
