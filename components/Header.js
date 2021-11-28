import { useContext } from 'react';

//Router
import Link from 'next/link';

//Auth Context
import AuthContext from '../context/AuthContext';

//Components
import Search from './Search';

//Styles
import styles from '../styles/Header.module.css';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a> Dj Events</a>
        </Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href="/events">
              <a>Events</a>
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/events/add">
                  <a>Add Event</a>
                </Link>
              </li>
              <li>
                <Link href="/account/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <button
                  className="btn-secondary btn-icon"
                  onClick={() => logout()}
                >
                  {' '}
                  <FaSignOutAlt /> Log Out
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/account/login">
                <a className="btn-secondary btn-icon">
                  {' '}
                  <FaSignInAlt /> Login
                </a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
