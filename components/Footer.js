//Router
import Link from 'next/link';

//Styles
import styles from '../styles/Footer.module.css';

const Footer = () => {
  const year = new Date();
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; Dj Events {year.getFullYear()}</p>
      <p>
        <Link href="/about">About This Project</Link>
      </p>
    </footer>
  );
};

export default Footer;
