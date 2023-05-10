import React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {loggedInEntity} from './data/user'
import {selectedEntity, setSelected} from './data/selected'
import crabShellLogo from './images/crabShellLogo.jpeg'
import homeLogo from './images/home.png'
import logoutLogo from './images/logout.png'
import menuLogo from './images/menu.png'
import styles from './styles/header.module.css';

const Header = ({handleDrawerMenuClick}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const isLoggedIn = loggedInEntity.use();

  const selected = selectedEntity.use();

  React.useEffect(() => {
    const route = location.pathname;
    console.log(route);
    switch (route) {
      case '/Revenue':
        setSelected(0);
        break;
      case '/Records':
        setSelected(1);
        break;
      case '/Employee_Details':
        setSelected(2);
        break;
      case '/Fisherman':
        setSelected(3);
        break;
      default:
        break;
    }
  }, [location, setSelected]);

  const navigateTo = React.useCallback((url, index) => {
    setSelected(index)
    navigate(url);
  }, [navigate]);

  const mainContent = React.useMemo(() => {
    const loggedInContent = [['/Revenue', 'Revenue'], ['/Records', 'Records'], ['/Employee_Details', 'Details'], ['/Fisherman', 'Fisherman']].map(([url, label], index) => {
      const classNames = `${styles.link}${index === selected ? ` ${styles.selected}`: ''}`
      return <div className={classNames} onClick={() => navigateTo(url, index)} key={`${index}${label}`}>{label}</div>
    })
    return isLoggedIn
      ? (<>{loggedInContent}</>)
      : (<div className={styles.title}>Express Firm Ltd.</div>);
  }, [isLoggedIn, navigateTo, selected]);

  return (
    <div className={styles.header}>
      <img className={styles.logo} src={crabShellLogo} />
      {windowSize >= 600 &&
        <>
          <div className={styles.headerMain}>{mainContent}</div>
      
          {isLoggedIn && <img className={styles.home} src={logoutLogo} onClick={() => navigateTo('/')}/>}
          {!isLoggedIn && <img className={styles.home} style={{color: "white"}} src={homeLogo} onClick={() => navigateTo('/')}/>}
        </>
      }
      {windowSize < 600 && isLoggedIn &&
        <img className={styles.home} src={menuLogo} onClick={handleDrawerMenuClick}/>
      }
      {windowSize < 600 && !isLoggedIn &&
        <img className={styles.home} style={{color: "white"}} src={homeLogo} onClick={() => navigateTo('/')}/>
      }
      
    </div>
  )
}

Header.displayName = 'Header';

export default React.memo(Header);
