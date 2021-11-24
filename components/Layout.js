import Head from 'next/head';
import { useRouter } from 'next/router';

//Styles
import styles from '../styles/Layout.module.css';

//Components
import Header from './Header';
import Footer from './Footer';
import Showcase from './Showcase';

const Layout = ({ title, keywords, description, children }) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" keywords={keywords} />
      </Head>
      <Header />
      {router.pathname === '/' && <Showcase />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: 'DJ Events | Find the Hottest parties',
  description: 'Find the latest DJ and other music events',
  keywords: 'music, dj, events, edm, dance, party, things to do, what to do',
};

export default Layout;
