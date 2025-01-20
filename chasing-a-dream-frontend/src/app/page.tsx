import Image from "next/image";
import styles from "./page.module.css";
import Cards from "./component/cards-home/card-home";
export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.home1}>
          <div className={styles.hiUser}>
 
            <h1>Merhaba, Bloguma Hoşgeldiniz!</h1>
            <br /><br />
            <p>
              Bu blogda, yazılım geliştirme, teknoloji ve kişisel projelerim
              hakkında yazılar bulabilirsiniz. Daha fazla bilgi için{" "}
              <a
                href="https://medium.com/@ouysal155"
                target="_blank"
                rel="noopener noreferrer"
              >
                Medium
              </a>{" "}
              adresime göz atabilir ve "Ben Kimim" bölümünden beni daha
              yakından tanıyabilirsiniz.
            </p>
            <br /><br />
          
          </div>
        
        </div>  <Cards />
      </header>
    </div>
  );
}
