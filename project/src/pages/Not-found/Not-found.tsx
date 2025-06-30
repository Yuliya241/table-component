import { Link } from 'react-router-dom';
import styles from './Not-found.module.css';

export const NotFound = () => (
  <div className={styles.wrapper}>
    <p className={styles.wrapper_image}>404</p>
    <span className={styles.wrapper_text}>Извините, страница не найдена</span>
    <Link to="/" className={styles.wrapper_button}>
      На Главную
    </Link>
  </div>
);